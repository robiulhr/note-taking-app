import axios from "axios";
import API_LINK, { API_ROUTES } from "../apiMap";
export default function createNotes(noteTitle: string, noteTags: string[], noteDescription: string) {
  const createNoteLink = `${API_LINK}/${API_ROUTES.CREATE_NOTE}`;
  axios
    .post(createNoteLink, {
      noteTitle,
      noteTags,
      noteDescription,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
