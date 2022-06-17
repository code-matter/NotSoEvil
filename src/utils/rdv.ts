export const isFormValid = (form: any) => {
  return (
    form.firstName &&
    form.lastName &&
    form.email &&
    (form.languageFr || form.languageEn) &&
    form.placement &&
    form.size &&
    (form["monday-10"] ||
      form["monday-12"] ||
      form["monday-14"] ||
      form["tuesday-10"] ||
      form["tuesday-12"] ||
      form["tuesday-13"] ||
      form["wednesday-10"] ||
      form["wednesday-12"] ||
      form["wednesday-13"] ||
      form["thursday-10"] ||
      form["thursday-13"] ||
      form["thursday-12"] ||
      form["friday-10"] ||
      form["friday-12"] ||
      form["friday-14"]) &&
    form.over18 &&
    // form.covidProof &&
    form.trueInfo
  );
};
