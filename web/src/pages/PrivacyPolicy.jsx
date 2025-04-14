import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800 mt-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Privacy Policy – Complete Vision GH
      </h1>
      <p className="mb-6 text-xs md:text-sm">Effective Date: [Insert Date]</p>

      <p className="mb-4 text-xs md:text-sm">
        At <strong>Complete Vision GH</strong>, your privacy matters. This
        Privacy Policy explains how we collect, use, share, and protect your
        personal information when you use our website, mobile app, and services.
      </p>
      <p className="mb-6 text-xs md:text-sm">
        By using our services, you agree to the terms of this Privacy Policy.
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
    title: "1. What Information We Collect",
    content: [
      "Contact information: Name, email address, phone number",
      "Booking details: Hotel, car rental, or tour information, travel dates, preferences",
      "Payment information: Credit/debit card or mobile money details (processed securely)",
      "Account info: Login credentials, saved bookings, settings",
      "Device data: IP address, browser type, operating system, app usage data",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "Process and manage bookings",
      "Communicate with you (confirmations, updates, support)",
      "Improve our website, app, and services",
      "Provide customer support",
      "Send offers, promotions, or travel tips (only with your consent)",
      "Legal and security purposes",
    ],
  },
  {
    title: "3. Sharing Your Information",
    content: [
      "Service providers: Hotels, car rental companies, and tour operators",
      "Payment processors: For secure transaction handling",
      "Third-party tools: Analytics, email, and customer support under strict agreements",
      "Legal authorities: If required by law or for fraud prevention",
      "We never sell your personal information.",
    ],
  },
  {
    title: "4. Cookies and Tracking Technologies",
    content: [
      "Enhance user experience",
      "Analyze website traffic",
      "Save your preferences",
      "Deliver personalized content and offers",
      "You can control cookie settings via your browser or device.",
    ],
  },
  {
    title: "5. Your Rights and Choices",
    content: [
      "Access and update your personal data",
      "Request deletion of your account and data",
      "Withdraw consent for marketing",
      "File a complaint with a data protection authority",
      "Contact us at info@completevisiongh.com to exercise these rights.",
    ],
  },
  {
    title: "6. Data Security",
    content:
      "We use strong security measures to protect your data from unauthorized access, loss, or misuse. Payment details are encrypted and processed securely.",
  },
  {
    title: "7. Children’s Privacy",
    content:
      "Our services are not intended for children under 16. We do not knowingly collect data from them.",
  },
  {
    title: "8. Changes to This Policy",
    content:
      "We may update this policy occasionally. Significant changes will be communicated via our platform or email. Please review this page periodically.",
  },
];

export default PrivacyPolicy;
