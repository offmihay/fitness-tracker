import * as Burnt from "burnt";
import { useTranslation } from "react-i18next";

export const useToast = () => {
  const { t } = useTranslation();

  const showSuccessToast = (message: string) => {
    const successMessage = message == t(`success.${message}`) ? undefined : t(`success.${message}`);
    Burnt.toast({
      title: t("common.success"),
      preset: "done",
      message: successMessage,
    });
  };

  return { showSuccessToast };
};
