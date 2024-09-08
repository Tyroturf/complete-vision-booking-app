import Detail from "./Detail";
import { fetchTour } from "../api";

const TourDetail = () => <Detail fetchDetail={fetchTour} type="tours" />;

export default TourDetail;
