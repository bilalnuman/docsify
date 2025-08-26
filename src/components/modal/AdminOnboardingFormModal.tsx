
import InputField from "../../features/auth/components/InputField";
import Button from "../Button";
import Modal from "./";
import { Controller, useForm } from "react-hook-form";
interface Props {
    setOpen: (value: boolean) => void,
    open: boolean
}
type AdminOnboardingValues = {
    name: string;
    company: string;
};

const AdminOnboardingFormModal = ({ setOpen, open }: Props) => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<AdminOnboardingValues>({
        defaultValues: {
            name: "",
            company: "",
        },
    });

    const onSubmit = (data: any) => {
        setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };

    return (
        <div>

            <Modal isOpen={open} onClose={() => setOpen(false)}>

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
                        {onCancel && (
                            <Button
                                variant="outline"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        )}
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
