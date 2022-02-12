export const isFormValid = (form: any) => {
  return form.firstName &&
    form.lastName &&
    form.email &&
    (form.languageFr || form.languageEn) &&
    form.placement &&
    form.size &&
    (form["monday-11"] ||
      form["monday-14"] ||
      form["tuesday-11"] ||
      form["tuesday-14"] ||
      form["wednesday-11"] ||
      form["wednesday-13"] ||
      form["wednesday-14"] ||
      form["wednesday-15"] ||
      form["thursday-11"] ||
      form["thursday-14"] ||
      form["friday-11"] ||
      form["friday-13"] ||
      form["friday-14"] ||
      form["friday-15"]) &&
    form.over18 &&
    form.covidProof &&
    form.trueInfo
    ? ""
    : "disabled";
};
