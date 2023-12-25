import { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import { labels } from "./demoData";
import PopUpComponent from "./popUpComponent";
import TagsMainInput from "./tagsMainInput";

/**
 *
 * Todo
 * 1. when any of the child update the value which is provided from the parent by props drilling both parent and child get rerendered. (is there any solution to solve this?)
 * 2. when one tag get's selected the list of the popup gets navigated to the top (reason: may the component get's rerendered that's why this things happens.)
 */

export default function TagFilter() {
  const anchorEl = useRef<HTMLElement>(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [value, setValue] = useState([labels[1], labels[11]]);
  const [pendingValue, setPendingValue] = useState(value);
  console.log("index page rerendered.");
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

  return (
    <>
      <TagsMainInput anchorEl={anchorEl} value={value} handleClear={handleClear} handleClick={handleClick} handleDelete={handleDelete} />
      <PopUpComponent open={popUpOpen} anchorEl={anchorEl} handleClose={handleClose} value={value} pendingValue={pendingValue} setPendingValue={setPendingValue} />
    </>
  );
}
