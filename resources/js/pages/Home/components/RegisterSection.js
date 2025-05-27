import React from "react";
import { NavLink } from "react-router-dom";

export default function RegisterSection() {
    return (
        <>
            <div className="beneficios-cuestionario">
                <div className="right-content">
                    <img
                        src="assets/images/2024/GLOBO_EXPO.png"
                        alt="Cuestionario de registro"
                    />
                    <div>
                        <h3>Cuestionario de registro</h3>
                        <span className="form-image">
                            {/* <RegisterForm /> */}

                            <img
                                src="assets/images/form-image.png"
                                alt="Registrate"
                            />
                        </span>
                        <NavLink
                            to="/registro-foro-emprendedores"//Puede ser foro o expo
                            title="Registro Foro Emprendedores"
                        >
                            Regístrate
                        </NavLink>
                        <div id="time-counter"></div>
                    </div>
                </div>
                <div className="left-content">
                    <div>
                        <h3>¿Qué es Expo Emprendedor?</h3>
                        <p>
                            Es un evento diseñado específicamente para
                            proporcionar un espacio donde emprendedores,
                            startups, inversores, profesionales y entidades
                            relacionadas con el emprendimiento puedan reunirse,
                            interactuar y colaborar. Donde habrá ponencias,
                            talleres, paneles de discusión, networking así como
                            la oportunidad de exhibir tus productos y servicios.
                        </p>
                        <p>
                            En una Expo Emprendedores, los emprendedores tienen
                            la oportunidad de mostrar sus proyectos y empresas,
                            compartir sus ideas con una audiencia más amplia,
                            recibir retroalimentación, establecer contactos con
                            posibles socios comerciales e inversores, y aprender
                            de otros emprendedores y expertos en la industria.
                        </p>
                        <p>
                            Buscamos que Expo Emprendedores sea al igual que
                            años anteriores una excelente fuente de inspiración,
                            aprendizaje y oportunidades de networking, donde
                            puedan descubrir nuevas empresas y productos
                            innovadores, obtener información sobre las últimas
                            tendencias en el mundo del emprendimiento y
                            encontrar recursos útiles para apoyar sus propios
                            proyectos empresariales.
                        </p>
                        <p>
                            Expo Emprendedores es una plataforma importante
                            donde buscamos fomentar la colaboración, la
                            innovación y el crecimiento dentro del ecosistema
                            emprendedor, brindando oportunidades tanto para los
                            emprendedores como para aquellos interesados en el
                            mundo empresarial.
                        </p>
                    </div>
                </div>
            </div>
            <div className="how-participate">
                <h3>
                    ¿Cómo puedo participar en las conferencias y capacitaciones?
                </h3>
                <p>
                    Solamente tienes que registrarte y ya tienes apartado tu
                    lugar, recuerda llenar cada uno de los espacios solicitados
                    ya que eso nos ayuda a poder ubicar tu tipo de
                    emprendimiento
                </p>
                <NavLink
                    to="/registro-foro-emprendedores"//Puede ser foro o expo
                    title="Registro Foro Emprendedores"
                >
                    Regístrate
                </NavLink>
            </div>
            <div className="benefits">
                <div className="section-header">
                    <img
                        alt="Beneficios"
                        src="assets/images/2024/BENEFICIOS.png"
                    />
                </div>
                <p>
                    Participar en Expo Emprendedor puede ofrecerte una serie de
                    beneficios significativos, tanto para crecimiento personal
                    como para el desarrollo de tu negocio. Aquí tienes algunos
                    de los beneficios más destacados:
                </p>
                <h4>Adquisición de conocimientos:</h4>
                <p>
                    Las capacitaciones y conferencias proporcionan acceso a
                    información actualizada y conocimientos relevantes en áreas
                    clave para el emprendimiento, como estrategia empresarial,
                    marketing, finanzas, gestión de proyectos, liderazgo, entre
                    otros. Esto te permite estar al tanto de las últimas
                    tendencias y mejores prácticas en el mundo empresarial.
                </p>
                <h4>Desarrollo de habilidades:</h4>
                <p>
                    Estos eventos ofrecen la oportunidad de desarrollar y
                    mejorar tus habilidades empresariales, como la comunicación
                    efectiva, la negociación, la resolución de problemas, la
                    toma de decisiones, el trabajo en equipo y el pensamiento
                    estratégico. Esto te ayuda a ser un emprendedor más
                    competente y eficaz.
                </p>
                <h4>Inspiración y motivación:</h4>
                <p>
                    Escuchar las experiencias y los éxitos de otros
                    emprendedores exitosos puede inspirarte y motivarte a
                    perseguir tus propias metas empresariales. Las conferencias
                    suelen contar con ponentes que comparten historias
                    inspiradoras y consejos prácticos que pueden impulsar tu
                    espíritu emprendedor.
                </p>
                <h4>Visibilidad y exposición:</h4>
                <p>
                    Participar en Expo Emprendedor tercera edición te brinda la
                    oportunidad de poner tu negocio frente a una amplia
                    audiencia de clientes potenciales, inversores, medios de
                    comunicación y otros emprendedores. Esto puede aumentar la
                    visibilidad de tu marca y ayudarte a llegar a nuevos
                    clientes.
                </p>
                <h4>Networking:</h4>
                <p>
                    Las exposiciones son excelentes lugares para establecer
                    contactos y crear relaciones comerciales. Puedes conectarte
                    con otros emprendedores, posibles socios comerciales,
                    proveedores y clientes potenciales. Estas conexiones pueden
                    ser valiosas para el crecimiento futuro de tu negocio.
                </p>
                <h4>Retroalimentación instantánea:</h4>
                <p>
                    Interactuar directamente con los ponentes, panelistas y
                    asistentes a la expo te brinda la oportunidad de obtener
                    retroalimentación inmediata sobre tu producto o servicio
                    Esto puede ayudarte a identificar áreas de mejora y hacer
                    ajustes en tu estrategia comercial.
                </p>
                <h4>Oportunidades de ventas:</h4>
                <p>
                    Las exposiciones son entornos propicios para generar ventas
                    directas. Los asistentes a menudo están interesados en
                    descubrir nuevos productos y servicios, lo que puede
                    traducirse en ventas en el lugar o en el futuro cercano.
                </p>
                <h4>Aprendizaje:</h4>
                <p>
                    Participar en una expo te expone a una variedad de ideas,
                    tendencias y prácticas comerciales innovadoras. Puedes
                    asistir a conferencias, talleres y paneles de discusión que
                    te ayuden a expandir tus conocimientos y habilidades como
                    emprendedor.
                </p>
                <h4>Validación del mercado:</h4>
                <p>
                    La respuesta de los asistentes a tu stand puede servir como
                    una forma de validar tu idea de negocio y tu producto o
                    servicio. Si recibes una respuesta positiva, esto puede
                    confirmar que estás en el camino correcto.
                </p>
                <h4>Promoción de la marca :</h4>
                <p>
                    Una exposición te brinda la oportunidad de promocionar tu
                    marca de manera efectiva a través de materiales
                    promocionales, demostraciones en vivo y actividades
                    interactivas. Esto puede ayudarte a crear conciencia de
                    marca y a diferenciarte de la competencia.
                </p>
                <p>
                    En resumen, participar en una expo para emprendedores puede
                    ser una excelente manera de impulsar tu negocio, establecer
                    contactos clave y aprender de otros profesionales del
                    sector.
                </p>
                <NavLink
                    to="/registro-foro-emprendedores"//Puede ser foro o expo
                    title="Registro Foro Emprendedores"
                >
                    Regístrate
                </NavLink>
            </div>
        </>
    );
}
