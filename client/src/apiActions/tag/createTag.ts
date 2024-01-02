import axios from "axios";
import API_LINK, { API_ROUTES } from "../../apiMap";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../../contents/errorMessages";
import { tagType } from "../../types/types";
export default async function createTag({ name, color, description, icon }: tagType) {
  const createTagLink = `${API_LINK}/${API_ROUTES.CREATE_TAG}`;
  try {
    const response = await axios.post(createTagLink, {
      name,
      color,
      description,
      icon,
    });
    const data = response.data;
    if (data.statusCode !== 200) {
      toast.error(ERROR_MESSAGES.TAG_DATA_INVALID_ERROR);
      return false;
    }
    return data;
  } catch (err) {
    console.log(err);
    toast.error(ERROR_MESSAGES.INTERNAL_ERROR);
    return false;
  }
}
