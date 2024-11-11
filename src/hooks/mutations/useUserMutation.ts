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

export const useSetProfileImageMutation = (options?: UseMutationOptions<void, unknown, string>) => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (imgUrl: string): Promise<void> => {
      if (!user) return Promise.resolve();
      return user.setProfileImage({ file: imgUrl }).then(() => undefined);
    },
    ...options,
  });
};

export const useUpdateUserMutation = (options?: UseMutationOptions<void, unknown, FormData>) => {
  const { user } = useUser();
  return useMutation({
    mutationFn: (data: FormData): Promise<void> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.5) {
            reject(new Error("server_error"));
          } else {
            if (!user) {
              resolve();
              return;
            }
            user.update(data).then(() => resolve());
          }
        }, 2000);
      });
    },
    ...options,
  });
};
