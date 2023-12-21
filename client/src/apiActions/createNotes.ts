import axios from "axios";
import API_LINK, { API_ROUTES } from "../apiMap";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../contents/errorMessages";
export default async function createNotes(noteTitle: string, noteTags: string[], noteDescription: string) {
  const createNoteLink = `${API_LINK}/${API_ROUTES.CREATE_NOTE}`;
  try {
    const response = await axios.post(createNoteLink, {
      noteTitle,
      noteTags,
      noteDescription,
    });
    const data = response.data;
    if (data.statusCode !== 200) {
      toast.error(ERROR_MESSAGES.NOTE_DATA_INVALID_ERROR);
      return false;
    }
    return data;
  } catch (err) {
    console.log(err);
    toast.error(ERROR_MESSAGES.INTERNAL_ERROR);
    return false;
  }
}
