import { useState, useRef, useEffect } from 'react'
import './App.css'
import { newContact } from './middleware/contact'
import Navbar from './components/Navbar'

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState<null | string>(null);

  const [sectionStates, setSectionStates] = useState<Record<number, boolean>>({});

  const services = [
    {
      Service: "Impuestos",
      Copy: `¿Necesita ayuda con sus impuestos? Aquí estamos para ayudarle. JD Multiprocess & Services ofrece servicios de asistencia tributaria enfocados en la preparación y organización de documentos.<br></br>
      Ayudamos a los clientes a presentar la información fiscal requerida de manera precisa y a tiempo.<br></br>
      Nuestro enfoque está diseñado para reducir el estrés durante la temporada de impuestos.<br></br>`,
      Img: "/Tax.png"
    },
    {
      Service: "Notarizaciones",
      Copy: `Ofrecemos servicios profesionales de notarización a distancia en el estado de Nueva Jersey, garantizando que los documentos se firmen correctamente y cumplan con los requisitos estatales.<br></br>
      Asistemos a los clientes con el proceso de apostilla, ayudando a preparar documentos para uso internacional.<br></br>
      ofrecemos servicios de firma de préstamos para apoyar la correcta ejecución de documentos financieros.<br></br>
      Podemos ayudar a legalizar los formularios de divorcio ante notario y presentarlos, pero no se proporcionará asistencia legal.`,
      Img: "/General_Notorizations.png"
    },
    {
      Service: "Servicios de Bodas",
      Copy: `Ofrecemos servicios de apoyo documental relacionados con asuntos de matrimonio.<br></br>
      Esto incluye asistencia en la preparación de documentos y notarización cuando sea necesario.<br></br>
      Todos los servicios se manejan con profesionalismo, discreción y respeto por la privacidad.<br></br>`,
      Img: "/Wedding_Divorce.png",
      Video: "/Wedding_Video.mp4"
    },
    {
      Service: "Formación de Negocios y Contabilidad",
      Copy: `Brindamos apoyo en la formación de negocios para ayudar a los clientes a establecer sus empresas de manera adecuada.<br></br>
      También ofrece servicios básicos de contabilidad para ayudar con la organización y el mantenimiento de registros.<br></br>
      Estos servicios permiten a los dueños de negocios enfocarse en sus operaciones mientras se mantienen organizados.<br></br>`,
      Img: "/Business.png"
    },
    {
      Service: "Proceso de Licencias de Nueva Jersey",
      Copy: `Asistemos a los clientes con diversos procesos de licencias en Nueva Jersey, ayudando a organizar la documentación requerida.<br></br>
      Proporciona orientación para que los clientes comprendan mejor cada etapa del proceso.<br></br>
      Este servicio está diseñado para reducir la confusión y mejorar la eficiencia general.<br></br>`,
      Img: "/NJ_License.png"
    },
    {
      Service: "Traducciones (Español ↔ Inglés)",
      Copy: `Ofrecemos servicios de traducción de documentos entre español e inglés.<br></br>
      Estos servicios respaldan necesidades personales, comerciales y administrativas.<br></br>
      La asistencia en traducción ayuda a garantizar que los documentos se comprendan claramente en ambos idiomas.<br></br>`,
      Img: "/Translations.png"
    },
    {
      Service: "Permisos de Viaje para Menores",
      Copy: `Asistemos en la preparación y notarización de documentos de consentimiento de viaje para menores.<br></br>
      Este servicio ayuda a garantizar que la autorización adecuada esté documentada cuando los menores viajan.<br></br>
      Los padres y tutores obtienen mayor tranquilidad mediante una documentación precisa.<br></br>`,
      Img: "/Travel.png"
    }
  ];

  useEffect(() => {
    const els = serviceRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setSectionStates((prev) => {
          const next = { ...prev };

          for (const entry of entries) {
            const indexAttr = (entry.target as HTMLElement).dataset.index;
            if (!indexAttr) continue;

            const idx = Number(indexAttr);
            next[idx] = entry.isIntersecting;
          }

          return next;
        });
      },
      {
        threshold: 0.25, // 25% visible triggers fade-in
        root: null,
        rootMargin: "0px 0px -10% 0px", // fade slightly before fully centered
      }
    );

    els.forEach((el) => observer.observe(el));

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
              Servicios generales para sus necesidades personales y comerciales.
            </p>
          </div>
          <div className='Details'>
            <p>
              Ya sea que necesite asistencia fiscal, servicios de notary general, servicios para bodas, apostilla, traducción o ayuda con documentación empresarial, JD Multiprocess and Services LLC está aquí para ayudarle.
              Ofrecemos nuestros servicios de notary móvil y administrativos confiables en Trenton y sus alrededores en Nueva Jersey, diseñados para que el proceso sea conveniente, preciso y sin estrés.
              Con experiencia en necesidades personales y empresariales, garantizamos que cada documento se maneje con cuidado y profesionalismo.
            </p>
          </div>
          <button className='ContactUs' onClick={() => {scrollToContact()}}>
            Contacto
          </button>
          </div>
        </div>
        <div className='Services'>
          <div className='Service' onClick={() => {scrollToService(0)}}>
            <div className='ServiceIcon'>
              <img src='/Tax.png'/>
            </div>
            <p className='ServiceName'>Impuestos</p>
          </div>
          <div className='Service' onClick={() => {scrollToService(1)}}>
            <div className='ServiceIcon'>
              <img src='/General_Notorizations.png'/>
            </div>
            <p className='ServiceName'>Notarizaciones</p>
          </div>
          <div className='Service' onClick={() => {scrollToService(2)}}>
            <div className='ServiceIcon'>
              <img src='/Wedding_Divorce.png'/>
            </div>
            <p className='ServiceName'>Servicios de Bodas</p>
          </div>
          <div className='Service' onClick={() => {scrollToService(3)}}>
            <div className='ServiceIcon'>
              <img src='/Business.png'/>
            </div>
            <p className='ServiceName'>Formación de Negocios</p>
          </div>
          <div className='Service' onClick={() => {scrollToService(4)}}>
            <div className='ServiceIcon'>
              <img src='/NJ_License.png'/>
            </div>
            <p className='ServiceName'>Licencia de NJ</p>
          </div>
          <div className='Service' onClick={() => {scrollToService(5)}}>
            <div className='ServiceIcon'>
              <img src='/Translations.png'/>
            </div>
            <p className='ServiceName'>Traducciones</p>
          </div>
          <div className='Service' onClick={() => {scrollToService(6)}}>
            <div className='ServiceIcon'>
              <img src='/Travel.png'/>
            </div>
            <p className='ServiceName'>Permisos de Viaje</p>
          </div>
        </div>
      </div>
      <div className='About' ref={aboutRef}>
        <div className="AboutImage">
          <img src="/About_Image.png" alt="About Image" />
        </div>
        <div className='AboutContent'>
          <div className='AboutHeading'>
             JD Multiprocess & Services, Juliana De La Rosa<br></br> CEO
          </div>
          <div className='AboutCopy'>
            Juliana De La Rosa es una notary con sede en Nueva Jersey que ofrece servicios de notarización confiables y profesionales, junto con una variedad de servicios administrativos y de apoyo generales para particulares y empresas.<br></br> 
            <br></br>Como notary autorizada en el estado de Nueva Jersey, se compromete con la precisión, la confidencialidad y la eficiencia, brindando a sus clientes una solución integral y conveniente para diversas necesidades de servicio, manteniendo siempre un fuerte enfoque en el profesionalismo y la atención al cliente.<br></br> 
            <br></br>Si tienes alguna pregunta, no dudes en ponerte en contacto con JD Multiprocess & Services.
          </div>
        </div>
      </div>

      <div className='Mission'>
        <div className='MissionContent'>
          <div className='MissionHeading'>
            Nuestra misión
          </div>
          <div className='MissionCopy'>
            Somos una empresa dedicada a brindar diversos servicios, como servicios de notary a distancia en línea, preparación de declaraciones de impuestos, solicitud de números ITIN, apostillas, traducciones y redacción de cartas, contratos, solicitudes y formularios, legalización de documentos de divorcio, servicios de oficiante de bodas, impresión y fotocopiado, y muchos otros servicios.<br></br><br></br>
            ¿Por qué elegirnos? Porque trabajamos cuando los demás están cerrados, así que contáctenos y le ayudaremos.
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
            <h1 className="ServiceHeading">{service.Service}</h1>
            <div className="ServiceCopy" dangerouslySetInnerHTML={{ __html: service.Copy }}></div>
          </div>

          {index !== 2 ? (
            <div className='ServiceImage'>
              <img src={service.Img} />
            </div>
          ) : null}

          {index === 2 ? (
            <video 
              src="/Wedding_Video.mp4"
              className='ServiceVideo'
              autoPlay
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
            <p>Contacto!</p>
          </div>
          <p className='ContactTag'>contact / inquiries</p>
          <p className='ContactDescription'>Got questions, inquiries, or want information about services? Send me a message below!</p>
          <div className='SubmissionAndLinks'>
            <div className='SubmissionBox'>
              <div className='ContactGrid'>
                <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
              </div>
              <textarea placeholder="Enter Your Message Here" onChange={(e) => setMessage(e.target.value)}/>
              <button className='SubmitButton' onClick={submitContact}>Submit</button>
            </div>
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
