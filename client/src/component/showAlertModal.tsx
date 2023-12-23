import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { wait } from "../utils/utils";

type ShowAlertModalPropsType = {
  alertTitle: string;
  alertDescription: string;
  showAlert: boolean;
  alertCloseHandler: () => void;
  doAction: () => void;
  btnText: string;
};

export default function ShowAlertModal({ alertTitle, alertDescription, showAlert, alertCloseHandler, doAction, btnText }: ShowAlertModalPropsType) {
  const [loading, setLoading] = useState(false);
  async function runActionHandler() {
    setLoading(true);
    await wait(2000);
    doAction();
    setLoading(false);
    alertCloseHandler();
  }
  return (
    <Modal open={showAlert} onClose={alertCloseHandler} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "500px",
          height: "400px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        bgcolor={"background.paper"}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {alertTitle}
        </Typography>
        <Typography id="modal-modal-description" sx={{ marginTop: "10px", marginBottom: "10px" }}>
          {alertDescription}
        </Typography>
        <LoadingButton loading={loading} onClick={runActionHandler} variant="contained" className="mt-5">
          {btnText}
        </LoadingButton>
      </Box>
    </Modal>
  );
}
