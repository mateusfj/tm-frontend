export interface IProperty {
  id: string;
  lead_id: string;
  crop: Crop;
  area: number;
  geometry: string;
}

export enum Crop {
  SOY = 'soy',
  CORN = 'corn',
  COTTON = 'cotton',
}

export type PropertyUI = Omit<IProperty, 'crop'> & {
  crop: string;
};

export type IPropertyCreate = Omit<IProperty, 'id'>;
