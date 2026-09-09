export const bookingColors = [
  { name: "White", value: "#FCFCFC" },
  { name: "Grey", value: "#757180" },
  { name: "Red", value: "#CD2E30" },
  { name: "Black", value: "#050505" },
  { name: "Silver Grey", value: "#C3CADB" },
] as const;

export const bookingColorValues = bookingColors.map((color) => color.value);
