import i18n from "i18next";

export const formatDateTime = (date: string, language: string | null) => {
  const localesLangCode = language || i18n.language || "en-US";

  const newDate = new Date(date);

  if (isNaN(newDate.getTime())) {
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return newDate.toLocaleTimeString(localesLangCode, options);
};
