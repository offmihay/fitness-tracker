import { useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";
import { UpdateUserClerkFormData } from "../utils/clerkTransformData";
import Toast from "react-native-toast-message";

export const useSetProfileImageMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (imgUrl: string | null) => {
      return user!.setProfileImage({ file: imgUrl });
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
    onSuccess: () => {
      Toast.show({
        type: "successToast",
        props: { text: "Successfully updated profile image" },
      });
    },
  });
};

export const useUpdateUserMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (data: Partial<UpdateUserClerkFormData>) => {
      return user!.update(data);
    },
    onError: (error) => {
      Toast.show({
        type: "errorToast",
        props: { text: error.message },
      });
    },
    onSuccess: () => {
      Toast.show({
        type: "successToast",
        props: { text: "Successfully updated profile information" },
      });
    },
  });
};
