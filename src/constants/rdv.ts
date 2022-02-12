export interface BoolChoice {
  id: string;
  label: string;
  value: boolean;
}

export const MONDAY: BoolChoice[] = [
  { id: "monday-11", label: "11h", value: false },
  { id: "monday-14", label: "14h", value: false },
];

export const TUESDAY: BoolChoice[] = [
  { id: "tuesday-11", label: "11h", value: false },
  { id: "tuesday-14", label: "14h", value: false },
];

export const WEDNESDAY: BoolChoice[] = [
  { id: "wednesday-11", label: "11h", value: false },
  { id: "wednesday-13", label: "13h", value: false },
  { id: "wednesday-15", label: "15h", value: false },
];

export const THURSDAY: BoolChoice[] = [
  { id: "thursday-11", label: "11h", value: false },
  { id: "thursday-13", label: "13h", value: false },
  { id: "thursday-15", label: "15h", value: false },
];

export const FRIDAY: BoolChoice[] = [
  { id: "friday-11", label: "11h", value: false },
  { id: "friday-13", label: "13h", value: false },
  { id: "friday-15", label: "15h", value: false },
];

export const LANGUAGES: BoolChoice[] = [
  { id: "languageFr", label: "lang-fr", value: false },
  { id: "languageEn", label: "lang-en", value: false },
];

export const STYLES: BoolChoice[] = [
  { id: "styleBlack", label: "black", value: false },
  { id: "styleBc", label: "blackWhite", value: false },
  { id: "styleColor", label: "color", value: false },
  { id: "styleGradient", label: "gradient", value: false },
  { id: "styleMulticolor", label: "multicolore", value: false },
];

export const FIRST_TIME: BoolChoice[] = [
  { id: "firstTimeyYes", label: "yes", value: false },
  { id: "firstTimeNo", label: "no", value: false },
];
