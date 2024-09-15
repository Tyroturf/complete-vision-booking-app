const TripSummary = ({
  checkIn,
  checkOut,
  totalListingPrice,
  totalTourPrice,
  totalVehiclePrice,
  subTotal,
}) => (
  <div>
    <h3>Trip Summary</h3>
    <p>Check-in: {checkIn}</p>
    <p>Check-out: {checkOut}</p>
    <p>Listing Price: ${totalListingPrice}</p>
    <p>Tour Price: ${totalTourPrice}</p>
    <p>Vehicle Price: ${totalVehiclePrice}</p>
    <h4>Subtotal: ${subTotal}</h4>
  </div>
);

export default TripSummary;
