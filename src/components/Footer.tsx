import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="flex sm:justify-between justify-center py-4 px-6 text[#1D253080] text-lg dark:!text-white/50 sm:flex-row flex-col-reverse gap-y-2">
      <div className="sm:text-start text-center">{t("copyright")} © {new Date().getFullYear()} {t("footerCopyright")}</div>
      <div className="flex gap-2 items-center sm:justify-end justify-center">
        <div>{t("socialLinks")}:</div>
        <Link to={"https://www.facebook.com/profile.php?id=100094723835662"} target="_blank" rel="noreferrer"><FaFacebookF className="text-[#1556D4] dark:text-white" size={20} /></Link>
        <Link to={"https://www.facebook.com/profile.php?id=100094723835662"} target="_blank" rel="noreferrer"><FaLinkedin className="text-[#1556D4] dark:text-white" size={20} /></Link>
        <Link to={"https://www.facebook.com/profile.php?id=100094723835662"} target="_blank" rel="noreferrer"><FaXTwitter className="text-[#1556D4] dark:text-white" size={20} /></Link>
        <Link to={"https://www.facebook.com/profile.php?id=100094723835662"} target="_blank" rel="noreferrer"><IoLogoInstagram className="text-[#1556D4] dark:text-white" size={20} /></Link>
      </div>
    </footer>
  )
}

export default Footer