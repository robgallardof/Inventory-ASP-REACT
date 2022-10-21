import { providerCreationDTO } from "../provider/provider.model";
import { packageBoxCreationDTO } from "../PackageBox/packagesBox.models";



export function convertProviderToFormData(provider: providerCreationDTO): FormData{
    const formData = new FormData();

    formData.append('name', provider.name);
    if (provider.biography){
        formData.append('biography', provider.biography);
    }

    if (provider.image){
        formData.append("image", provider.image);
    }

    return formData;
}

export function convertPackageToFormData(packagesbox: packageBoxCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', packagesbox.name);

    if (packagesbox.description){
        formData.append('description', packagesbox.description);
    }

    
    formData.append('review', packagesbox.review);

    formData.append('price',String(packagesbox.price));

    formData.append('inWarehouse', String(packagesbox.inWarehouse));
    
    if (packagesbox.comingSoonDate){
        formData.append("comingSoonDate", formatDate(packagesbox.comingSoonDate));
    }

    if (packagesbox.image){
        formData.append('image', packagesbox.image);
    }

    formData.append("categoriesIds", JSON.stringify(packagesbox.categoriesIds));
    formData.append("branchesIds", JSON.stringify(packagesbox.branchesIds));
    formData.append("providers", JSON.stringify(packagesbox.providers));

    return formData;
}

function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: "2-digit"
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}