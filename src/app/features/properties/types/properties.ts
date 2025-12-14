export interface IProperty {
  id: string;
  lead_id: string;
  name: string;
  property_type: PropertyType;
  crop: Crop;
  area: number;
  municipality: string;
}

export interface IPropertyWithLead extends IProperty {
  lead: {
    id: string;
    name: string;
  };
}

export enum PropertyType {
  FARM = 'FARM',
  RANCH = 'RANCH',
  COUNTRY_HOUSE = 'COUNTRY_HOUSE',
}

export enum Crop {
  SOY = 'SOY',
  CORN = 'CORN',
  COTTON = 'COTTON',
}

export type PropertyUI = Omit<IProperty, 'crop' | 'property_type'> & {
  crop: string;
  property_type: string;
  lead_name: string;
};

export type IPropertyCreate = Omit<IProperty, 'id'>;
