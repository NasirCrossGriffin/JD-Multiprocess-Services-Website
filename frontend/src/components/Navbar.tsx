import LanguageToggle from './LanguageToggle';
import './styles/Navbar.css'
import { useTranslation } from "react-i18next";


interface NavbarProps {
  serviceRefs: React.RefObject<(HTMLDivElement | null)[]>;
  scrollToHome: Function;
  scrollToAbout : Function;
  scrollToContact : Function;
}

function Navbar({ serviceRefs, scrollToAbout, scrollToHome, scrollToContact }: NavbarProps) {

  const scrollToService = (index: number) => {
    serviceRefs.current?.[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const { t } = useTranslation();

  return (
    <>
      <div className='Navbar'>
        <div className='Logo'>
            <img src="/Multiprocess_And_Services_Alt.png"/>
        </div>
        <div className='NavLinks'>
            <button onClick={() => {scrollToHome()}}><p className='NavLink'>{t("navbar.home")}</p></button>
            <button onClick={() => {scrollToAbout()}}><p className='NavLink'>{t("navbar.about")}</p></button>
            <button onClick={() => {scrollToService(0)}}><p className='NavLink'>{t("navbar.taxes")}</p></button>
            <button onClick={() => {scrollToService(1)}}><p className='NavLink'>{t("navbar.notary")}</p></button>
            <button onClick={() => {scrollToService(2)}}><p className='NavLink'>{t("navbar.weddings")}</p></button>
            <button onClick={() => {scrollToService(3)}}><p className='NavLink'>{t("navbar.bookkeeping")}</p></button>
        </div>
        <div className='Buttons'>
        <button className='ContactUs' onClick={() => {scrollToContact()}}>
            {t("navbar.contact")}
        </button>
        <LanguageToggle />
        </div>
      </div>
    </>
  )
}

export default Navbar
