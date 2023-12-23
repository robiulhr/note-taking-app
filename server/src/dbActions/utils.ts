import fs from "fs/promises";
import { noteType } from "../types/types";

type JsonReaderTypes = (filePath: string, cb: (input1: object | unknown, input2?: noteType[]) => void) => Promise<void>;
export const jsonReader: JsonReaderTypes = async (filePath, cb) => {
  await fs
    .readFile(filePath)
    .then((fileData: Buffer) => {
      try {
        const data = fileData.toString();
        const parsedData = data ? JSON.parse(data) : [];
        return cb && cb(null, parsedData);
      } catch (err) {
        return cb && cb(err);
      }
    })
    .catch((err) => {
      return cb && cb(err);
    });
};
