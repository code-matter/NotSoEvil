export const RANDOM_COLORS = ["#E1C3FF", "#15B7FF", "#2DE4D1", "#FACD01"];
export const RANDOM_COLORS_PASTELS = [
  "#a6f3eb",
  "#a4e3ff",
  "#e1c3ff",
  "#ffe77f",
];

export const getColor = () => {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
};
