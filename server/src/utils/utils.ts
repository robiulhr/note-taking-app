import { Response } from "express";

type SendResponseType = (response: Response, statusCode: number, responseMessage: string, data?: object[] | object) => void;

export const sendResponse: SendResponseType = (response, statusCode, responseMessage, data) => {
  response.json({ statusCode, message: responseMessage, data });
};

export const isHexColor = function (color: string) {
  return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color);
};
