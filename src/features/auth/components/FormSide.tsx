import { FaStar } from "react-icons/fa";

import avatar from '../../../assets/images/avatar.png';

const FormSide = () => {
    return (
        <div className='hidden sm:flex flex-col items-center justify-center col-span-6 dark:bg-[#2C2D34] h-full'>
            <div className='max-w-[516px] mx-auto'>
                <div className='flex items-center gap-1.5 justify-center'>
                    {Array.from({ length: 5 }).map((_, index) => (<FaStar key={index} className='text-[#F5DD0A]' />))}
                </div>
                <div className='font-semibold text-2xl text-[#1D2530D9] dark:text-white py-5 text-center'>Docsify is the ultimate training manual tool and saves us thousands of hours per year</div>
                <div className='flex flex-col items-center justify-center '>
                    <div className='w-[72px] h-[72px] rounded-full'>
                        <img src={avatar} alt="Avatar" className='rounded-full' />
                    </div>
                    <div className='text-xl font-semibold text-[#1D2530D9] dark:text-white mt-2'>Daniel Ekon</div>
                    <div className='text-[#1D2530D9] dark:text-white font-medium'>Safety Director, Advantage Building</div>
                </div>
            </div>
        </div>
    )
}

export default FormSide