import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext, useEffect, useState } from "react";
import { tagType } from "../../types/types";
import { Button, TextField, Typography } from "@mui/material";
import { TagSearchContext } from "../../context/tagSearchProvider";
import ColorPicker from "../input/colorPicker";
import IconPicker from "../input/iconPicker";
import { ERROR_MESSAGES } from "../../contents/errorMessages";
import { toast } from "react-toastify";
import { wait } from "../../utils/utils";
import { SUCCESS_MESSAGES } from "../../contents/successMessages";
import createTag from "../../apiActions/tag/createTag";
type TagFormModalPropsType = {
  showTagForm: boolean;
  tagFormCloseHandler: () => void;
  btnText: string;
  tagData?: tagType;
  tagTitle?: string;
  actionType: "create" | "edit";
};

export default function TagFormModal({ actionType, showTagForm, tagFormCloseHandler, tagData, btnText }: TagFormModalPropsType) {
  const [tagTitleValue, setTagTitleValue] = useState("");
  const [tagTitleError, setTagTitleError] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tagDescriptionError, setTagDescriptionError] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagColorError, setTagColorError] = useState("");
  const [tagIcon, setTagIcon] = useState("");
  const [tagIconError, setTagIconError] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchValue } = useContext(TagSearchContext);

  const handleColorChange = function (color) {
    setTagColor(color.hex);
  };
  function resetTagErrors() {
    setTagTitleError("");
    setTagDescriptionError("");
    setTagIconError("");
    setTagColorError("");
  }
  function resetTagValues() {
    setTagTitleValue(searchValue || "");
    setTagDescription("");
    setTagColor("");
    setTagIcon("");
  }
  function setErrors() {
    if (!tagTitleValue && !tagDescription.length && !tagIcon && !tagColor) {
      setTagTitleError(ERROR_MESSAGES.TAG_TITLE_ERROR);
      setTagDescriptionError(ERROR_MESSAGES.TAG_DESCRIPTION_ERROR);
      setTagColorError(ERROR_MESSAGES.TAG_COLOR_ERROR);
      setTagIconError(ERROR_MESSAGES.TAG_ICON_ERROR);
      toast.error(ERROR_MESSAGES.NOTE_DATA_ERROR);
      return true;
    } else if (!tagTitleValue) {
      toast.error(ERROR_MESSAGES.TAG_TITLE_ERROR);
      setTagTitleError(ERROR_MESSAGES.TAG_TITLE_ERROR);
      return true;
    } else if (!tagDescription) {
      toast.error(ERROR_MESSAGES.TAG_DESCRIPTION_ERROR);
      setTagDescriptionError(ERROR_MESSAGES.TAG_DESCRIPTION_ERROR);
      return true;
    } else if (!tagColor) {
      toast.error(ERROR_MESSAGES.TAG_COLOR_ERROR);
      setTagColorError(ERROR_MESSAGES.TAG_COLOR_ERROR);
      return true;
    } else if (!tagIcon) {
      toast.error(ERROR_MESSAGES.TAG_ICON_ERROR);
      setTagIconError(ERROR_MESSAGES.TAG_ICON_ERROR);
      return true;
    }
    return false;
  }

  async function handleCommonThings() {
    resetTagErrors();
    // set errors
    const anyError = setErrors();
    if (anyError) return false;
    // start loading
    setLoading(true);
    // wait is for test purpose
    await wait(2000);
    return true;
  }

  async function createNewTag() {
    const formData = { name: tagTitleValue, description: tagDescription, icon: tagIcon, color: tagColor };
    const response = await createTag(formData);
    // stop loading
    setLoading(false);
    resetTagErrors();
    if (!response) return;
    toast.success(SUCCESS_MESSAGES.TAG_CREATED);
    resetTagValues();
  }

  async function formSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    const alRight = await handleCommonThings();
    if (!alRight) return;
    actionType === "create" && (await createNewTag());
    modalCloseHandler();
  }
  function modalCloseHandler() {
    resetTagErrors();
    resetTagValues();
    tagFormCloseHandler();
  }
  useEffect(() => {
    if (actionType === "edit" && tagData) {
      setTagTitleValue(tagData.name);
      setTagDescription(tagData.description);
      setTagColor(tagData.color);
      setTagIcon(tagData.icon);
    } else if (searchValue) {
      setTagTitleValue(searchValue);
    }
  }, [searchValue]);

  return (
    <Modal open={showTagForm} onClose={modalCloseHandler} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "500px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        bgcolor={"background.paper"}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ margin: "20px 0px", textAlign: "start" }}>
              {btnText}
            </Typography>
            <Button sx={{ minWidth: "20px", height: "20px" }} onClick={modalCloseHandler}>
              X
            </Button>
          </Box>
          <TextField
            fullWidth
            error={tagTitleError ? true : false}
            onChange={(e) => {
              setTagTitleValue(e.target.value);
            }}
            value={tagTitleValue}
            sx={{ margin: "20px 40px" }}
            id="filled-basic"
            label="Tag Title"
            variant="filled"
          />
          <TextField
            fullWidth
            error={tagDescriptionError ? true : false}
            onChange={(e) => {
              setTagDescription(e.target.value);
            }}
            value={tagDescription}
            sx={{ margin: "20px 40px" }}
            id="filled-basic"
            label="Tag Description"
            variant="filled"
          />
          <Box sx={{ display: "flex", flexDirection: "row", margin: "20px 0", width: "100%" }}>
            <Box sx={{ border: `1px solid ${tagColorError ? "red" : "rgba(0,0,0,.2)"}`, padding: "0px 10px", borderRadius: "10px", marginRight: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "50%" }}>
              <Typography className="pb-2" style={{ color: tagColorError ? "red" : "" }}>
                Color
              </Typography>
              <ColorPicker handleColorChange={handleColorChange} color={tagColor} />
            </Box>
            <Box width={{ width: "50%", marginLeft: "10px" }}>
              <IconPicker selectedIcon={tagIcon} setSelectedIcon={setTagIcon} tagIconError={tagIconError} />
            </Box>
          </Box>
          <LoadingButton sx={{ margin: "20px" }} onClick={formSubmitHandler} loading={loading} variant="contained" className="mt-5">
            {btnText}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
