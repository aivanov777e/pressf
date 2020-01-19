import { Format } from './format';
import { Work } from './work';

export interface Equipment {
  id: string;
  name: string;
  work?: Work;
  workId: string;
  formates?: Format[];
  equipmentFormats?: any[];
}
