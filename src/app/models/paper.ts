import { Material } from './material';
import { Format } from './format';
import { PaperPrice } from './paper-price';

export interface Paper {
  id?: string;
  material?: Material;
  materialId: string;
  format?: Format;
  formatId: string;
  density: number;
  paperPrices?: PaperPrice[];
}
