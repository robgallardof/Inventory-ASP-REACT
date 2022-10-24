// Modelo de interface del Paquete.
export interface packageBoxDTO {
  id: number;
  name: string;
  description?: string;
  priorityShippingDate: Date;
  image: string;
  categories: categoryDTO[];
  warehouses: warehouseDTO[];
  providers: providerPackageBoxDTO[];
}

export interface packageBoxCreationDTO {
  name: string;
  description?: string;
  priorityShippingDate?: Date;
  image?: File;
  imageLink?: string;
  categoriesIds?: number[];
  warehousesIds?: number[];
  providers?: providerPackageBoxDTO[];
}

// Interfaz de estado.
export interface landingPageDTO {
   priorityShippingPackages?: packageBoxDTO[];
}

export interface packageBoxPostGetDTO{
  categories:  categoryDTO[];
  warehouses : warehouseDTO[];
}

export interface packageBoxPutGetDTO {
  packagesBox: packageBoxDTO;
  categoriesSelected: categoryDTO[];
  categoriesNotSelected: categoryDTO[];
  warehousesSelected: warehouseDTO[];
  warehousesNotSelected: warehouseDTO[];
  providers: providerPackageBoxDTO[];
}