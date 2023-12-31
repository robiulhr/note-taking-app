import { Box } from "@mui/material";
import NoDataFound from "../component/error/noDataFound";
import { useEffect, useState } from "react";
import getAllNotes from "../apiActions/getAllNotes";
import { FullPageLoading } from "../component/loader/fullPageLoading";
import { noteType } from "../types/types";
import { wait } from "../utils/utils";
import { useErrorBoundary } from "react-error-boundary";
import { ERROR_MESSAGES } from "../contents/errorMessages";
import { toast } from "react-toastify";
import NoteCart from "../component/cart/noteCart";
import PaginationComp from "../component/paginationComp";
import ViewTypeFilter from "../component/filter/viewTypeFilter/viewTypeFilter";

export default function AllNotes() {
  const [allNotes, setAllNotes] = useState<noteType[]>([]);
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();
  function deleteNoteOnUi(noteId: string) {
    setAllNotes(allNotes.filter((ele) => ele.id !== noteId));
  }
  useEffect(() => {
    async function fetchAllNotes() {
      try {
        setLoading(true);
        // wait for test purpose
        await wait(2000);
        const notes = await getAllNotes();
        if (notes) {
          setAllNotes(notes as noteType[]);
        }
        setLoading(false);
      } catch (err) {
        toast.error(ERROR_MESSAGES.ALL_NOTES_READ_ERROR);
        showBoundary(ERROR_MESSAGES.ALL_NOTES_READ_ERROR);
      }
    }
    fetchAllNotes();
  }, []);
  return (
    <Box className="bg-white">
      <Box className="min-h-[500px] w-[100%] h-[100%]">
        {loading ? (
          <FullPageLoading className="min-h-[500px]" />
        ) : allNotes.length <= 0 ? (
          <NoDataFound />
        ) : (
          <Box>
            <ViewTypeFilter />
            <Box className="my-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
              {allNotes.map((ele) => {
                return <NoteCart key={ele.noteTitle + ele.id} id={ele.id} noteTitle={ele.noteTitle} noteDescription={ele.noteDescription} noteTags={ele.noteTags} deleteNoteOnUi={deleteNoteOnUi} />;
              })}
            </Box>
          </Box>
        )}
      </Box>
      <PaginationComp />
    </Box>
  );
}
