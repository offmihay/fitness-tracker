import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import FormData from "form-data";
import fetchApi from "../api/fetchApi";

export type ImageUploadResponse = {
  api_key: string;
  asset_folder: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  display_name: string;
  etag: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};

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

      const response = await fetchApi<any, ImageUploadResponse>("/files", {
        body: formData,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};
