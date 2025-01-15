export type UpdateUserClerkFormData = {
  firstName: string;
  lastName: string;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: string;
  primaryWeb3WalletId: string;
  username: string;
  unsafeMetadata: Record<string, any>;
};

const clerkTransformData = <T extends Record<string, any>>(
  data: T
): Partial<UpdateUserClerkFormData> => {
  const permittedKeys: (keyof UpdateUserClerkFormData)[] = [
    "firstName",
    "lastName",
    "primaryEmailAddressId",
    "primaryPhoneNumberId",
    "primaryWeb3WalletId",
    "unsafeMetadata",
    "username",
  ];

  const permittedData = Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) =>
        permittedKeys.includes(key as keyof UpdateUserClerkFormData) && value !== undefined
    )
  );

  const unpermittedData = Object.fromEntries(
    Object.entries(data).filter(
      ([key]) => !permittedKeys.includes(key as keyof UpdateUserClerkFormData)
    )
  );

  const formData: Partial<UpdateUserClerkFormData> = {
    ...permittedData,
    unsafeMetadata: unpermittedData,
  };

  return formData;
};

export default clerkTransformData;
