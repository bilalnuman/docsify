import axios from "axios";
import { toast } from "react-toastify";

export const formErrorToast = (error: any, isString = false) => {
    const errors = axios.isAxiosError(error)
        ? JSON.stringify(error.response?.data?.errors ?? {})
            .replace(/[{}\[\]"']/g, '')
            .replace(/,/g, '\n')
            .replace(/[^:\n]+:/g, '')
        : '';
    toast.error(isString ? error : <div>
        {
            errors.split('\n').map((line, i) => (
                <div key={i} > {line} </div>
            ))
        }
    </div>,
        { toastId: "auth-toast",
            autoClose:1600
         }
    );
};