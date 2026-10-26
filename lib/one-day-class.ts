export const ONE_DAY_CLASS_ID = "cheermeuplife-one-day-2026-11";
export const ONE_DAY_CLASS_COLLECTION = "oneDayClassReservations";

export const oneDayClassDates = [
  { value: "2026-11-06", label: "11월 6일 금요일", time: "19:00–21:00" },
  { value: "2026-11-07", label: "11월 7일 토요일", time: "19:00–21:00" },
  { value: "2026-11-08", label: "11월 8일 일요일", time: "19:00–21:00" },
] as const;

export type OneDayClassDate = (typeof oneDayClassDates)[number]["value"];

export const oneDayClassDateValues = new Set<string>(
  oneDayClassDates.map((item) => item.value),
);

export function isOneDayClassReservationOpen() {
  return process.env.ONE_DAY_CLASS_RESERVATIONS_OPEN !== "false";
}
