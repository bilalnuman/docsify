import { type ReactNode } from "react";
import Modal from "./";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "../Button";
interface Props {
    open?: number | boolean;
<<<<<<< HEAD
    loading?: boolean;
=======
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    onClose?: () => void;
    setOpen?: (value: boolean) => void;
    children?: ReactNode;
    onConfirm?: (value: number | undefined | boolean) => void;
}
<<<<<<< HEAD
const DeleteModal = ({ onConfirm, open = false,loading=false, children, setOpen = () => { }, onClose = () => { } }: Props) => {

    return (
        <div>
=======
const DeleteModal = ({ onConfirm, open = false, children, setOpen = () => { }, onClose = () => { } }: Props) => {

    return (
        <div>
            {/* <Button onClick={() => setOpen(true)} variant="danger" className="!border !bg-transparent !h-10 !text-red-default !border-red-default hover:!bg-red-default hover:!text-white !font-medium !text-sm !w-full">Delete</Button> */}

>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
            <Modal isOpen={Boolean(open)} onClose={() => { setOpen(false); onClose() }}>
                <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full mb-4">
                        <RiDeleteBin5Line className=" text-gray-default dark:text-white" size={48} />
                    </div>
                    <h2 className="font-medium text-[#1D253080] dark:text-white">
                        Are you sure you want to delete this?
                    </h2>
                    <div className="flex gap-3 mt-6">
<<<<<<< HEAD
                        <Button variant="outline" className="!border-[#2E313926] !text-[#2E313980] dark:!text-white dark:!border-white" onClick={() => { setOpen(false); onClose() }}>No, cancel</Button>
                        <Button loading={loading} variant="danger" className="!border !h-10 !text-white !border-red-default !bg-red-default hover:!bg-red-default/50 !font-medium !text-sm" onClick={() => onConfirm?.(open ?? undefined)}> Yes, I’m sure</Button>
=======
                         <Button variant="outline" onClick={() => { setOpen(false); onClose() }}>Cancel</Button>
                        <Button variant="danger" className="!border !h-10 !text-white !border-red-default !bg-red-default hover:!bg-red-default/50 !font-medium !text-sm" onClick={() => onConfirm?.(open ?? undefined)}> Yes, I’m sure</Button>
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteModal;
