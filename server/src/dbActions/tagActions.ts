import fs from "fs/promises";
import rootDir from "app-root-path";
import { v4 as uuidv4 } from "uuid";
import { jsonReader } from "./utils";
import { tagType } from "../types/types";

const TAGS_STORE = rootDir.resolve("/store/tags.json");

export const createTag = async (tag: tagType): Promise<string> => {
  const tagId = uuidv4();
  tag.id = tagId;
  let message = "";
  await jsonReader<tagType[]>(TAGS_STORE, async (err: object | unknown, tags: tagType[] | undefined) => {
    if (err) {
      console.log("Error reading tags", err);
      return;
    }
    // insert new tag
    if (tags === undefined) {
      tags = [];
    }
    tags.push(tag);
    // write the updated tags array to the store
    await fs
      .writeFile(TAGS_STORE, JSON.stringify(tags))
      .then(() => {
        message = "success";
      })
      .catch((err) => {
        if (err) {
          console.log("Error writing tags", err);
        }
      });
  });
  return message;
};

interface readAllTagsReturn {
  data: tagType[];
  message: string;
}

export const readTags = async (id?: string): Promise<readAllTagsReturn> => {
  let message = "";
  let data: tagType[] = [];
  await jsonReader<tagType[]>(TAGS_STORE, async (err: object | unknown, tags: tagType[] | undefined) => {
    if (err) {
      console.log("Error reading Tags", err);
      return;
    }
    if (tags === undefined) {
      tags = [];
    }
    if (id as string) {
      data = tags.filter((ele) => ele?.id === id);
    } else {
      data = tags;
    }
    message = "success";
  });
  return { data: data, message };
};
