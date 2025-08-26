import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import clsx from "clsx";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import InputField from "../features/auth/components/InputField";
import ChangePasswordFormModal from "../components/modal/ChangePasswordFormModal";
import Button from "../components/Button";
import { formErrorToast } from "../util/formErrorToast";
import { useApi } from "../features/auth/services/authService";

type MeResponse = {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  location?: string | null;
  department?: string | null;
  bio?: string | null;
  profile_picture?: string | null;
};

function getInitials(name?: string, email?: string) {
  const source = (name && name.trim()) || email || "";
  if (!source) return "NA";
  if (!name) return (email || "").slice(0, 2).toUpperCase();
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "NA";
}

const Profile: React.FC = () => {
  const { request: fetchMe, loading: meLoading, data: meData } = useApi<unknown, MeResponse>();
  const { request: updateReq, loading: updating } = useApi<FormData, any>();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [] = useState(false)

  const [serverAvatarUrl, setServerAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      company: "",
      location: "",
      department: "",
      bio: "",
      email: "",
    },
  });

  const name = watch("name");
  const email = watch("email");
  const initials = useMemo(() => getInitials(name, email), [name, email]);

  useEffect(() => {
    if (!avatarFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const reseInfo = (user: any) => {
    reset({
      name: user?.name ?? "bilal",
      company: user?.company ?? "",
      location: user?.location ?? "",
      department: user?.department ?? "",
      bio: user?.bio ?? "",
      email: user?.email ?? "",
    });
    setServerAvatarUrl(user?.profile_picture || null);
  }


  useEffect(() => {
    (async () => {
      const { data, error } = await fetchMe({
        endpoint: "auth/me/",
        method: "GET",
      });
      if (data) {
        // @ts-ignore
        const user = data?.data?.profile
        reseInfo(user)

      } else if (error) {
        toast.error("Failed to load profile.");
      }
    })();

  }, []);

  const onSubmit = async (form: any) => {
    try {
      const body = new FormData();
      body.append("name", String(form.name ?? ""));
      body.append("company", String(form.company ?? ""));
      body.append("location", String(form.location ?? ""));
      body.append("department", String(form.department ?? ""));
      body.append("bio", String(form.bio ?? ""));
      if (avatarFile) body.append("profile_picture", avatarFile);

      const { data, error } = await updateReq({
        endpoint: "auth/update/",
        method: "PUT",
        data: body,
      });

      if (!error) {
        toast.success("Profile updated successfully.");
        setEdit(false);
        const { data, error } = await fetchMe({ endpoint: "auth/me/", method: "GET" });
        // @ts-ignore
        const user = data?.data?.profile
        if (user) {
          reseInfo(user)
          setAvatarFile(null);
          setPreviewUrl(null);
        }
      } else {
        const msg = error?.response?.data?.message || "Update failed";
        formErrorToast(msg, true);
      }
    } catch (e: any) {
      formErrorToast(e?.message || "Update failed", true);
    }
  };

  const currentAvatar = previewUrl || serverAvatarUrl;
  // @ts-ignore
  const role = meData?.data?.profile?.role

  return (
    <div className="pt-5 profile">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-[28px] font-semibold text-dark-default dark:text-white">
          Profile
        </h1>
        <p className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
          Manage your account information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="dark-form-field">
        <div className="p-4 bg-white dark:bg-[#2C2D34] mt-3 rounded-xl border border-transparent dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div
              className={clsx(
                "flex items-center gap-3",
                !edit && "opacity-70 disabled-form pointer-events-none"
              )}
            >

              <label
                htmlFor="avatar"
                className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-[92px] md:w-[92px] rounded-full overflow-hidden cursor-pointer ring-1 ring-[#1556D41A] bg-[#1556D41A] hover:bg-slate-400/30 dark:hover:bg-gray-500 duration-300 flex items-center justify-center"
                title={edit ? "Change avatar" : ""}
              >
                {currentAvatar ? (
                  <img
                    src={currentAvatar}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-xl font-semibold text-[#1556D4] select-none">
                    {initials}
                  </div>
                )}
                <input
                  id="avatar"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  disabled={!edit}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (!/^image\/(png|jpe?g)$/i.test(file.type)) {
                      toast.error("Please select a PNG or JPG image.");
                      return;
                    }
                    if (file.size > 3 * 1024 * 1024) {
                      toast.error("Max file size is 3MB.");
                      return;
                    }
                    setAvatarFile(file);
                  }}
                />
              </label>
              <div className="min-w-0">
                <p className="font-medium text-dark-default dark:text-white text-base truncate">
                  {name || "Your Name"}
                </p>
                <p className="text-sm text-gray-400 dark:text-white/50 truncate">
                  {email || "—"}
                </p>
                <div className=" capitalize dark:bg-white bg-blue-default text-white py-1 dark:text-[#1A1B20] mt-2 rounded-full w-fit px-3 text-sm">{role}</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-2 sm:min-w-[280px]">
              {!edit ? (
                <button
                  onClick={() => setEdit(true)}
                  type="button"
                  className="w-full sm:w-auto text-[#1D2530] dark:text-white border border-[#1D25301A] dark:border-white/10 rounded-lg h-10 flex justify-center items-center whitespace-nowrap px-3 hover:bg-dark-default/10 dark:hover:bg-white/10 gap-2"
                >
                  <CiEdit size={20} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setOpen(true)}
                    type="button"
                    className="w-full sm:w-auto text-[#1D2530] dark:text-white border border-[#1D25301A] dark:border-white/10 rounded-lg h-10 flex justify-center items-center whitespace-nowrap px-3 hover:bg-dark-default/10 dark:hover:bg-white/10"
                  >
                    Change Password
                  </button>
                  <Button
                    type="submit"
                    loading={updating}
                    className="w-full sm:w-auto h-10"
                  >
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>


        <div className="bg-white dark:bg-[#2C2D34] rounded-xl p-4 mt-5 border border-transparent dark:border-gray-700">
          <div className="text-xl font-medium text-[#1D2530] dark:text-white">
            Personal Information
          </div>
          {meLoading && (
            <div className="mt-4 h-1.5 w-full rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div className="h-full w-1/3 bg-[#1556D4] animate-pulse" />
            </div>
          )}

          <div
            className={clsx(
              "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5",
              !edit && "opacity-70 disabled-form pointer-events-none"
            )}
          >
            <div>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="Full Name"
                    placeholder="Enter Full Name"
                    type="text"
                    error={errors["name"]}
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1D2530] dark:text-gray-200 mb-1">
                Email
              </label>
              <div className="w-full px-3 py-2 border rounded-md focus:outline-none relative border-gray-300 dark:border-white/10 h-10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 opacity-70 cursor-not-allowed">
                {email || "—"}
              </div>
            </div>
            {role == 'viewer' ?
              <div>
                <label className="block text-sm font-medium text-[#1D2530] dark:text-gray-200 mb-1">
                  Company
                </label>
                <div className="w-full px-3 py-2 border rounded-md focus:outline-none relative border-gray-300 dark:border-white/10 h-10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 opacity-70 cursor-not-allowed">
                  {email || "—"}
                </div> </div> :
              <div>
                <Controller
                  control={control}
                  name="company"
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label="Company"
                      placeholder="Enter Company Details"
                      type="text"

                      error={errors["company"]}
                    />
                  )}
                />
              </div>}

            <div>
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="Location"
                    placeholder="Enter Location Details"
                    type="text"
                    error={errors["location"]}
                  />
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Controller
                control={control}
                name="department"
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="Department"
                    placeholder="Enter Department Details"
                    type="text"
                    error={errors["department"]}
                  />
                )}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-[#1D2530] dark:text-gray-200 mb-1"
              >
                Bio
              </label>
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <textarea
                    className="w-full px-3 py-2 border rounded-md focus:outline-none relative focus:ring-2 border-gray-300 dark:border-white/10 focus:ring-blue-300 bg-white dark:bg-white/5 text-gray-800 dark:text-gray-200"
                    {...field}
                    placeholder="Enter Bio Details"
                    rows={5}
                    id="bio"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </form>

      <ChangePasswordFormModal
        open={open}
        setOpen={setOpen}
        onConfirm={() => setEdit(false)}
      />
    </div>
  );
};

export default Profile;
