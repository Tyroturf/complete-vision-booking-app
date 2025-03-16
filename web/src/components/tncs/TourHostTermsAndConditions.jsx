const TourHostTermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Partnership Agreement
      </h1>

      <p className="text-gray-600 mb-4">
        This Partnership Agreement (“Agreement”) is made and entered into as of{" "}
        <span className="font-semibold">[Date]</span>, by and between:
      </p>

      <p className="text-gray-600 mb-2">
        <strong>Complete Vision GH</strong>, a company registered under the laws
        of Ghana, with its principal office at Bortianor Hills (hereinafter
        referred to as the <span className="font-semibold">“Platform”</span>),
        and
      </p>

      <p className="text-gray-600 mb-6">
        <strong>[Travel & Tour Company Name]</strong>, a company registered
        under the laws of [Country], with its principal office at [Company
        Address] (hereinafter referred to as the{" "}
        <span className="font-semibold">“Partner”</span>).
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        1. Purpose of the Agreement
      </h2>
      <p className="text-gray-600">
        This Agreement establishes a partnership between the Platform and the
        Partner to provide seamless online booking services for accommodations
        and tourism experiences. The Platform will list and promote the
        Partner’s services, while the Partner will offer a{" "}
        <span className="font-semibold">10% discount</span> on all bookings made
        through the Platform.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        2. Responsibilities of the Platform
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>List and promote the Partner’s travel and tour services.</li>
        <li>Provide a user-friendly booking and management system.</li>
        <li>
          Market and advertise the Partner’s services to a broad audience.
        </li>
        <li>Ensure a secure and reliable booking process.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        3. Responsibilities of the Partner
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          Offer a <span className="font-semibold">10% discount</span> on all
          bookings.
        </li>
        <li>Provide accurate and up-to-date information.</li>
        <li>Ensure high-quality service for customers.</li>
        <li>Manage all operational aspects of booked tours.</li>
        <li>Communicate promptly regarding any service changes.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        4. Pricing & Discount Terms
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          The Partner agrees to apply a{" "}
          <span className="font-semibold">10% discount</span> on all bookings.
        </li>
        <li>The discount will be reflected in the final customer price.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        5. Cancellation Policy
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          Customers can cancel up to{" "}
          <span className="font-semibold">11:59 PM</span> the day before without
          penalty.
        </li>
        <li>Late cancellations may be subject to standard terms.</li>
        <li>
          The Partner must update the Platform on cancellation policy changes.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        6. Term & Termination
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          The Agreement remains valid until terminated with a{" "}
          <span className="font-semibold">30-day notice</span>.
        </li>
        <li>Immediate termination applies in case of material breach.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        7. General Terms
      </h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Both parties agree to maintain professional service standards.</li>
        <li>
          Disputes will be resolved through{" "}
          <span className="font-semibold">good-faith negotiations</span>.
        </li>
        <li>This Agreement supersedes any prior arrangements.</li>
      </ul>
    </div>
  );
};

export default TourHostTermsAndConditions;
