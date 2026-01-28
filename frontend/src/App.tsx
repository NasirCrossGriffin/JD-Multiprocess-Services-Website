import { useState, useRef, useEffect } from 'react'
import './App.css'
import { newContact } from './middleware/contact'
import Navbar from './components/Navbar'
import { useTranslation } from "react-i18next";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState<null | string>(null);
  const [sectionStates, setSectionStates] = useState<Record<number, boolean>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { t } = useTranslation();

  const services = [
    {
      titleKey: "services.taxes.title",
      copyKey: "services.taxes.copy",
      Img: "/Tax.png",
    },
    {
      titleKey: "services.notarizations.title",
      copyKey: "services.notarizations.copy",
      Img: "/General_Notorizations.png",
    },
    {
      titleKey: "services.weddings.title",
      copyKey: "services.weddings.copy",
      Img: "/Wedding_Divorce.png",
      Video: "/Wedding_Video.mp4",
    },
    {
      titleKey: "services.business.title",
      copyKey: "services.business.copy",
      Img: "/Business.png",
    },
    {
      titleKey: "services.njLicense.title",
      copyKey: "services.njLicense.copy",
      Img: "/NJ_License.png",
    },
    {
      titleKey: "services.translations.title",
      copyKey: "services.translations.copy",
      Img: "/Translations.png",
    },
    {
      titleKey: "services.minorTravel.title",
      copyKey: "services.minorTravel.copy",
      Img: "/Travel.png",
    },
  ];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Force mute both ways (attribute + property behavior)
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    // Attempt play; if blocked, it will reject (normal on mobile)
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // Autoplay blocked; you can optionally show a custom play overlay here
      }
    };

    // Try immediately and again when enough data is ready
    tryPlay();
    v.addEventListener("canplay", tryPlay);

    return () => v.removeEventListener("canplay", tryPlay);
  }, []);

  useEffect(() => {
  const els = serviceRefs.current.filter(Boolean) as HTMLDivElement[];
  const videoEl = videoRef.current;

  if (els.length === 0 && !videoEl) return;

  const observer = new IntersectionObserver(
    (entries) => {
      setSectionStates((prev) => {
        const next = { ...prev };

        for (const entry of entries) {
          const target = entry.target as HTMLElement;

          // Handle service sections
          const indexAttr = target.dataset.index;
          if (indexAttr) {
            const idx = Number(indexAttr);
            next[idx] = entry.isIntersecting;
          }

          // Handle video specifically
          if (videoEl && target === videoEl) {
            if (entry.isIntersecting) {
              videoEl.play().catch(() => {});
            } else {
              videoEl.pause();
            }
          }
        }

        return next;
      });
    },
    {
      threshold: 0.4,
      root: null,
      rootMargin: "0px 0px -15% 0px",
    }
  );

  // Observe service sections
  els.forEach((el) => observer.observe(el));

  // Observe the video element
  if (videoEl) {
    observer.observe(videoEl);
  }

  return () => observer.disconnect();
}, []);


 

  const scrollToService = (index: number) => {
  serviceRefs.current[index]?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  const scrollToHome = () => {
    homeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]); 

  const homeRef = useRef<(HTMLDivElement | null)>(null);

  const aboutRef = useRef<(HTMLDivElement | null)>(null);

  const contactRef = useRef<(HTMLDivElement | null)>(null);

  const submitContact = async () => {
    const contactObj = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      phone: phone,
      message: message
    };

    try {
      await newContact(contactObj);
      setMessageSent("Your contact message was sent!");
    } catch (err) {
      setMessageSent("Your contact message failed to send.");
    }
  };

  return (
    <>
      <div className='Home' ref={homeRef}>
        <div className='HomeCopy'>
          <div className='CopyContent'>
            <div className='Tagline'>
            
          </div>
          <div className='Heading'>
            <p>
              {t("home.heading")}
            </p>
          </div>
          <div className='Details'>
            <p>
              {t("home.details")}
            </p>
          </div>
          <button className='ContactUs' onClick={() => {scrollToContact()}}>
            {t("home.cta")}
          </button>
          </div>
        </div>
        <div className="Services">
          {services.map((service, index) => (
            <div
              className="Service"
              key={service.titleKey ?? index}
              onClick={() => scrollToService(index)}
            >
              <div className="ServiceIcon">
                <img src={service.Img} alt={t(service.titleKey)} />
              </div>
              <p className="ServiceName">{t(service.titleKey)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='About' ref={aboutRef}>
        <div className="AboutImage">
          <img src="/About_Image.JPG" alt="About Image" />
        </div>
        <div className='AboutContent'>
          <div className='AboutHeading'>
             JD Multiprocess & Services
          </div>
          <div className='AboutHeading'>
             Juliana De La Rosa
          </div>
          <div className='AboutHeading'>
             CEO
          </div>
          <div className='AboutCopy'
            dangerouslySetInnerHTML={{ __html: t("about.copy") }}
          >
          </div>
        </div>
      </div>

      <div className='Mission'>
        <div className='MissionContent'>
          <div className='MissionHeading'>
            {t("mission.heading")}
          </div>
          <div className='MissionCopy'
            dangerouslySetInnerHTML={{ __html: t("mission.copy") }}
          >
          </div>
          <div className="MissionImage">
            <img src="/Mission_Image.JPG" alt="Mission Image" />
          </div>
        </div>
      </div>

      {services.map((service, index) => (
        <div
          key={index}
          ref={(el) => {
            serviceRefs.current[index] = el;
          }}
          data-index={index}
          className={`ServiceSection ${
            sectionStates[index] ? "fade-in" : "fade-out"
          }`}
        >
          <div className='ServiceContent'>
            <h1 className="ServiceHeading">{t(service.titleKey)}</h1>
            <div
              className="ServiceCopy"
              dangerouslySetInnerHTML={{ __html: t(service.copyKey) }}
            />
          </div>

          {index !== 2 ? (
            <div className='ServiceImage'>
              <img src={service.Img} />
            </div>
          ) : null}

          {index === 2 ? (
            <video
	      ref={videoRef}	 
              src="/Wedding_Video_Silent.mp4"
              className='ServiceVideo'
              autoPlay={false}
              loop
              muted
              playsInline
              disablePictureInPicture
              controls={false}
              tabIndex={-1}
              style={{ pointerEvents: "none" }}
            />
          ) : null}
        </div>
      ))}

      <div className='Contact' ref={contactRef}>
        <img className='Snapshot' src="/Multiprocess_And_Services_Alt.png"/>
        <div className='ContactContainer'>
          <div className='WhiteRectangle'>
            <p>{t("contact.heading")}</p>
          </div>
          <p className='ContactTag'>contact / inquiries</p>
          <p className='ContactDescription'>{t("contact.description")}</p>
          <div className='SubmissionAndLinks'>
            <div className='SubmissionBox'>
              <div className='ContactGrid'>
                <input placeholder={t("contact.placeholders.firstName")} onChange={(e) => setFirstName(e.target.value)} />
                <input placeholder={t("contact.placeholders.lastName")} onChange={(e) => setLastName(e.target.value)} />
                <input placeholder={t("contact.placeholders.email")} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder={t("contact.placeholders.phone")} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <textarea placeholder={t("contact.placeholders.message")} onChange={(e) => setMessage(e.target.value)}/>
              <button className='SubmitButton' onClick={submitContact}>{t("contact.submit")}</button>
            </div>
            {messageSent ? <p className='ContactMessage'>{messageSent}</p> : null}
            <div className='Links'>
              <a  className='Link' target="_blank" href="https://www.instagram.com/jdmultiprocess/"><img src="/Instagram.png" /></a>
              <a  className='Link' href="tel:+16098497685"><img src="/Phone.png" /></a>
            </div>
          </div>
        </div>
      </div>
      <Navbar serviceRefs={serviceRefs} scrollToHome={scrollToHome} scrollToAbout={scrollToAbout} scrollToContact={scrollToContact}/>
    </>
  )
}

export default App
