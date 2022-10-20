export interface packageDTO{
    id: number;
    name: string;
    image: string;
}

export interface landingPageDTO{
    inSucursal?: packageDTO[];
    newPackages?: packageDTO[];
}