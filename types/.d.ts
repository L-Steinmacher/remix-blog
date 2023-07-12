import { ServerResponse } from "http";
export {};
declare global {
    namespace Express {
      export interface Response {
        locals: {
          [key: string]: any;
        };
      }
    }
  }

  declare module "http" {
    export interface ServerResponse {
      locals: {
        [key: string]: any;
      };
    }
  }