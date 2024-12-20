import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import FormData from "form-data";

interface UploadImagePayload {
  image: ImagePickerAsset;
  asset_id: string;
}

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: async ({ image, asset_id }: UploadImagePayload) => {
      const formData = new FormData();

      formData.append("file", {
        uri: image.uri,
        name: image.fileName || "image.jpg",
        type: image.type || "image/jpeg",
        asset_id: image.assetId,
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

      return { result: await resp.json(), asset_id };
    },
    onMutate: ({ asset_id }) => {
      queryClient.setQueryData(["pendingUploads"], (old: Record<string, boolean> = {}) => ({
        ...old,
        [asset_id]: true,
      }));
    },
    onSettled: (data, error, variables) => {
      queryClient.setQueryData(["pendingUploads"], (old: Record<string, boolean> = {}) => {
        console.log(data);
        const newState = { ...old };
        delete newState[variables.asset_id];
        return newState;
      });
    },
  });
};

export const usePendingUploads = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["pendingUploads"],
    queryFn: () => {
      return (queryClient.getQueryData(["pendingUploads"]) as Record<string, boolean>) || {};
    },
    staleTime: 0,
  });
};
