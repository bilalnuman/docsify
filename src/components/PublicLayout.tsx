import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import AppLogo from "@/assets/images/logo.svg";
import AppDarkLogo from "@/assets/images/dark-logo.svg";

const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='px-4'>
            <div className='flex items-center justify-between mt-4 '>
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <img src={AppLogo} alt="logo" className=' w-[102px] dark:hidden' />
                        <img src={AppDarkLogo} alt="logo" className=' w-[102px] hidden dark:block' />
                    </Link>
                </div>
                <DarkModeToggle />
            </div>
            {children}
        </div>
    )
}

export default PublicLayout