
<<<<<<< HEAD
import InputField from "@/features/auth/components/InputField";
import Button from "../Button";
import Modal from "@/components/modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminSchema, type AdminFormValue } from "@/features/auth/schemas/authSchema";
import { useCompany } from "@/hooks/useCompany";
import { toast } from "react-toastify";
import { formErrorToast } from "@/util/formErrorToast";
import { useProfile } from "@/hooks/useUser";
import type { UserData } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
=======
import InputField from "../../features/auth/components/InputField";
import Button from "../Button";
import Modal from "./";
import { Controller, useForm } from "react-hook-form";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
interface Props {
    setOpen: (value: boolean) => void,
    open: boolean
}
<<<<<<< HEAD

const AdminOnboardingFormModal = ({ setOpen, open }: Props) => {
    const { authUser, setIsReady } = useAppContext()
    const { mutate, isPending, isSuccess } = useCompany()
    const { data: meData, isLoading } = useProfile(isSuccess)
=======
type AdminOnboardingValues = {
    name: string;
    company: string;
};

const AdminOnboardingFormModal = ({ setOpen, open }: Props) => {
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
<<<<<<< HEAD
    } = useForm<AdminFormValue>({
        resolver: zodResolver(adminSchema),
=======
    } = useForm<AdminOnboardingValues>({
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        defaultValues: {
            name: "",
            company: "",
        },
    });

    const onSubmit = (data: any) => {
<<<<<<< HEAD
        mutate(data, {
            onSuccess(data) {
                toast.success(data?.message || "Company created successfully")
            },
            onError(error) {
                formErrorToast(error)
            },
        })
    };
    useEffect(() => {
        if (!isLoading && meData?.data?.profile?.is_company) {
            const profile: UserData | null =
                (meData as { meData?: UserData } | undefined)?.meData ?? null;
            setOpen(false);
            // @ts-ignore
            authUser(profile);
            setIsReady(true);
        }
    }, [meData])
    return (
        <div>

            <Modal isOpen={open} onClose={() => setOpen(false)} noCancel={true}>
=======
        setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };

    return (
        <div>

            <Modal isOpen={open} onClose={() => setOpen(false)}>

>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 dark-form-field">
                    <div className="text-start w-full text-[#1D2530] text-xl font-medium dark:text-white">Admin Onboarding</div>
                    {/* Name */}
                    <div className="text-start">
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: "Please enter a name" }}
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
                    </div>

                    {/* Company */}
                    <div className="text-start">
                        <Controller
                            control={control}
                            name="company"
                            rules={{ required: "Please enter your company name" }}
                            render={({ field }) => (
                                <InputField
                                    {...field}
                                    label="Company"
                                    placeholder="Enter your company name"
                                    type="text"
                                    error={errors.company}
                                />
                            )}
                        />
                    </div>


                    <div className="flex items-center justify-end gap-3 pt-2">
<<<<<<< HEAD
                        {/* {onCancel && (
                            <Button
                                variant="outline"
                                className="!text-[#2E313980] !border-[#2E313926]"
=======
                        {onCancel && (
                            <Button
                                variant="outline"
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
<<<<<<< HEAD
                        )} */}
=======
                        )}
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                        <Button
                            type="submit"
                            loading={isSubmitting}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminOnboardingFormModal;
