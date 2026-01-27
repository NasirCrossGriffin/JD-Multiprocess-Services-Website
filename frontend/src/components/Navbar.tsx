import LanguageToggle from './LanguageToggle';
import './styles/Navbar.css'

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

  return (
    <>
      <div className='Navbar'>
        <div className='Logo'>
            <img src="/Multiprocess_And_Services_Alt.png"/>
        </div>
        <div className='NavLinks'>
            <button onClick={() => {scrollToHome()}}><p className='NavLink'>Inicio</p></button>
            <button onClick={() => {scrollToAbout()}}><p className='NavLink'>Sobre</p></button>
            <button onClick={() => {scrollToService(0)}}><p className='NavLink'>Impuestos</p></button>
            <button onClick={() => {scrollToService(1)}}><p className='NavLink'>Notary</p></button>
            <button onClick={() => {scrollToService(2)}}><p className='NavLink'>Bodas</p></button>
            <button onClick={() => {scrollToService(3)}}><p className='NavLink'>Contabilidad</p></button>
        </div>
        <div className='Buttons'>
        <button className='ContactUs' onClick={() => {scrollToContact()}}>
            Contacto
        </button>
        <LanguageToggle />
        </div>
      </div>
    </>
  )
}

export default Navbar
