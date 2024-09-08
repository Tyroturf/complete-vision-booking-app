import Detail from "./Detail";
import { fetchPlace } from "../api";

const PlaceDetail = () => <Detail fetchDetail={fetchPlace} type="listings" />;

export default PlaceDetail;
