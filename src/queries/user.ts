import { useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";
import { UpdateUserClerkFormData } from "../utils/clerkTransformData";

export const useSetProfileImageMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (imgUrl: string | null) => {
      return user!.setProfileImage({ file: imgUrl });
    },
  });
};

export const useUpdateUserMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (data: Partial<UpdateUserClerkFormData>) => {
      return user!.update(data);
    },
  });
};
