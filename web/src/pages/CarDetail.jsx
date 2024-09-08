import Detail from "./Detail";
import { fetchCar } from "../api";

const CarDetail = () => <Detail fetchDetail={fetchCar} type="car_rentals" />;

export default CarDetail;
