import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";

export type FormData = {
  firstName?: string;
  lastName?: string;
  primaryEmailAddressId?: string;
  primaryPhoneNumberId?: string;
  primaryWeb3WalletId?: string;
  username?: string;
  unsafeMetadata?: Record<string, any>;
};

export const useSetProfileImageMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (imgUrl: string) => {
      return user!.setProfileImage({ file: imgUrl });
    },
  });
};

export const useUpdateUserMutation = () => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (data: FormData) => {
      return user!.update(data);
    },
  });
};
