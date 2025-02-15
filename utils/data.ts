import { ZipCodeFormData } from "../types/data";
import { zipCodeDataList } from "../data/zip_code";

export const getZipCodeData = (targetZipCode: string): ZipCodeFormData | undefined => {
  const zipCodeData = zipCodeDataList.find(item => item.zipCode.toString() === targetZipCode);
  if (!zipCodeData) return;

  return {
    zipCode: zipCodeData?.zipCode.toString(),
    city: zipCodeData?.city
  };
};
