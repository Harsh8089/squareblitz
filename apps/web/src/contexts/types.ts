import { HttpStatusCode } from 'axios';

export type Response = Promise<{
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: HttpStatusCode;
}>;
