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
    <div className="bg-brand py-5 md:px-48">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <span className="lg:text-2xl text-lg text-white font-bold tracking-tight">
            Complete Vision
          </span>
          <p className="lg:text-md text-xs text-white pt-3">
            © 2024 Complete Vision. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-2">
          <a href="#" className="lg:text-sm text-xs text-white hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="lg:text-sm text-xs text-white hover:underline">
            Terms of Service
          </a>
          <a href="#" className="lg:text-sm text-xs text-white hover:underline">
            Contact Us
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="md:text-lg text-white text-sm hover:text-white"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="md:text-lg text-white text-sm hover:text-white"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="md:text-lg text-white text-sm hover:text-white"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="md:text-lg text-white text-sm hover:text-white"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="mailto:support@completevision.com"
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
