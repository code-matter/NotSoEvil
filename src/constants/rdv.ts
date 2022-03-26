export interface BoolChoice {
  id: string;
  label: string;
  value: boolean;
}

export const MONDAY: BoolChoice[] = [
  { id: "monday-10", label: "10h", value: false },
  { id: "monday-12", label: "12h", value: false },
  { id: "monday-14", label: "14h", value: false },
];

export const TUESDAY: BoolChoice[] = [
  { id: "tuesday-10", label: "10h", value: false },
  { id: "tuesday-12", label: "12h", value: false },
  { id: "tuesday-14", label: "14h", value: false },
];

export const WEDNESDAY: BoolChoice[] = [
  { id: "wednesday-10", label: "10h", value: false },
  { id: "wednesday-12", label: "12h", value: false },
  { id: "wednesday-14", label: "14h", value: false },
];

export const THURSDAY: BoolChoice[] = [
  { id: "thursday-10", label: "10h", value: false },
  { id: "thursday-12", label: "12h", value: false },
  { id: "thursday-14", label: "14h", value: false },
];

export const FRIDAY: BoolChoice[] = [
  { id: "friday-10", label: "10h", value: false },
  { id: "friday-12", label: "12h", value: false },
  { id: "friday-14", label: "14h", value: false },
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
