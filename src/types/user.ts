export type UpdateUserClerkFormData = Partial<{
  firstName: string;
  lastName: string;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: string;
  primaryWeb3WalletId: string;
  username: string;
  unsafeMetadata: UserUnsafeMetadata;
}>;
