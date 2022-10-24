import { providerCreationDTO } from "../provider/provider.model";
import { packageBoxCreationDTO } from "../PackageBox/packagesBox.models";

export function convertProviderToFormData(
  provider: providerCreationDTO
): FormData {
  const formData = new FormData();

  formData.append("name", provider.name);

  if (provider.image) {
    formData.append("image", provider.image);
  }

  return formData;
}

export function convertPackageToFormData(
  packagesBox: packageBoxCreationDTO
): FormData {
  const formData = new FormData();

  formData.append("name", packagesBox.name);

  if (packagesBox.description) {
    formData.append("description", packagesBox.description);
  }

  // formData.append('price',String(packagesBox.price));

  // formData.append('inWarehouse', String(packagesBox.inWarehouse));

  if (packagesBox.priorityShippingDate) {
    formData.append(
      "priorityShippingDate",
      formatDate(packagesBox.priorityShippingDate)
    );
  }

  if (packagesBox.image) {
    formData.append("image", packagesBox.image);
  }

  formData.append("categoriesIds", JSON.stringify(packagesBox.categoriesIds));
  formData.append("warehousesIds", JSON.stringify(packagesBox.warehousesIds));
  formData.append("providers", JSON.stringify(packagesBox.providers));

  return formData;
}

function formatDate(date: Date) {
  date = new Date(date);
  const format = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [{ value: month }, , { value: day }, , { value: year }] =
    format.formatToParts(date);

  return `${year}-${month}-${day}`;
}
