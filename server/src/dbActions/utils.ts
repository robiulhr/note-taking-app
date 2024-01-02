import fs from "fs/promises";

type CallbackType<T> = (err: object | unknown, data?: T) => Promise<void>;

export const jsonReader = async <T>(filePath: string, cb: CallbackType<T>): Promise<void> => {
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
