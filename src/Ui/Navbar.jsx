import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // show navbar
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        } else {
          // hide navbar
          gsap.to(navRef.current, {
            y: -80,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
          });
        }
      },
      { threshold: 0.1 },
    );

    const productsEl = document.querySelector(".productsScroll");
    if (productsEl) observer.observe(productsEl);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(`.${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav ref={navRef} className="navbar">
      {/* Logo */}
      <div className="navLogo">
        <span className="navLogoText">SMART AI</span>
        <span className="navLogoDot">.</span>
      </div>

      {/* Links */}
      <div className="navLinks">
        <button className="navLink" onClick={() => scrollToSection("home")}>
          Home
        </button>
        <button
          className="navLink"
          onClick={() => scrollToSection("productsScroll")}
        >
          Products
        </button>
        <button className="navLink" onClick={() => scrollToSection("home")}>
          About
        </button>
        <a href="mailto:your@email.com" className="navLink navLinkContact">
          Contact
        </a>
      </div>
    </nav>
  );
}
