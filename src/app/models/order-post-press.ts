import { Work } from './work';
import { Contact } from './contact';

export enum WorkType {'cover', 'block'};
export interface OrderPostPress {
  contact: Contact;
  contactId: string;
  work: Work;
  workId: string;

  workType: WorkType;
  option: string;
  price: number;
}