export interface providerDTO {
  id: number;
  name: string;
  biography: string;
  image: string;
}

export interface providerCreationDTO {
  name: string;
  image?: File;
  imageLink?: string;
  biography?: string;
}

export interface providerPackageBoxDTO {
  id: number;
  name: string;
  image: string;
}
