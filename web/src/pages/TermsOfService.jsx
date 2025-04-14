import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800 mt-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Terms of Service – Complete Vision GH
      </h1>
      <p className="mb-6 text-xs md:text-sm">Effective Date: [Insert Date]</p>

      <p className="mb-4 text-xs md:text-sm">
        Welcome to <strong>Complete Vision GH</strong>! These Terms of Service
        (“Terms”) govern your use of our website, mobile app, and services. By
        accessing or using Complete Vision GH, you agree to be bound by these
        Terms.
      </p>

      {sections.map(({ title, content }, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">{title}</h2>
          {typeof content === "string" ? (
            <p className="text-xs md:text-sm">{content}</p>
          ) : (
            <ul className="list-disc list-inside text-xs md:text-sm space-y-2">
              {content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

const sections = [
  {
    title: "1. Our Services",
    content: [
      "Hotel accommodations",
      "Car rental services",
      "Guided travel and tour experiences",
      "We act as an intermediary between you and service providers (hotels, car rentals, tour companies). We do not directly own or manage these services.",
    ],
  },
  {
    title: "2. Use of the Platform",
    content: [
      "Provide accurate and complete information when making a booking.",
      "Use our services for personal, non-commercial purposes only.",
      "Not misuse the platform for fraudulent or unlawful activities.",
      "We reserve the right to deny access if misuse is suspected.",
    ],
  },
  {
    title: "3. Booking Policies",
    content: [
      "Each service provider has its own policies regarding cancellations, modifications, payments, and no-show charges.",
      "Please review the booking terms carefully before confirming your reservation.",
    ],
  },
  {
    title: "4. Pricing and Payment",
    content: [
      "Prices shown on Complete Vision GH are provided by our partners and typically include applicable taxes and fees unless stated otherwise.",
      "Payments may be processed either by us or directly by the service provider.",
      "Secure third-party payment gateways are used for transactions.",
    ],
  },
  {
    title: "5. Cancellations and Refunds",
    content: [
      "Cancellation policies vary by service provider and are displayed during the booking process.",
      "Refunds follow the specific provider’s cancellation policy. Some services may be non-refundable.",
    ],
  },
  {
    title: "6. Liability Disclaimer",
    content: [
      "Complete Vision GH is not liable for service disruptions caused by providers.",
      "We are not responsible for damages or losses from the use of third-party services.",
      "We strive for accurate information but cannot guarantee completeness or availability at all times.",
    ],
  },
  {
    title: "7. Privacy and Data Protection",
    content:
      "We value your privacy. Please review our Privacy Policy to understand how your data is collected, used, and protected.",
  },
  {
    title: "8. Changes to These Terms",
    content:
      "We may update these Terms occasionally. Significant changes will be communicated via email or on our platform. Continued use after changes means you accept the new Terms.",
  },
];

export default TermsOfService;
