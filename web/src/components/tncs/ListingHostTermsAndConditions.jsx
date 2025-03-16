import React from "react";

const ListingHostTermsAndConditions = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Listing Agreement for Hotels, Resorts & Apartments
      </h2>
      <div className="text-gray-700 text-sm space-y-4">
        <p>
          This Agreement (“Agreement”) is entered into as of the date of
          acceptance by the undersigned (the “Partner” or
          “Hotel/Resort/Apartment”) and the online booking platform (Complete
          Vision GH). This Agreement sets forth the terms and conditions under
          which the Hotel/Resort/Apartment agrees to list its services on the
          Platform for booking by users.
        </p>

        <h3 className="font-semibold">1. Services to be Provided</h3>
        <p>
          The Hotel/Resort/Apartment agrees to list its accommodation services,
          including but not limited to rooms, suites, villas, or other property
          types, on the Platform. The Hotel/Resort/Apartment will provide
          accurate descriptions, pricing, availability, and other necessary
          details for prospective customers, and keep such information
          up-to-date.
        </p>

        <h3 className="font-semibold">2. Pricing and Payment Terms</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            The Hotel/Resort/Apartment shall set its own pricing, subject to
            review by the Platform.
          </li>
          <li>
            Payment for bookings will be processed through the Platform, and the
            Platform will remit payments to the Hotel/Resort/Apartment on the
            next working day as agreed.
          </li>
          <li>
            The Hotel/Resort/Apartment agrees to honor all confirmed bookings at
            the prices listed on the Platform.
          </li>
        </ul>

        <h3 className="font-semibold">
          3. Booking Confirmation & Cancellation Policy
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Bookings receive instant confirmation and are considered binding.
          </li>
          <li>
            Guests may cancel their booking without penalty if done by 11:59 PM
            local time.
          </li>
          <li>
            Late cancellations may incur fees of up to 100% of the booking
            total.
          </li>
          <li>
            The Platform will assist in managing cancellations and ensure guests
            are aware of this policy.
          </li>
        </ul>

        <h3 className="font-semibold">4. Availability & Updates</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Hotel/Resort/Apartment must maintain real-time availability and
            update changes promptly.
          </li>
          <li>
            Immediate notification to the Platform is required for any
            circumstances affecting bookings.
          </li>
        </ul>

        <h3 className="font-semibold">5. Modifications and Future Changes</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Pricing, room types, and availability can be updated but must
            reflect in the system at least 24 hours in advance.
          </li>
          <li>
            Major operational changes must be communicated at least 30 days
            before taking effect.
          </li>
          <li>
            Hotel/Resort/Apartment must provide a 10% discount to aid platform
            promotion.
          </li>
        </ul>

        <h3 className="font-semibold">6. Obligations of the Platform</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            The Platform provides a user-friendly interface for managing
            bookings and cancellations.
          </li>
          <li>
            Customer support services will be available for booking-related
            issues.
          </li>
          <li>
            Marketing of Hotel/Resort/Apartment offerings will be conducted by
            the Platform.
          </li>
        </ul>

        <h3 className="font-semibold">7. Liability & Indemnification</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            The Hotel/Resort/Apartment is responsible for fulfilling
            accommodations and services as described.
          </li>
          <li>
            The Platform is not liable for service failures, dishonored
            bookings, or operational failures.
          </li>
        </ul>

        <h3 className="font-semibold">8. Termination</h3>
        <p>
          Either party may terminate this Agreement with 30 days’ written
          notice. All confirmed bookings made before termination must be
          honored.
        </p>

        <h3 className="font-semibold">9. Dispute Resolution</h3>
        <p>
          Disputes will first be addressed through mediation. If unsuccessful,
          arbitration will be conducted in the jurisdiction of the
          Hotel/Resort/Apartment.
        </p>

        <h3 className="font-semibold">10. Confidentiality</h3>
        <p>
          Both parties agree to maintain confidentiality regarding this
          Agreement and any exchanged confidential information.
        </p>

        <h3 className="font-semibold">11. Governing Law</h3>
        <p>
          This Agreement is governed by the laws of the jurisdiction in which
          the Hotel/Resort/Apartment is located.
        </p>

        <h3 className="font-semibold">12. Miscellaneous</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Force Majeure:</strong> Neither party shall be liable for
            failure to perform due to events beyond their control.
          </li>
          <li>
            <strong>Entire Agreement:</strong> This Agreement supersedes all
            prior negotiations and agreements.
          </li>
        </ul>
      </div>
    </>
  );
};

export default ListingHostTermsAndConditions;
