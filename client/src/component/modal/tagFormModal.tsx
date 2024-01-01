import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext, useEffect, useState } from "react";
import { tagType } from "../../types/types";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { TagSearchContext } from "../../context/tagSearchProvider";
import ColorPicker from "../input/colorPicker";
import IconPicker from "../input/iconPicker";
type TagFormModalPropsType = {
  showTagForm: boolean;
  tagFormCloseHandler: () => void;
  btnText: string;
  tagData?: tagType;
  tagTitle?: string;
  actionType: "create" | "edit";
};

export default function TagFormModal({ actionType, showTagForm, tagFormCloseHandler, tagData, tagTitle, btnText }: TagFormModalPropsType) {
  const { searchValue } = useContext(TagSearchContext);
  const [tagTitleValue, setTagTitleValue] = useState(searchValue);
  const [tagDescription, setTagDescription] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  if (actionType === "edit" && tagData) {
    setTagTitleValue(tagData.name);
    setTagDescription(tagData.description);
    setTagColor(tagData.color);
  } else if (tagTitle) setTagTitleValue(tagTitle);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(tagTitleValue, "tagTitleValue");
  }, [tagTitleValue, searchValue]);
  return (
    <Modal open={showTagForm} onClose={tagFormCloseHandler} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
            <Typography sx={{ margin: "20px 0px", textAlign: "start" }}>{btnText}</Typography>
            <Button sx={{ minWidth: "20px", height: "20px" }} onClick={tagFormCloseHandler}>
              X
            </Button>
          </Box>
          <TextField fullWidth value={tagTitle} sx={{ margin: "20px 40px" }} id="filled-basic" label="Tag Title" variant="filled" />
          <TextField fullWidth value={tagDescription} sx={{ margin: "20px 40px" }} id="filled-basic" label="Tag Description" variant="filled" />
          <Box sx={{ display: "flex", flexDirection: "row", margin: "20px 0", width: "100%" }}>
            <Box sx={{ border: "1px solid rgba(0,0,0,.2)", padding: "0px 10px", borderRadius: "10px", marginRight: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "50%" }}>
              <Typography className="pb-2">Color</Typography>
              <ColorPicker />
            </Box>
            <Box width={{ width: "50%", marginLeft: "10px" }}>
              <IconPicker selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
            </Box>
          </Box>
          <LoadingButton sx={{ margin: "20px" }} loading={loading} variant="contained" className="mt-5">
            {btnText}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
