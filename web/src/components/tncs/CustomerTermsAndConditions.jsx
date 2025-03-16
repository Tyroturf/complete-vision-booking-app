import React from "react";

const CustomerTermsAndConditions = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Terms & Conditions for Bookings
      </h2>
      <div className="text-gray-700 text-sm space-y-4">
        <p className="text-gray-600">
          Welcome to <strong>Complete Vision GH</strong>, an online booking
          platform connecting travelers with hotels, apartments, resorts, car
          rentals, and travel & tour experiences. By using our platform, you
          agree to the following Terms and Conditions.
        </p>

        <div className="border-t border-gray-300"></div>

        <h3 className="font-semibold">1. Acceptance of Terms</h3>
        <p>
          By proceeding with a booking through Complete Vision GH, you
          acknowledge that you have read, understood, and agreed to these Terms
          and Conditions. If you do not agree, please refrain from using our
          services.
        </p>

        <h3 className="font-semibold">2. Service Fee & Payment Terms</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            A 5% service fee is charged on the total booking amount for all
            services.
          </li>
          <li>
            This fee is non-refundable and is included in the final price at
            checkout.
          </li>
          <li>
            Payments must be completed through our platform to confirm any
            booking.
          </li>
          <li>
            The final displayed price includes the service fee and applicable
            taxes unless otherwise stated.
          </li>
        </ul>

        <h3 className="font-semibold">3. Cancellation & Refund Policy</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Cancellations before 11:59 PM (local time) the day before the
            scheduled service may be refunded (excluding the service fee).
          </li>
          <li>
            Late cancellations may result in partial or full forfeiture, as
            determined by the service provider.
          </li>
          <li>No-shows are not eligible for refunds.</li>
          <li>Refunds, if applicable, follow the service provider's policy.</li>
        </ul>

        <h3 className="font-semibold">4. Specific Terms for Services</h3>
        <h4 className="font-semibold">A. Hotels, Resorts & Apartments</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Guests must follow check-in and check-out policies.</li>
          <li>
            Additional services (meals, parking, etc.) must be paid directly to
            the provider.
          </li>
          <li>
            Complete Vision GH is not responsible for service quality or
            fulfillment.
          </li>
        </ul>

        <h4 className="font-semibold">B. Car Rentals</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Valid driver’s license and required documents must be provided.
          </li>
          <li>Late returns may incur additional charges.</li>
          <li>
            The renter is responsible for damages, traffic violations, or fines.
          </li>
          <li>Vehicles must be used responsibly per local driving laws.</li>
        </ul>

        <h4 className="font-semibold">C. Travel & Tours</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Accurate personal and booking details must be provided.</li>
          <li>
            Modifications must be made at least 24 hours before the scheduled
            service and are subject to approval.
          </li>
          <li>
            The tour provider is responsible for delivering the service as
            advertised.
          </li>
        </ul>

        <h3 className="font-semibold">5. Liability Disclaimer</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Complete Vision GH acts as an intermediary and is not responsible
            for service failures or disputes.
          </li>
          <li>
            We are not liable for accidents, losses, delays, or disruptions
            during service use.
          </li>
          <li>
            Customers accept all risks associated with travel, lodging, or
            vehicle rentals.
          </li>
        </ul>

        <h3 className="font-semibold">6. Modification of Terms</h3>
        <p>
          Complete Vision GH reserves the right to update these Terms and
          Conditions. Continued use of the platform after changes are made
          constitutes acceptance of the revised terms.
        </p>

        <p className="text-center text-sm text-gray-600 mt-4">
          For any questions or concerns, please contact our support team.
        </p>
      </div>
    </>
  );
};

export default CustomerTermsAndConditions;
