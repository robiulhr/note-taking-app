import { Box, Button, Paper } from "@mui/material";
import SomethingWentWrong from "../assets/500.svg";

type ErrorFalbackPropsType = {
  error: string;
  resetErrorBoundary: () => void; // Change to void if not returning a ReactNode
};

const ErrorFallback: React.FC<ErrorFalbackPropsType> = ({ error, resetErrorBoundary }: ErrorFalbackPropsType) => {
  console.log(error, "this is the error");
  return (
    <Box component={Paper} className="py-10 h-[100%] w-[100%] m-[0px auto] flex items-center justify-center flex-col">
      <object className="min-h-[450px] m-[0px auto] w-auto max-w-[560px] flex items-center justify-center flex-col" type="image/svg+xml" data={SomethingWentWrong}></object>
      <h1 className="">
        Woops! <br />
        Something went wrong :(
      </h1>
      <Button onClick={resetErrorBoundary} variant="contained">
        Back to Home
      </Button>
    </Box>
  );
};

export default ErrorFallback;
