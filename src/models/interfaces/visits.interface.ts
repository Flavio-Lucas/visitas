import { VisitStatus } from "../enums/status.enum";
import { ApartmentInterface } from "./apartment.interface";
import { UserInterface } from "./user.interface";

export interface Visit {
  id: number;
  date: Date;
  location_id: number;
  broker_id: number;
  visitor_id: number;
  status: VisitStatus;
  awareness: boolean;
  visitors?: UserInterface[];
  broker?: UserInterface;
  location?: ApartmentInterface;
  history?: {
    id: number,
    statusChangedTo: VisitStatus,
  }[]
}
