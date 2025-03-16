const CarHostTermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        Car Rental Partnership Agreement
      </h1>
      <p className="text-gray-700 mb-4">
        This Car Rental Partnership Agreement (“Agreement”) is made and entered
        into as of [Date], by and between:
      </p>
      <p className="font-semibold">
        Complete Vision GH, a company registered under the laws of Ghana, with
        its principal office at Bortianor Hills (hereinafter referred to as the
        “Platform”), and
      </p>
      <p className="font-semibold mb-6">
        [Car Rental Company Name], a company registered under the laws of
        [Country], with its principal office at [Company Address] (hereinafter
        referred to as the “Partner”).
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Purpose of Agreement</h2>
      <p className="text-gray-700">
        This Agreement establishes a partnership enabling customers to book car
        rental services through the Platform. The Platform will list and promote
        the Partner’s rental services, while the Partner will fulfill bookings
        in accordance with the agreed terms.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        2. Responsibilities of the Platform
      </h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          List and promote the Partner’s car rental services on its platform.
        </li>
        <li>Provide a user-friendly system for managing reservations.</li>
        <li>
          Market and advertise the Partner’s services to a broad audience.
        </li>
        <li>Ensure a secure and reliable booking process.</li>
        <li>Facilitate the transfer of customer booking details promptly.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">
        3. Responsibilities of the Partner
      </h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          Provide accurate information about vehicles, pricing, and terms.
        </li>
        <li>Ensure rental vehicles meet local safety regulations.</li>
        <li>Honor all confirmed bookings made through the Platform.</li>
        <li>Manage vehicle pick-up and drop-off as per booking details.</li>
        <li>Handle customer service and complaints efficiently.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">4. Cancellation Policy</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          Customers can cancel bookings until 11:59 PM (local time) before
          pick-up without penalty.
        </li>
        <li>Refunds will exclude any non-refundable service fees.</li>
        <li>
          Late cancellations may be subject to penalties per the Partner’s
          policy.
        </li>
        <li>No-shows will not be eligible for refunds.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">5. Payment Terms</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          Payments are made through the Platform, which transfers funds (minus
          service fees) to the Partner.
        </li>
        <li>The Platform retains a 10% discount on all bookings.</li>
        <li>Payments to the Partner are processed the next business day.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">6. Term & Termination</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          This Agreement remains in effect until terminated by either party with
          30 days’ written notice.
        </li>
        <li>Immediate termination is allowed in case of material breach.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">7. Liability & Indemnity</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>
          The Platform acts as a booking intermediary and is not liable for
          vehicle availability, quality, or disputes.
        </li>
        <li>
          The Partner indemnifies the Platform against claims arising from its
          services.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">8. General Terms</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Both parties agree to maintain high customer service standards.</li>
        <li>Disputes will be resolved through good-faith negotiations.</li>
        <li>This Agreement supersedes any prior agreements.</li>
      </ul>
    </div>
  );
};

export default CarHostTermsAndConditions;
