import axios from "axios";
import API_LINK, { API_ROUTES } from "../apiMap";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../contents/errorMessages";
import { noteType } from "../types/types";

export default async function getNote(id: string): Promise<noteType[] | boolean> {
  const allNotesLink = `${API_LINK}/${API_ROUTES.GET_NOTE}/${id}`;
  try {
    const response = await axios.get(allNotesLink);
    const data = response.data;
    if (data.statusCode === 404) {
      toast.error(ERROR_MESSAGES.NOTE_READ_ERROR);
      return false;
    }
    return data.data;
  } catch (err) {
    console.log(err);
    toast.error(ERROR_MESSAGES.INTERNAL_ERROR);
    return false;
  }
}
