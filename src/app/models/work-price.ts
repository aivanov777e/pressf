import { Format } from './format';

export interface WorkPrice {
  id?: string;
  workId: string;
  format?: Format;
  formatId: string;
  color1: number;
  color2: number;
  price: number;
}
