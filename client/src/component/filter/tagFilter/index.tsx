import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import PopUpComponent from "./popUpComponent";
import TagsMainInput from "./tagsMainInput";
import TagSearchProvider from "../../../context/tagSearchProvider";
import getAllTags from "../../../apiActions/tag/getAllTags";
import { tagType } from "../../../types/types";
import { wait } from "../../../utils/utils";
import { toast } from "react-toastify";
import { useErrorBoundary } from "react-error-boundary";
import { ERROR_MESSAGES } from "../../../contents/errorMessages";

export default function TagFilter() {
  const anchorEl = useRef<HTMLElement>(null);
  const [allTags, setAllTags] = useState<tagType[]>([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [pendingValue, setPendingValue] = useState(value);
  const [tagsLoading, setTagsLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setPendingValue(value);
    setPopUpOpen(!popUpOpen);
  };
  const handleClose = () => {
    setValue(pendingValue);
    setPopUpOpen(!popUpOpen);
    if (anchorEl.current) {
      anchorEl.current.focus();
    }
  };
  const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
    setValue([]);
  };
  const handleDelete = (event: MouseEvent<SVGElement>, index: number) => {
    event.stopPropagation();
    setValue(value.filter((ele, ind) => ind !== index));
  };

  useEffect(() => {
    async function fetchAllTags() {
      try {
        setTagsLoading(true);
        // wait for test purpose
        await wait(2000);
        const tags = await getAllTags();
        if (tags) {
          setAllTags(tags as tagType[]);
        }
        setTagsLoading(false);
      } catch (err) {
        toast.error(ERROR_MESSAGES.ALL_TAGS_READ_ERROR);
        showBoundary(ERROR_MESSAGES.ALL_TAGS_READ_ERROR);
      }
    }
    fetchAllTags();
  }, []);
  const tagsData = { allTags, tagsLoading };
  return (
    <>
      <TagSearchProvider>
        <TagsMainInput anchorEl={anchorEl} value={value} handleClear={handleClear} handleClick={handleClick} handleDelete={handleDelete} />
        <PopUpComponent tagsData={tagsData} open={popUpOpen} anchorEl={anchorEl} handleClose={handleClose} value={value} pendingValue={pendingValue} setPendingValue={setPendingValue} />
      </TagSearchProvider>
    </>
  );
}
