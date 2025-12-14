import { PropertyType } from '../types/properties';

export const PROPERTY_TYPE = [
  { label: 'Fazenda', value: PropertyType.FARM },
  { label: 'Rancho', value: PropertyType.RANCH },
  { label: 'Casa de Campo', value: PropertyType.COUNTRY_HOUSE },
];
export const PROPERTY_TYPE_LABEL_MAP: Record<string, string> = {
  FARM: 'Fazenda',
  RANCH: 'Rancho',
  COUNTRY_HOUSE: 'Casa de Campo',
};
