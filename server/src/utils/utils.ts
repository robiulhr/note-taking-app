import { Response } from "express";

type SendResponseType = (response: Response, statusCode: number, responseMessage: string, data?: object[] | object) => void;

export const sendResponse: SendResponseType = (response, statusCode, responseMessage, data) => {
  response.json({ statusCode, message: responseMessage, data });
};
