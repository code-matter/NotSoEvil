const RANDOM_COLORS = ["#E1C3FF", "#15B7FF", "#2DE4D1", "#FACD01"];
const RANDOM_COLORS_PASTELS = ["#a6f3eb", "#a4e3ff", "#e1c3ff", "#ffe77f"];
const RANDOM_ACCENT_COLORS = ["#15b7ff", "#2de4d1", "#ff7a9f", "#facd01"];

export const getColor = () => {
  return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
};

export const getPastelColor = () => {
  return RANDOM_COLORS_PASTELS[
    Math.floor(Math.random() * RANDOM_COLORS.length)
  ];
};

export const accentColor = () => {
  return RANDOM_ACCENT_COLORS[
    Math.floor(Math.random() * RANDOM_ACCENT_COLORS.length)
  ];
};
