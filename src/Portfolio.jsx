import { useState, useEffect, useRef } from "react";
import { FaRegImage } from "react-icons/fa";
import { MdOutlineTrackChanges } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import "./App.css"; import { FaReact } from "react-icons/fa";

import { FiExternalLink } from "react-icons/fi";
import profile from './assets/2x2Pic.jpg';
import profileDark from './assets/2x2Pic.jpg';
import profileHover from './assets/2x2Pic-hover.jpg';
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { PiFlask } from "react-icons/pi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineVerified } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaSun, FaMoon } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub, FaMobileAlt, FaFacebookMessenger, FaInstagram } from "react-icons/fa";
import { GoPaperclip } from "react-icons/go";
import { MdPhoneInTalk } from "react-icons/md";
import ah1 from "./assets/gallery/ah1.jpg";
import ah2 from "./assets/gallery/ah2.jpg";
import ah3 from "./assets/gallery/ah3.jpg";
import ah4 from "./assets/gallery/ah4.jpg";
import ah5 from "./assets/gallery/ah5.jpg";
import ah6 from "./assets/gallery/ah6.jpg";
import ah7 from "./assets/gallery/ah7.jpg";
import ah8 from "./assets/gallery/ah8.jpg";
import { FaLaptopCode } from "react-icons/fa";
import { PiHandWaving } from "react-icons/pi";
// import ChatbotPortfolio from "./ChatbotPortfolio";

