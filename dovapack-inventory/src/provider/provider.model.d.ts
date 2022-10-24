export interface providerDTO {
  id: number;
  name: string;
  image: string;
}

export interface providerCreationDTO {
  name: string;
  image?: File;
  imageLink?: string;
}

export interface providerPackageBoxDTO {
  id: number;
  name: string;
  image: string;
}
