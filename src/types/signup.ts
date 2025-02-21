import { Request } from "express";

export type SignupRequestBody = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type SignupRequest = Request<{}, {}, SignupRequestBody>;
