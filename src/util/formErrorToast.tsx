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
<<<<<<< HEAD
                <div key={i} > {line??"Something went wrong. Please try again later."} </div>
=======
                <div key={i} > {line} </div>
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
            ))
        }
    </div>,
        {
            toastId: "auth-toast",
            autoClose: 1600
        }
    );
};

export const getError = (error: any, isString = false) => {
    if (isString) {
        return error;
    }
    return axios.isAxiosError(error)
        ? JSON.stringify(error.response?.data?.errors ?? {})
            .replace(/[{}\[\]"']/g, '')
            .replace(/,/g, '\n')
            .replace(/[^:\n]+:/g, '')
            .replaceAll('_', ' ')
        : '';
};