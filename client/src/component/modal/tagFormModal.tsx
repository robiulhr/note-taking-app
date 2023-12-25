import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { tagType } from "../../types/types";
import { TextField, Typography } from "@mui/material";
type TagFormModalPropsType = {
  showTagForm: boolean;
  tagFormCloseHandler: () => void;
  btnText: string;
  tagData?: tagType;
  tagTitle?: string;
  actionType: "create" | "edit";
};

export default function TagFormModal({ actionType, showTagForm, tagFormCloseHandler, tagData, tagTitle, btnText }: TagFormModalPropsType) {
  const [tagTitleValue, setTagTitleValue] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tagColor, setTagColor] = useState("");
  if (actionType === "edit" && tagData) {
    setTagTitleValue(tagData.name);
    setTagDescription(tagData.description);
    setTagColor(tagData.color);
  } else if (tagTitle) setTagTitleValue(tagTitle);
  const [loading, setLoading] = useState(false);
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
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography sx={{ margin: "20px", textAlign: "start" }}>{btnText}</Typography>
          <TextField sx={{ margin: "20px" }} id="filled-basic" label="Tag Title" variant="filled" />
          <TextField sx={{ margin: "20px" }} id="filled-basic" label="Tag Description" variant="filled" />
          <Box sx={{ display: "flex", flexDirection: "row", margin: "10px" }}>
            <TextField sx={{ margin: "10px" }} id="filled-basic" label="Tag icon" variant="filled" />
            <TextField sx={{ margin: "10px" }} id="filled-basic" label="Tag icon color" variant="filled" />
          </Box>
          <LoadingButton sx={{ margin: "20px" }} loading={loading} variant="contained" className="mt-5">
            {btnText}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
}
