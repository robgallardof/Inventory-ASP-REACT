// eslint-disable-next-line @typescript-eslint/no-unsend-vars
import { StringSchema } from "yup";

declare module "yup" {
  class StringSchema {
    firstCapitalLetter(): this;
  }
}
