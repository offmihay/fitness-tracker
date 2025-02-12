import { TournamentStatus } from "../types/tournament";

export const getStatusColor = (status: TournamentStatus, isActive: boolean) => {
  const colorMap = {
    UPCOMING: "rgba(0, 130, 255, 1)",
    ONGOING: "#55da8b",
    FINISHED: "#cacaca",
    DEACTIVATED: "#ff4b4b",
  };

  if (isActive) {
    return colorMap[status];
  } else {
    return colorMap["DEACTIVATED"];
  }
};
