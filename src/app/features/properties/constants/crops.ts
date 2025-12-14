import { Crop } from '../types/properties';

export const CROPS = [
  { label: 'Soja', value: Crop.SOY },
  { label: 'Milho', value: Crop.CORN },
  { label: 'Algodão', value: Crop.COTTON },
];

export const CROP_LABEL_MAP: Record<Crop, string> = {
  [Crop.SOY]: 'Soja',
  [Crop.CORN]: 'Milho',
  [Crop.COTTON]: 'Algodão',
};
