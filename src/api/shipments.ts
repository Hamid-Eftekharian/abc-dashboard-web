import axios from "axios";
import { Shipment } from "../types/shipment";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchShipments = async (): Promise<Shipment[]> => {
  const res = await axios.get(`${API_URL}/shipments/list`);
  return res.data;
};
