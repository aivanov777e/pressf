import { Work } from './work';
import { Contact } from './contact';

export enum WorkType {cover = 'cover', block = 'block'}
export interface OrderPostPress {
  id?: string;
  orderPressId: string;

  contact: Contact;
  contactId: string;
  work: Work;
  workId: string;

  workType: WorkType;
  option: string;
  color1: number;
  color2: number;
  price: number;

  crud: string;
}
