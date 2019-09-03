import { Division } from './division';

export interface Order {
  id?: string;
  regDate: Date;
  name: string;
  number: string;
  division: Division;
  divisionId: string;
  subdivisionId: string;
  contactId: string;
}
