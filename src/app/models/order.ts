import { Division } from './division';
import { Contact } from './contact';

export interface Order {
  id?: string;
  regDate: Date;
  name: string;
  number: string;
  division: Division;
  divisionId: string;
  subdivision: Division;
  subdivisionId: string;
  contact: Contact;
  contactId: string;
}
