import React from "react";
import { useParams } from "react-router-dom";
import Reservation from "../pages/Reservation";

const ReservationWrapper = () => {
  const { type } = useParams();
  return <Reservation type={type} />;
};

export default ReservationWrapper;
