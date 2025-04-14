import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-brand py-20 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center">
          <span className="lg:text-lg text-sm text-white font-bold tracking-tight">
            Complete Vision
          </span>
          <p className="text-xs text-white pt-3">
            © 2024 Complete Vision. All rights reserved.
          </p>
          <p className="text-xs text-white pt-3">
            Powered by{" "}
            <a
              href="https://www.johrit.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-semibold"
            >
              Johrit Technology
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Link
            to="/privacy-policy"
            className="text-xs text-white hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-xs text-white hover:underline"
          >
            Terms of Service
          </Link>
          <Link to="/contact-us" className="text-xs text-white hover:underline">
            Contact Us
          </Link>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com/complete.vision?igsh=MzRlODBiNWFlZA=="
            target="_blank"
            rel="noopener noreferrer"
            className="md:text-lg text-white text-sm hover:text-white"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="mailto:info@completevisiongh.com"
            className="md:text-lg text-white text-sm hover:text-white"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
