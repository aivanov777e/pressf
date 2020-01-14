import { WorkPrice } from './work-price';

export interface Work {
  id?: string;
  name: string;
  postPressBlock: boolean;
  postPressCover: boolean;
  workPrices?: WorkPrice[];
}
