import { Contact } from './contact';
import { Equipment } from './equipment';
import { Paper } from './paper';
import { Format } from './format';
import { OrderPostPress } from './order-post-press';
import { Material } from './material';

export interface OrderPress {
  id?: string;
  contact: Contact;
  contactId: string;
  equipment: Equipment;
  equipmentId: string;
  format: Format;
  formatId: string;
  paper: Paper;
  paperId: string;
  postPress?: OrderPostPress[];

  material: Material;
  materialId: string;

  count: number;
  countAdj: number;
  color1: number;
  color2: number;
  pricePaper: number;
  pricePress: number;

  color: any;
}
