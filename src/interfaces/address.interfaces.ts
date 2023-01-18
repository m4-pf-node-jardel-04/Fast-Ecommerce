export interface IAddressRequest {
  nickname: string;
  district: string;
  zipCode: string;
  number?: number;
  complement?: string;
  city: string;
  state: string;
};

export interface IAddress {
  id: string;
  nickname: string;
  district: string;
  zipCode: string;
  number?: number;
  complement?: string;
  city: string;
  state: string;
};

export interface IAddressUpdate {
  nickname?: string;
  district?: string;
  zipCode?: string;
  number?: number;
  complement?: string;
  city?: string;
  state?: string;
};
