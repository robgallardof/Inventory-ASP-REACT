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

export interface providerPackageDTO {
  id: number;
  name: string;
  image: string;
}
