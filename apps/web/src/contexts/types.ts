import { HttpStatusCode } from "axios";

export type ResponseType = {
  success: boolean,
  data?: any;
  error?: string;
  statusCode?: HttpStatusCode
}