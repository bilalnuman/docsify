import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./";
import InputField from "@/features/auth/components/InputField";
import { BsChevronDown } from "react-icons/bs";
import { formErrorToast } from "@/util/formErrorToast";
import { toast } from "react-toastify";


import { z } from "zod";
import Button from "../Button";
import { useInviteMember } from "@/hooks/useTeam";
import { nameSchema } from "@/features/auth/schemas/authSchema";

export const inviteSchema = z.object({
    name: nameSchema,
    email: z
        .string("Please enter a valid email address")
        .email("Please enter a valid email address"),
    role: z.enum(["editor", "viewer", "admin"], {
        error: "Please select a role",
    }),
});

export type InviteFormValues = z.infer<typeof inviteSchema>;


interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    onInvite?: (data: InviteFormValues) => Promise<void> | void;
}

const roleCopy: Record<Exclude<InviteFormValues["role"], "admin">, string> = {
    editor: "Editor - Can use tools and create content",
    viewer: "Viewer - Read-only",
};

export default function TeamInviteModal({ open, setOpen, onInvite }: Props) {
    const { mutateAsync: inviteMember, isPending } = useInviteMember()

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<InviteFormValues>({
        resolver: zodResolver(inviteSchema),
        defaultValues: { name: "", email: "", role: "viewer" },
    });

    const onSubmit = async (data: InviteFormValues) => {
        console.log(data)
        inviteMember(data, {
            onSuccess(data, variables, context) {
                reset();
                toast.success(data?.message);
                setOpen(false);
            },
            onError(error) {
                formErrorToast(error);
            },
        })
    };

    const onCancel = () => {
        reset();
        setOpen(false);
    };

    return (
        <Modal isOpen={open} onClose={onCancel}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 dark-form-field">
                <h3 className="text-start w-full text-[#1D2530] text-xl font-medium dark:text-white">
                    Invite Team Members
                </h3>

                {/* Name */}
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            {...field}
                            label="Name"
                            placeholder="Liam King"
                            type="text"
                            error={errors.name}
                        />
                    )}
                />

                {/* Email */}
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            {...field}
                            label="Email Address"
                            placeholder="colleague@company.com"
                            type="email"
                            error={errors.email}
                        />
                    )}
                />

                {/* Role */}
                <div className="text-start">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                    </label>

                    <div className="relative">
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className={`w-full appearance-none rounded-md border ${errors.role
                                        ? "border-red-500 focus:ring-red-300 dark:border-red-500 dark:focus:ring-red-500/50"
                                        : "border-gray-300 focus:ring-blue-300 dark:border-white/20 dark:focus:ring-blue-500/50"
                                        } bg-white dark:bg-[#2C2D34] px-3 py-2 pr-9 
           text-gray-900 dark:text-white 
           focus:outline-none focus:ring-2`}
                                >
                                    <option value="viewer">{roleCopy.viewer}</option>
                                    <option value="editor">{roleCopy.editor}</option>
                                </select>
                            )}
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <BsChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </span>
                    </div>


                    {errors.role && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="outline" className="!text-[#2E313980] !border-[#2E313980] dark:!border-white dark:!text-white" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" loading={isPending}>Send Invitation</Button>
                </div>
            </form>
        </Modal>
    );
}
