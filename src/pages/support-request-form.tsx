import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputField from "../features/auth/components/InputField";
import { FiSend, FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import { formErrorToast } from "../util/formErrorToast";
import { useApi } from "../features/auth/services/authService";

type SupportValues = {
  subject: string;
  notes: string;
  attachment?: FileList;
};

const SupportRequestForm: React.FC = () => {
  const { request, loading } = useApi();
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SupportValues>({
    defaultValues: { subject: "", notes: "" },
  });

  const file = watch("attachment")?.[0];
  const onSubmit = async (formData: SupportValues) => {
    try {
      const body = new FormData();
      body.append("subject", formData.subject);
      body.append("notes", formData.notes);
      formData.attachment?.[0] && body.append("attachment", formData.attachment[0])

      const { data, error } = await request({
        endpoint: "v1/requests/create/",
        data: body,
        method: "POST",
      });

      if (data?.success) {
        toast.success(data?.message);
        reset();
      } else {
        // @ts-ignore
        const msg = error?.response?.data?.message;
        formErrorToast(error);
      }
    } catch (e: any) {
      formErrorToast(e?.message || "Request failed", true);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      {/* Page header */}
      <div>
        <h1 className="text-[22px] font-semibold text-slate-800 dark:text-white">Help</h1>
        <p className="text-sm text-slate-500 dark:text-[#FFFFFF80] pt-2">
          Need assistance? Submit a support request and our team will help you.
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-[#2C2D34] rounded-xl border border-slate-200 dark:border-white/10 p-5"
      >
        <div className="mb-1">
          <h2 className="font-semibold text-slate-800 dark:text-white">Submit Support Request</h2>
          <p className="text-sm text-slate-500 dark:text-[#FFFFFF80] pt-2">
            Describe your issue or question and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-4 space-y-4">
          {/* Subject */}
          <Controller
            control={control}
            name="subject"
            rules={{ required: "Please enter a subject" }}
            render={({ field }) => (
              <InputField
                {...field}
                label="Subject"
                placeholder="Brief description of your issue"
                type="text"
                error={errors.subject}
                classNames={{
                  label: "dark:text-gray-100",
                  input:
                    "bg-white dark:bg-[#2C2D34] dark:placeholder:text-[#FFFFFF80] text-[#1D2530] dark:text-white border-gray-300 dark:border-white/15",
                }}
              />
            )}
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#1D2530] dark:text-gray-100 mb-1">
              Notes
            </label>
            <Controller
              control={control}
              name="notes"
              rules={{ required: "Please provide some details" }}
              render={({ field }) => (
                <>
                  <textarea
                    {...field}
                    rows={6}
                    placeholder="Please provide detailed information about your issue or question..."
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none dark:placeholder:text-[#FFFFFF80] focus:ring-2 ${errors.notes
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300 dark:border-white/15"
                      } bg-white dark:bg-[#2C2D34] text-[#1D2530] dark:text-white`}
                  />
                  {errors.notes && (
                    <p className="mt-1 text-xs text-red-500">{errors.notes.message}</p>
                  )}
                </>
              )}
            />
          </div>

          {/* Attachment (optional) */}
          <div className=" cursor-pointer">
            <label className="block text-sm font-medium text-[#1D2530] dark:text-gray-100 mb-1 cursor-pointer">
              Attachment <span className="text-slate-400 dark:text-[#FFFFFF80] pt-2">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                {...register("attachment")}
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                className="w-full h-11 border rounded-md cursor-pointer
                           file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0
                           file:bg-slate-100 file:text-slate-700
                           focus:outline-none focus:ring-2 focus:ring-blue-300
                           border-gray-300 dark:border-white/15
                           bg-white dark:bg-[#2C2D34]
                           text-[#1D2530] dark:text-white
                           file:dark:bg-white/10 file:dark:text-gray-100"
              />
              <FiUploadCloud className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-300" />
            </div>
            {file && (
              <p className="text-xs text-slate-500 dark:text-[#FFFFFF80] pt-2 mt-1">Selected: {file.name}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-xl bg-[#1556D4] text-white font-medium flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-60"
          >
            <FiSend />
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupportRequestForm;










































// import { Controller, useForm } from "react-hook-form";
// import InputField from "../features/auth/components/InputField";
// import { FiSend, FiUploadCloud } from "react-icons/fi";
// import React from "react";

// type SupportValues = {
//     subject: string;
//     notes: string;
//     attachment?: FileList;
// };

// const SupportRequestForm: React.FC = () => {
//     const {
//         handleSubmit,
//         control,
//         register,
//         watch,
//         reset,
//         formState: { errors, isSubmitting },
//     } = useForm<SupportValues>({
//         defaultValues: { subject: "", notes: "" },
//     });

//     const file = watch("attachment")?.[0];

//     const onSubmit = async (data: SupportValues) => {
//         // Example payload (multipart)
//         const fd = new FormData();
//         fd.append("subject", data.subject);
//         fd.append("notes", data.notes);
//         if (data.attachment?.[0]) fd.append("attachment", data.attachment[0]);

//         // TODO: send to your API
//         // await fetch("/api/support", { method: "POST", body: fd });

//         reset();
//     };

//     return (
//         <div className="space-y-4 pt-4">
//             {/* Page header */}
//             <div>
//                 <h1 className="text-[22px] font-semibold text-slate-800">Help</h1>
//                 <p className="text-sm text-slate-500">
//                     Need assistance? Submit a support request and our team will help you.
//                 </p>
//             </div>

//             {/* Card */}
//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="bg-white rounded-xl border border-slate-200 p-5"
//             >
//                 <div className="mb-1">
//                     <h2 className="font-semibold text-slate-800">Submit Support Request</h2>
//                     <p className="text-sm text-slate-500">
//                         Describe your issue or question and we'll get back to you as soon as possible.
//                     </p>
//                 </div>

//                 <div className="mt-4 space-y-4">
//                     {/* Subject */}
//                     <Controller
//                         control={control}
//                         name="subject"
//                         rules={{ required: "Please enter a subject" }}
//                         render={({ field }) => (
//                             <InputField
//                                 {...field}
//                                 label="Subject"
//                                 placeholder="Brief description of your issue"
//                                 type="text"
//                                 error={errors.subject}
//                             />
//                         )}
//                     />

//                     {/* Notes */}
//                     <div>
//                         <label className="block text-sm font-medium text-[#1D2530] mb-1">Notes</label>
//                         <Controller
//                             control={control}
//                             name="notes"
//                             rules={{ required: "Please provide some details" }}
//                             render={({ field }) => (
//                                 <>
//                                     <textarea
//                                         {...field}
//                                         rows={6}
//                                         placeholder="Please provide detailed information about your issue or question..."
//                                         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300 ${errors.notes ? "border-red-400 focus:ring-red-300" : ""
//                                             }`}
//                                     />
//                                     {errors.notes && (
//                                         <p className="mt-1 text-xs text-red-500">{errors.notes.message}</p>
//                                     )}
//                                 </>
//                             )}
//                         />
//                     </div>

//                     {/* Attachment (optional) */}
//                     <div>
//                         <label className="block text-sm font-medium text-[#1D2530] mb-1">
//                             Attachment <span className="text-slate-400">(optional)</span>
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type="file"
//                                 {...register("attachment")}
//                                 accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
//                                 className="w-full h-11 border border-gray-300 rounded-md file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-slate-100 file:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                             />
//                             <FiUploadCloud className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                         </div>
//                         {file && (
//                             <p className="text-xs text-slate-500 mt-1">Selected: {file.name}</p>
//                         )}
//                     </div>

//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full h-11 rounded-xl bg-[#1556D4] text-white font-medium flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-60"
//                     >
//                         <FiSend />
//                         {isSubmitting ? "Submitting..." : "Submit Request"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default SupportRequestForm;
