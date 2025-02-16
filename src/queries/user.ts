import { useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";
import clerkTransformData, { UpdateUserClerkFormData } from "../utils/clerkTransformData";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { WizardPreferences } from "../components/wizard/WizardContext";
import { useEffect, useState } from "react";

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
