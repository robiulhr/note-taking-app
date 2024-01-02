import axios from "axios";
import API_LINK, { API_ROUTES } from "../../apiMap";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../../contents/errorMessages";
import { tagType } from "../../types/types";

export default async function getAllTags(): Promise<tagType[] | boolean> {
  const allTagsLink = `${API_LINK}/${API_ROUTES.GET_ALL_TAGS}`;
  try {
    const response = await axios.get(allTagsLink);
    const data = response.data;
    if (data.statusCode !== 200) {
      toast.error(ERROR_MESSAGES.ALL_TAGS_READ_ERROR);
      return false;
    }
    return data.data;
  } catch (err) {
    console.log(err);
    toast.error(ERROR_MESSAGES.ALL_TAGS_READ_ERROR);
    return false;
  }
}
