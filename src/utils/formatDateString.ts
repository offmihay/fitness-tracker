import i18n from "i18next";

export const formatDateRange = (
  dateStartStr: string,
  dateEndStr: string,
  language: string | null
) => {
  const localesLangCode = language || i18n.language || "en-US";

  const dateStart = new Date(dateStartStr);
  const dateEnd = new Date(dateEndStr);

  if (isNaN(dateStart.getTime()) || isNaN(dateEnd.getTime())) {
    return "Invalid date";
  }

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
