import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

type ShowAlertModalPropsType = {
  alertTitle: string;
  alertDescription: string;
  showAlert: boolean;
  alertCloseHandler: () => void;
  doAction: () => void;
  btnText: string;
};

export default function ShowAlertModal({ alertTitle, alertDescription, showAlert, alertCloseHandler, doAction, btnText }: ShowAlertModalPropsType) {
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
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {alertDescription}
        </Typography>
        <Button variant="contained" sx={{ marginTop: "10px", width: "40px" }} onClick={doAction}>
          {btnText}
        </Button>
      </Box>
    </Modal>
  );
}
