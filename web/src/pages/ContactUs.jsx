import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800 mt-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Contact Us – Complete Vision GH
      </h1>
      <p className="mb-6 text-xs md:text-sm">
        We’re here to help – anytime, anywhere.
      </p>

      <p className="mb-4 text-xs md:text-sm">
        Whether you’re booking a hotel, renting a car, or planning a tour, our
        support team is available 24/7 to assist you.
      </p>

      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Help With an Existing Booking
        </h2>
        <p className="text-xs md:text-sm mb-2">
          Need help with a reservation? You can view, change, or cancel your
          bookings by logging into your account:
        </p>
        <a
          href="/bookings"
          className="text-blue-600 hover:underline text-xs md:text-sm"
        >
          Go to My Bookings
        </a>
        <p className="text-xs md:text-sm mt-2">
          Still need assistance? Contact us using the details below.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Customer Service – 24/7 Support
        </h2>
        <p className="text-xs md:text-sm mb-1">
          Phone / WhatsApp: +233 200168869 / +233 548860181
        </p>
        <p className="text-xs md:text-sm mb-1">
          Email:{" "}
          <a href="mailto:info@completevisiongh.com" className="text-blue-600">
            info@completevisiongh.com
          </a>
        </p>
        <p className="text-xs md:text-sm">
          We’ll respond as quickly as possible, usually within a few hours.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Are You a Travel Partner?
        </h2>
        <p className="text-xs md:text-sm mb-2">
          If you’re a hotel, car rental agency, or tour operator and would like
          to partner with us:
        </p>
        <p className="text-xs md:text-sm mb-1">
          Email:{" "}
          <a href="mailto:info@completevisiongh.com" className="text-blue-600">
            info@completevisiongh.com
          </a>
        </p>
        <p className="text-xs md:text-sm mb-1">
          Phone: +233 200168869 / +233 548860181
        </p>
        <p className="text-xs md:text-sm">
          Join Complete Vision GH and grow your business with us.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Corporate Office
        </h2>
        <p className="text-xs md:text-sm">Complete Vision GH</p>
        <p className="text-xs md:text-sm">Bortianor Hills, Accra, Ghana</p>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Follow Us</h2>
        <ul className="list-disc list-inside text-xs md:text-sm space-y-1">
          <li>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/complete.vision?igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Complete Vision Gh
            </a>
          </li>
          <li>TikTok: Complete Vision Gh</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
