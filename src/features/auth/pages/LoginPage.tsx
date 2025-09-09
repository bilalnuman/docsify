import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormValue } from '../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthForm from '../components/AuthForm';
import { toast } from 'react-toastify';
import { formErrorToast } from '@/util/formErrorToast';
import AppLogo from "@/assets/images/logo.svg"
import AppDarkLogo from "@/assets/images/dark-logo.svg"
import FormSide from '../components/FormSide';
import DarkModeToggle from '@/components/DarkModeToggle';
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
const base_url = import.meta.env.VITE_API_BASE_URL



const LoginPage = () => {
  const navitgate = useNavigate()
  const { authUser } = useAppContext()
  const { mutateAsync: login, isPending } = useLogin()
  const [terms, setTerms] = useState(false)
  const { handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const me = async (token: string) => {
    try {
      const res = await axios.get(`${base_url}/auth/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.data?.is_subscribed) {
        authUser(res?.data?.data)
        Cookies.set("access_token", token, {
          expires: 7,
          secure: true,
          sameSite: "strict"
        });

      }
      else {
        authUser(res?.data?.data)
        Cookies.set("access_token", token, {
          expires: 7,
          secure: true,
          sameSite: "strict"
        });
        navitgate("/")
      }
      return res.data;
    } catch (err: any) {
      console.error("Failed to fetch user profile:", err);
      throw err;
    }
  };

  const onSubmit = async (form: LoginFormValue) => {
    login({ ...form, rememberMe: terms }, {
      onSuccess(data: any) {
        me(data?.data.access_token)
        toast.success(data?.message, { toastId: "login-success" });
        reset()
      },
      onError(error) {
        // @ts-ignore
        const msg = error?.response?.data?.message
        formErrorToast(msg, true)
      },
    })
  };



  const fields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: "Enter your email", },
    { name: 'password', label: 'Password', type: 'password', placeholder: "********", },
  ];

  return (
    <div className='min-h-screen'>
      <div className='max-w-[1440px] mx-auto'>
        <div className="grid sm:grid-cols-12 items-center">
          <FormSide />
          <div className='col-span-6 bg-white dark:bg-[#1A1B20] min-h-screen p-4'>
            <div className='flex items-center justify-between'>
              <img src={AppLogo} alt="logo" className=' w-[102px] dark:hidden' />
              <img src={AppDarkLogo} alt="logo" className=' w-[102px] hidden dark:block' />
              <DarkModeToggle />
            </div>
            <AuthForm
              className='max-w-[500px] mx-auto min-h-[calc(100vh-4rem)] sm:block flex flex-col justify-center'
              fields={fields}
              control={control}
              errors={errors}
              isSubmitting={isPending}
              onSubmit={handleSubmit(onSubmit)}

              buttonText="Sign In"
              formHeader={
                <>
                  <div className='text-3xl font-semibold capitalize text-[#1D2530] dark:text-white'>Sign In</div>
                  <div className='text-[#1D253080] mb-7 dark:text-white'>Start your 14 days free trial</div>
                </>
              }
              formFooter={
                <div className='flex items-center justify-between -mt-2 mb-5'>
                  <div className='flex items-center gap-1 accent-[#1556D4]'>
                    <input type='checkbox' className='w-4 h-4 cursor-pointer dark:accent-blue-600' onChange={() => setTerms(!terms)} />
                    <span className='text-[#1D253080] dark:text-white'>Remember me</span>
                  </div>
                  <div className="text-end">
                    <Link to="/forgot-password" className="text-[#1556D4] text-sm underline">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              }
            >
              <div className='text-center text-sm text-[#1D253080] dark:text-white mt-2'>
                Don’t have an account? <Link to="/register" className="text-[#1556D4] underline font-bold">Sign Up</Link>
              </div>
            </AuthForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
