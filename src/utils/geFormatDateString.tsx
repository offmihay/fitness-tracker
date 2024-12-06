import i18n from "i18next";
import { useSettings } from "../hooks/useSettings";

export const getFormatDateRange = (dateStartStr: string, dateEndStr: string) => {
  const { settings } = useSettings();
  const localesLangCode = settings.language || i18n.language || "en-US";

  const dateStart = new Date(dateStartStr);
  const dateEnd = new Date(dateEndStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  if (dateStart.getTime() === dateEnd.getTime()) {
    return dateStart.toLocaleDateString(localesLangCode, options);
  } else {
    return `${dateStart.toLocaleDateString(
      localesLangCode,
      options
    )} - ${dateEnd.toLocaleDateString(localesLangCode, options)}`;
  }
};
