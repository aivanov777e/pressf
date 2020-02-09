import { Contact } from './contact';
import { Equipment } from './equipment';
import { Paper } from './paper';
import { Format } from './format';

export interface OrderPress {
  contact: Contact;
  contactId: string;
  equipment: Equipment;
  equipmentId: string;
  format: Format;
  formatId: string;
  paper: Paper;
  paperId: string;

  count: number;
  countAdj: number;
  color1: number;
  color2: number;
  pricePaper: number;
  pricePress: number;

  color: any;
}