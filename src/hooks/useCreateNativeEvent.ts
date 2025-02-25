import * as Calendar from "expo-calendar";
import { calendarPermissionAlert } from "../shared/alerts/alerts";
import * as Linking from "expo-linking";
import { t } from "i18next";
import { Platform } from "react-native";
import { useToast } from "./useToast";

const useCreateNativeEvent = () => {
  const [_, requestPermissions] = Calendar.useCalendarPermissions();
  const { showSuccessToast } = useToast();

  const createEvent = async (eventData?: Omit<Partial<Calendar.Event>, "id">) => {
    const { status } = await requestPermissions();
    if (Platform.OS === "ios" && status !== Calendar.PermissionStatus.GRANTED) {
      calendarPermissionAlert(Linking.openSettings, t);
      return null;
    }
    const event = await Calendar.createEventInCalendarAsync(eventData);
    if (
      Platform.OS === "ios" &&
      ![
        Calendar.CalendarDialogResultActions.canceled,
        Calendar.CalendarDialogResultActions.deleted,
      ].includes(event.action)
    ) {
      showSuccessToast("event_created");
    }
  };

  return { createEvent };
};

export default useCreateNativeEvent;
