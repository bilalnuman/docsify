import Modal from "../index";
import { forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "@/components/Heading";
import Form from "@/components/form/Form";
import { loginSchema, type LoginFormValue } from "@/features/auth/schemas/authSchema";
import Input from "@/components/form/Input";
import Button from "@/components/Button";

export interface NewSafetyDetailsModalHandle {
    cancel: () => void;
}
interface Props {
    open?: number | boolean;
    onClose?: () => void;
    setOpen?: (value: boolean) => void;
    onConfirm?: (value: LoginFormValue | any) => void;
}

const LoaginModal = forwardRef<NewSafetyDetailsModalHandle, Props>(
    (
        {
            onConfirm,
            open = false,
            setOpen = () => { },
            onClose = () => { },
        }: Props,
        ref
    ) => {
        const router = useNavigate()

        const onSubmit = (data: LoginFormValue) => {
            if (open === true) {
                router("/safety-meetings/topic-meeting-generator",
                    { state: data }
                )
                handleCancel();
            } else {
                onConfirm?.(data);
            }
        }

        const handleCancel = () => {
            setOpen(false);
            onClose();
        };

        useImperativeHandle(ref, () => ({
            cancel: handleCancel,
        }));
        return (
            <Modal isOpen={Boolean(open)} onClose={() => { setOpen(false); onClose() }}>
                <Heading title="Sign In" className='mb-4 ' />
                <Form
                    schema={loginSchema}
                    onSubmit={onSubmit}
                >
                    {({ register, formState: { errors, isSubmitting } }) => {
                        return (
                            <div className="flex flex-col gap-4">
                                <Input label="Email" {...register("email")}
                                    error={errors.email?.message}
                                    required
                                />
                                <Input
                                    label="Password"
                                    {...register("password")}
                                    type="password"
                                    error={errors.password?.message}
                                    required
                                />
                                <Button
                                    className="h-11"
                                    type="submit"
                                    loading={isSubmitting}
                                >
                                    Login
                                </Button>
                            </div>
                        )
                    }}

                </Form>
            </Modal>
        );
    });

export default LoaginModal;

