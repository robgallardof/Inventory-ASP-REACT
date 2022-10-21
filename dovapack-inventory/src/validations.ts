import * as Yup from "yup";

export default function configureValidations() {
  Yup.addMethod(Yup.string, "firstCapitalLetter", function () {
    return this.test(
      "first-capital-letter",
      "La primera letra debe ser mayúscula.",
      function (value) {
        if (value && value.length > 0) {
          const firtsCapitalLetter = value.substring(0, 1);
          return firtsCapitalLetter === firtsCapitalLetter.toLocaleUpperCase();
        }
        return true;
      }
    );
  });
}
