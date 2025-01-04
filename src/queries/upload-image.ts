import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import FormData from "form-data";

export const useUploadImage = () => {
  return useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: async (image: ImagePickerAsset) => {
      const formData = new FormData();

      formData.append("file", {
        uri: image.uri,
        name: image.fileName || "image.jpg",
        type: image.mimeType || "image/jpeg",
      });

      const resp = await fetch(
        "https://fitness-tracker-backend-production-1f9c.up.railway.app/files",
        {
          method: "POST",
          body: formData as any,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await resp.json();

      // throw new Error("ITS AN ERROR");
      return result;
    },
  });
};
