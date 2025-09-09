import { Controller, useForm } from "react-hook-form";
<<<<<<< HEAD
import InputField from "@/features/auth/components/InputField";
import Navbar from "@/features/landing/components/Navbar";
import { BsSend } from "react-icons/bs";
import Button from "@/components/Button";
import { PiEnvelopeLight } from "react-icons/pi";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
=======
import InputField from "../features/auth/components/InputField";
import Navbar from "../features/landing/components/Navbar";
import { BsSend } from "react-icons/bs";
import Button from "../components/Button";
import { PiEnvelopeLight } from "react-icons/pi";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { toast } from "react-toastify";
import { useApi } from "../features/auth/services/authService";
import { formErrorToast } from "../util/formErrorToast";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

type ContactForm = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
};

const ContactUs = () => {
<<<<<<< HEAD
=======
  const { request, loading } = useApi();
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (form: ContactForm) => {
<<<<<<< HEAD
=======
    const { data, error } = await request({
      endpoint: "v1/contact/",
      data: form,
      method: "POST",
    });

    if (data?.success) {
      toast.success(data?.message);
      reset();
    } else {
      // @ts-ignore
      const msg = error?.response?.data?.message;
      formErrorToast(msg, true);
    }
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-6 max-w-[1440px] mx-auto px-4 sm:px-6 pb-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[28px] font-semibold text-dark-default dark:text-white pt-5">
            Contact Us
          </h1>
          <p className="text-[#1D253080] dark:text-[#FFFFFF80] mt-1 max-w-[650px] mx-auto px-3 pt-3 pb-4 text-lg">
            Have questions about SafetyPro? We’re here to help. Reach out to our
            team and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Sidebar */}
          <aside className="lg:col-span-4 border dark:border-white/10 rounded-xl h-fit bg-white dark:bg-[#1E1E24]">
            <div className="rounded-xl p-5 space-y-5">
              <h2 className="text-lg font-semibold text-[#1D2530] dark:text-white">
                Get in Touch
              </h2>

              <div className="space-y-5 text-sm">
                <div>
                  <div className="font-medium text-dark-default dark:text-gray-200 flex items-center">
                    <PiEnvelopeLight
                      className="text-blue-default me-1"
                      size={18}
                    />
                    Email
                  </div>
                  <div className="text-gray-500 dark:text-[#FFFFFF80] ps-5">
                    support@docsify.com
                  </div>
                </div>

                <div>
                  <div className="font-medium text-dark-default dark:text-gray-200 flex items-center">
                    <CiLocationOn
                      className="text-blue-default me-1"
                      size={18}
                    />
                    Address
                  </div>
                  <div className="text-gray-500 dark:text-[#FFFFFF80] ps-5">
                    123 Safety Street
                    <br />
                    Compliance City, CC 12345
                  </div>
                </div>

                <div>
                  <div className="font-medium text-dark-default dark:text-gray-200 flex items-center">
                    <CiClock2 className="text-blue-default me-1" size={18} />
                    Business Hours
                  </div>
                  <div className="text-gray-500 dark:text-[#FFFFFF80] ps-5">
                    Monday – Friday: 9AM – 6PM EST
                    <br />
                    Saturday: 10AM – 4PM EST
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <section className="lg:col-span-8 border dark:border-white/10 rounded-xl bg-white dark:bg-[#1E1E24] contact-form">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl p-5 space-y-6"
            >
              <h2 className="text-lg font-semibold text-[#1D2530] dark:text-white">
                Send us a Message
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: "Please enter your full name" }}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Name"
                      placeholder="Your full name"
                      type="text"
                      error={errors.name}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Please enter your email",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email",
                    },
                  }}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Email"
                      placeholder="your.email@gmail.com"
                      type="email"
                      error={errors.email}
                    />
                  )}
                />
              </div>

              <Controller
                control={control}
                name="company"
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="Company"
                    placeholder="Your company name"
                    type="text"
                    error={errors.company}
                  />
                )}
              />

              <Controller
                control={control}
                name="subject"
                rules={{ required: "Please add a subject" }}
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="Subject"
                    placeholder="What can we help you with?"
                    type="text"
                    error={errors.subject}
                  />
                )}
              />

              <div>
                <label className="block text-sm font-medium text-[#1D2530] dark:text-gray-200 mb-1">
                  Message
                </label>
                <Controller
                  control={control}
                  name="message"
                  rules={{ required: "Please add a brief message" }}
                  render={({ field }) => (
                    <>
                      <textarea
                        {...field}
                        rows={6}
                        placeholder="Tell us more about your inquiry"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
                          border-gray-300 dark:border-white/10
                          bg-white dark:bg-white/5
                          text-gray-800 dark:text-gray-200
<<<<<<< HEAD
                          focus:ring-blue-300 ${errors.message
                            ? "border-red-400 focus:ring-red-300"
                            : ""
=======
                          focus:ring-blue-300 ${
                            errors.message
                              ? "border-red-400 focus:ring-red-300"
                              : ""
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                          }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <Button
                type="submit"
<<<<<<< HEAD
                className="w-full h-11"
                iconLeft={<BsSend />}
              >
                Send Message
=======
                disabled={loading}
                className="w-full h-11"
                iconLeft={<BsSend />}
              >
                {loading ? "Sending..." : "Send Message"}
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
