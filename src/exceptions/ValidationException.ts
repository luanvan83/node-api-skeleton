import { HttpError } from "routing-controllers";

export class ValidationException extends HttpError {
  name = "ValidationException";
  httpCode = 422;
  fieldErrors = null;

  /**
   * 
   * @param {string} message     Common error message
   * @param {object} fieldErrors Object like {field_name: "Some error"}
   */
  constructor(message:string, fieldErrors: object | any = null) {
    super(422, message);
    this.fieldErrors = fieldErrors;
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}