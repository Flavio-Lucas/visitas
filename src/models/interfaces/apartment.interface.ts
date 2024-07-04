import { UserInterface } from "./user.interface";

export interface ApartmentInterface {
  id: number;
  unit: string;
  block: string;
  owner_id: number;
  broker_id: number;
  owner?: UserInterface;
}