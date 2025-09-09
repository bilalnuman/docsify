import { IoIosLogOut } from "react-icons/io";
import { Dropdown } from './Dropdown';
import Button from "./Button";
import { clearCookiesAndStorage } from "@/helpers/logoutUser";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { useAppContext } from "@/context/AppContext";

interface Props {
  user: any;
  initials?: string;
}

const Profile = ({ user, initials }: Props) => {
  const { authUser } = useAppContext()
  const navigate = useNavigate()
  const handleLogout = () => {
    clearCookiesAndStorage()
    // @ts-ignore
    authUser(null)
    navigate("/login", { replace: true });
  };
  return (
    <Dropdown
      label={<img src={user?.profile_picture} alt="profile" className="w-10 h-10 rounded-full" />}
      classNames={{
        icon: "dark:!text-white",
        menu: "dark:!bg-[#2C2D34] dark:!border-[#2C2D34] !min-w-[200px] shadow-md"

      }}
      dropdown={{ right: 15, left: "unset", top: 10 }}
    >
      <Button variant='ghost' as='a' href='/profile' iconLeft={<CiUser size={20} />} className='text-dark-default dark:!text-white !justify-start hover:dark:!bg-dark-default'>Profile</Button>
      <Button
        onClick={handleLogout}
        variant='ghost' iconLeft={<IoIosLogOut size={20} />} className='hover:dark:!bg-dark-default text-dark-default dark:!text-white !justify-start'>Logout</Button>
    </Dropdown>
  )
}

export default Profile