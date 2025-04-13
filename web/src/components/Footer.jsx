import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
          <a href="#" className="text-xs text-white hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-white hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-xs text-white hover:underline">
            Contact Us
          </a>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com"
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
