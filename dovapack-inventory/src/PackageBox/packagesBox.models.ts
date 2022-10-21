import { warehouseDTO } from "../warehouse/warehouse.models";
import { providerPackageDTO } from "../provider/provider.model";
import { CategoryDTO } from "../categories/category.model";

// Modelo de interface del Paquete.
export interface packageBoxDTO {
  id: number;
  name: string;
  description?: string;
  inWarehouse: boolean;
  price: number;
  review: string;
  comingSoonDate: Date;
  image: string;
  categories: CategoryDTO[];
  warehouses: warehouseDTO[];
  providers: providerPackageDTO[];
  voteUser?: number;
  averageVote?: number;
}

export interface packageBoxCreationDTO {
  name: string;
  inWarehouse: boolean;
  description?: string;
  price?: number;
  comingSoonDate?: Date;
  image?: File;
  imageLink?: string;
  review: string;
  categoriesIds?: number[];
  branchesIds?: number[];
  providers?: providerPackageDTO[];
}

// Interfaz de estado.
export interface landingPageDTO {
   inWarehouse?: packageBoxDTO[];
   newPackages?: packageBoxDTO[];
}

export interface packageBoxPostGetDTO{
  categories:  CategoryDTO[];
  warehouses : warehouseDTO[];
}

export interface packageBoxPutGetDTO {
  packagebox: packageBoxDTO;
  categoriesSelected: CategoryDTO[];
  categoriesNotSelected: CategoryDTO[];
  branchesSelected: warehouseDTO[];
  warehousesNotSelected: warehouseDTO[];
  providers: providerPackageDTO[];
}