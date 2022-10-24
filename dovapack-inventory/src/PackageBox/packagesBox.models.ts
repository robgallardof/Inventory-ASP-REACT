import { categoryDTO } from "../categories/category.model";
import { providerPackageBoxDTO } from "../provider/provider.model";
import { warehouseDTO } from "../warehouse/warehouse.models";

// Modelo de interface del Paquete.
export interface packageBoxDTO {
  id: number;
  name: string;
  description?: string;
  // inWarehouse: boolean;
  // price: number;
  priorityShippingDate: Date;
  image: string;
  categories: categoryDTO[];
  warehouses: warehouseDTO[];
  providers: providerPackageBoxDTO[];
}

export interface packageBoxCreationDTO {
  name: string;
  // inWarehouse: boolean;
  description?: string;
  // price?: number;
  priorityShippingDate?: Date;
  image?: File;
  imageLink?: string;
  categoriesIds?: number[];
  warehousesIds?: number[];
  providers?: providerPackageBoxDTO[];
}

// Interfaz de estado.
export interface landingPageDTO {
  //  inWarehouse?: packageBoxDTO[];
   priorityShippingPackages?: packageBoxDTO[];
}

export interface packageBoxPostGetDTO{
  categories:  categoryDTO[];
  warehouses : warehouseDTO[];
}

export interface packageBoxPutGetDTO {
  packageBox: packageBoxDTO;
  categoriesSelected: categoryDTO[];
  categoriesNotSelected: categoryDTO[];
  warehousesSelected: warehouseDTO[];
  warehousesNotSelected: warehouseDTO[];
  providers: providerPackageBoxDTO[];
}