export default function Portfolio() {
    const [darkMode, setDarkMode] = useState(false);
    const galleryRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);
    const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
    const [resumeOpen, setResumeOpen] = useState(false);
    const [currentText, setCurrentText] = useState("Web Developer");
    const jobTitles = [
        "Web Developer",
        "Software Developer",
        "Mobile Developer",

    ];

    const experiences = [
        {
            title: "BS Computer Science - 4th Year",
            company: "University of Caloocan City",
            year: "2026",
        },
        {
            title: "Personal Projects",
            company: "Portfolio.",
            year: "2026",
        },
        {
            title: "Academic Projects",
            company: "Web-Based System.",
            year: "2026",
        },

        {
            title: "IT Intern",
            company: "CHED - MIMAROPA",
            year: "2026",
        },
    
       
        {
            title: "Hello World!",
            company: "Started learning programming",
            year: "2022",
            withWave: true,
        },
    ];

    // Function to handle the typewriting loop
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prev) => {
                const currentIndex = jobTitles.indexOf(prev);
                const nextIndex = (currentIndex + 1) % jobTitles.length;
                return jobTitles[nextIndex];
            });
        }, 2000); // Switch every 4 seconds

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    const openModal = (img) => {
        setSelectedCert(img);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCert(null);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };


    useEffect(() => {
        const slider = galleryRef.current;
        if (!slider) return;

        let rafId;
        let lastTs = 0;
        let carry = 0;
        const pxPerSecond = 60;

        const autoScroll = (ts) => {
            if (!lastTs) lastTs = ts;
            const dt = (ts - lastTs) / 1000;
            lastTs = ts;

            if (!paused && slider.scrollWidth > slider.clientWidth) {
                carry += pxPerSecond * dt;
                const step = Math.floor(carry);

                if (step > 0) {
                   slider.scrollLeft+= step;
                    carry -= step;
                }

                if (slider.scrollLeft >= slider.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            }
            rafId = requestAnimationFrame(autoScroll);
        };

        rafId = requestAnimationFrame(autoScroll);

        return () => cancelAnimationFrame(rafId);
    }, [paused]);

    return (
        <div className={darkMode ? "container dark-mode" : "container"}>
            <section className="landing-hero" id="home">
                <div className="landing-content">
                    <h1 className="landing-title">I'm Dan Jullian Malicse</h1>
                    <p className="landing-subtitle">
                        Explore my work, experience, and projects.
                    </p>

                    <div className="landing-actions">
                        <a className="landing-url-link" href="#profile" onClick={() => scrollToSection("profile")}>www.web.app/porfolio</a>
                        <button className="btn btn-white" onClick={() => scrollToSection("contact")}>Contact</button>
                    </div>
                </div>

                <div className="landing-links" role="navigation" aria-label="Portfolio sections">
                    <button onClick={() => scrollToSection("about")}>About</button>
                    <button onClick={() => scrollToSection("experience")}>Experience</button>
                    <button onClick={() => scrollToSection("projects")}>Projects</button>
                    <button onClick={() => scrollToSection("gallery")}>Gallery</button>
                </div>

            </section>

            <header className="profile-header" id="profile">
                <button
                    className="theme-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    <div className={`toggle-circle ${darkMode ? "active" : ""}`}>
                        {darkMode ? <FaMoon className="theme-icon" /> : <FaSun className="theme-icon" />}
                    </div>
                </button>


                <img
                    src={isHovering ? profileHover : (darkMode ? profileDark : profile)}
                    alt="Profile"
                    className="profile-photo"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />
                <div className="profile-details">
                    <div className="name-badge">
                        <h1>Dan Jullian B. Malicse</h1>
                    </div>
                    <p className="location">
                        <CiLocationOn className="location-icon" />
                        NCR, Philippines
                    </p>


                    <div className="job-title">BSCS Student / Aspiring Front-End Developer</div>

                    <div className="action-buttons">
                        <div className="action-buttons">
                            {/*
                            <a
                                className="btn btn-black"
                                href={resumePDF}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Resume
                            </a>
                            */}


                        </div>


                        <a className="btn btn-white" href="mailto:malicsedanjullian@gmail.com">
                            <HiOutlineMail className="btn-icon" />
                            Send Email
                        </a>


                    </div>
                </div>

            </header>



            {/* MAIN CONTENT */}
            <div className="main-grid">
                {/* LEFT COLUMN */}
                <div className="left-column">
                    {/* ABOUT */}
                    <section className="card" id="about">
                        <h2 className="section-title">
                            <IoBriefcaseOutline className="section-icon" />
                            About
                        </h2>

                        <p className="text-content">
                            Fourth year Bachelor of Science in Computer Science student at the University of Caloocan City North Campus. Aspiring software developer passionate about building modern web applications and currently improving my front-end development skills with React.
                        </p>

                        <p className="text-content">
                            I have developed projects, personal websites, and web applications where I worked on frontend interface design. I have a strong interest in web design and am continuously learning and applying UI/UX principles to improve layout structure, navigation flow, usability, and overall user experience.
                        </p>

                        <p className="text-content">
                            I completed my Internship / On-the-Job Training at CHED, where I was involved in developing a system to support organizational processes. During my internship, I provided technical support by assisting with system-related concerns and ensuring smooth operation of ongoing tasks. I also helped in managing and organizing documents, supporting office workflows and maintaining accurate records.
                        </p>

                        <p className="text-content">
                            I am organized, detail-oriented, and focused on frontend development. I value clean and responsive UI design, clear layout structure, and user-friendly interfaces, and I continuously improve my skills by applying what I learn to real projects. I am motivated to contribute to teams that prioritize quality, usability, and well-designed web applications.
                        </p>


                    </section>
                </div>

                {/* RIGHT COLUMN */}
                <div className="right-column">
                    {/* EXPERIENCE */}
                    <section className="card" id="experience">
                        <h2 className="section-title section-animate">
                            <IoBriefcaseOutline className="section-icon" />
                            Experience
                        </h2>

                        <div className="experience-list">
                            {experiences.map((experience, idx) => (
                                <div className="exp-item" key={`${experience.title}-${experience.year}-${idx}`}>
                                    <div className={`exp-dot ${activeExperienceIndex === idx ? "active-dot" : ""}`}></div>
                                    <div className="exp-content">
                                        <h3
                                            className="exp-title"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => setActiveExperienceIndex(idx)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    setActiveExperienceIndex(idx);
                                                }
                                            }}
                                        >
                                            {experience.withWave ? (
                                                <>
                                                    {experience.title} <PiHandWaving className="wave-icon" />
                                                </>
                                            ) : (
                                                experience.title
                                            )}
                                        </h3>
                                        <p className="exp-company">{experience.company}</p>
                                    </div>
                                    <span className="exp-year">{experience.year}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div></div>

            {/* TECH STACK - FULL WIDTH */}
            <section className="card tech-stack-wide" id="skills">
                <div className="section-header">
                    <h2 className="section-title">
                        <PiFlask className="section-icon" />
                        Tech Stack
                    </h2>
                </div>

                <div className="tech-category">
                    <h3 className="category-title">Frontend Development</h3>
                    <div className="tag-group">
                        <span className="tag">HTML</span>
                        <span className="tag">CSS</span>
                        <span className="tag">JavaScript</span>
                        <span className="tag">Responsive Web Design</span>
                    </div>
                </div>

                <div className="tech-category">
                    <h3 className="category-title">Frameworks & Libraries</h3>
                    <div className="tag-group">
                        <span className="tag">React.js</span>
                        <span className="tag">Flutter</span>
                    </div>
                </div>

                <div className="tech-category">
                    <h3 className="category-title">Tools & Workflow</h3>
                    <div className="tag-group">
                        <span className="tag">Git & GitHub</span>
                        <span className="tag">Visual Studio Code</span>
                        <span className="tag">Figma</span>
                    </div>
                </div>

                <div className="tech-category">
                    <h3 className="category-title">Testing & QA</h3>
                    <div className="tag-group">
                        <span className="tag">Manual Software Testing</span>
                        <span className="tag">Functional Testing</span>
                        <span className="tag">Usability Testing</span>
                    </div>
                </div>
            </section>

            {/* NEW HORIZONTAL SECTION */}
            <div className="projects-cert-grid">

                {/* Projects */}
                <section className="card" id="projects">
                    <div className="section-header">
                        <h2 className="section-title"><MdOutlineDashboard className="section-icon" />Projects</h2>

                    </div>

                    <div className="project-list">

                        <div className="project-item">
                            <a
                                href="https://www.bangkalqrush.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                            >
                                <h3 className="project-title">VegoBolt</h3>
                                <p className="project-desc">An IoT-Assisted System for Converting Waste Cooking Oil into Energy</p>

                            </a>
                        </div>


                        <div className="project-item">
                           
                                <h3 className="project-title">FitScale</h3>
                                <p className="project-desc">A fitness tracker app that integrates with a smart mobile phone to track steps, body weight, diet, and workout progress. It offers progress tracking in a simple interface, helping users achieve their fitness goals.
                            </p>
            
                            
                        </div>

                        <div className="project-item">
                            
                                <h3 className="project-title">The Coffee Junkie</h3>
                                <p className="project-desc">
                                     Equipment Trading Sales Management System</p>
                                

                            
                        </div>
                        <div className="project-item">
                           
                                <h3 className="project-title">Home Energy Monitoring </h3>
                                <p className="project-desc"> Home Energy Monitoring and Control System using Egizdunio Arduino .</p>
                                

                        </div>


                    </div>


                </section>


                {/*Certifications */}
                <section className="card" id="certifications">
                    <div className="section-header">
                        <h2 className="section-title"><MdOutlineVerified className="section-icon" />Certifications</h2>

                    </div>

                    <div className="cert-list">

                        <div className="cert-item">
                            <h3 className="cert-title">Effortless Modern Web Deployment: Next.js on Vercel</h3>
                            <p className="cert-org">Webinar</p>
                        </div>

                        <div className="cert-item">
                            <a
                                href="https://freecodecamp.org/certification/klntaglr/front-end-development-libraries"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cert-link"
                            >
                                <h3 className="cert-title">Front End Development Libraries</h3>
                                <p className="cert-org">freeCodeCamp</p>
                            </a>
                        </div>

                        <div className="cert-item">
                            <a
                                href="https://freecodecamp.org/certification/klntaglr/responsive-web-design"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cert-link"
                            >
                                <h3 className="cert-title">Angular</h3>
                                <p className="cert-org">SoloLearn</p>
                            </a>
                        </div>

                        <div className="cert-item">
                            <a
                                href="https://www.freecodecamp.org/certification/klntaglr/javascript-v9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cert-link"
                            >
                                <h3 className="cert-title">JavaScript</h3>
                                <p className="cert-org">freeCodeCamp</p>
                            </a>
                        </div>


                    </div>
                </section>





            </div>
            <div className="connect-wrapper" id="contact">
                <section className="card connect-container">
                    <div className="connect-grid">


                        <div className="connect-group">
                            <h3 className="connect-title"><MdOutlineTrackChanges className="icon" /> Goals</h3>

                            <a className="connect-item" href="#" target="_blank">
                                Develop my skills in web development and UI/UX by building user-centered and well-structured web systems.
                            </a>

                            <a className="connect-item" href="#" target="_blank">
                                Gain hands-on experience in development and manual testing while contributing to reliable, real-world web projects.
                            </a>


                        </div>

                        {/* Social Links */}
                        <div className="connect-group">
                            <h3 className="connect-title">
                                <GoPaperclip className="icon" /> Social Links
                            </h3>

                            <a className="connect-item" href="https://www.linkedin.com/in/danjullian/" target="_blank" rel="noopener noreferrer">
                                <BsLinkedin className="connect-icon" /> LinkedIn
                            </a>

                            <a className="connect-item" href="https://github.com/Danjullian" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="connect-icon" /> GitHub
                            </a>

                            <a className="connect-item" href="https://www.instagram.com/dnjllnmlcs_/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="connect-icon" /> Instagram
                            </a>
                        </div>


                        {/* Speaking */}

                        <div className="connect-group contact-box">

                            {/* Title */}
                            <h3 className="connect-title">
                                <AiOutlineMessage className="icon" /> Contact
                            </h3>

                            {/* Card Body */}
                            <div className="contact-card">
                                <p className="connect-desc">
                                  Open to collaborations on web design and development projects.

                                </p>

                                <a className="connect-action">
                                    Get in touch →
                                </a>
                            </div>

                        </div>

                        {/* Contact */}
                        <div className="contact-layout">


                            <div className="contact-links">

                                <a className="contact-item" href="mailto:malicsedanjullian@gmail.com">
                                    <HiOutlineMail className="contact-icon" />
                                    <div className="contact-info">
                                        <span className="contact-title">Email</span>
                                        <span className="contact-sub">malicsedanjullian@gmail.com</span>
                                    </div>
                                    <span className="contact-arrow">›</span>
                                </a>

                                <a className="contact-item">
                                    <MdPhoneInTalk className="contact-icon" />
                                    <div className="contact-info">
                                        <span className="contact-title">Let’s Talk</span>
                                        <span className="contact-sub">09773972620</span>
                                    </div>
                                    <span className="contact-arrow">›</span>
                                </a>

                                <a className="contact-item" href="https://www.messenger.com/e2ee/t/8124705447641716">
                                    <FaFacebookMessenger className="contact-icon" />
                                    <div className="contact-info">
                                        <span className="contact-title">Messenger</span>
                                        <span className="contact-sub">Chat with me</span>
                                    </div>

                                    <span className="contact-arrow">›</span>
                                </a>

                            </div>

                        </div>



                    </div>
                </section>

            </div>

            <section className="card connect-container gallery-section" id="gallery">
                <h2 className="section-title"><FaRegImage className="icon" />Gallery</h2>

                <div className="gallery-scroll" ref={galleryRef}>
                    {[ah1, ah2, ah3, ah4, ah5, ah6, ah7, ah8, ah1, ah2, ah3, ah4, ah5, ah6, ah7, ah8].map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className="gallery-img"
                            alt="Gallery Image"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        />
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-line"></div>

                <p className="footer-text">
                    © {new Date().getFullYear()} Dan Jullian Malicse — All rights reserved.
                </p>
            </footer>
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content">
                        <img src={selectedCert} alt="Certificate" className="modal-img" />
                    </div>
                </div>
            )}
            {/* <ChatbotPortfolio /> */}

        </div>
    );
}