// types/Shipment.ts

export interface Shipment {
  id: string;
  start: string;
  end: string;
  expected_delivery: string;
  carrier: string;
  status: string;
  last_updated_date: string;
  customer_id: number;
  customer_name: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  long: number;
}
