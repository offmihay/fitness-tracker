export type UpdateUserClerkFormData = {
  firstName: string;
  lastName: string;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: string;
  primaryWeb3WalletId: string;
  username: string;
  unsafeMetadata: UserUnsafeMetadata;
};

const clerkTransformData = (
  data: Partial<Omit<UpdateUserClerkFormData, "unsafeMetadata"> & UserUnsafeMetadata>,
  unsafePrev?: Partial<UserUnsafeMetadata>
): Partial<UpdateUserClerkFormData> => {
  const metadataKeys: (keyof UserUnsafeMetadata)[] = [
    "birthday",
    "organizerDetails",
    "organizerEmail",
    "organizerPhone",
    "organizerName",
    "phoneNumber",
  ];

  const safeData = Object.fromEntries(
    Object.entries(data).filter(([key]) => !metadataKeys.includes(key as keyof UserUnsafeMetadata))
  );
  const unsafeData = Object.fromEntries(
    Object.entries(data).filter(([key]) => metadataKeys.includes(key as keyof UserUnsafeMetadata))
  );

  const formData = { ...safeData, unsafeMetadata: { ...unsafePrev, ...unsafeData } };

  return formData;
};

export default clerkTransformData;
