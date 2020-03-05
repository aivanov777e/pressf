import { Division } from './division';
import { Contact } from './contact';
import { Format } from './format';
import { OrderPress } from './order-press';
import { OrderPostPress } from './order-post-press';

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
  format: Format;
  formatId: string;
  cover: OrderPress;
  coverId: string;
  block: OrderPress;
  blockId: string;
  //postPress?: OrderPostPress[];

  countOfItem: number;
  sheetsInItem: number;
  //count: number;
  width: number;
  heigth: number;
  price: number;

  //
  contactTel: string;
}
