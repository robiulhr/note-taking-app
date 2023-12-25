import { Box, CircularProgress } from "@mui/material";

interface FullPageLoadingPropsType {
  className: string;
}
export function FullPageLoading({ className }: FullPageLoadingPropsType) {
  return (
    <Box className={`flex items-center justify-center h-[100%] w-[100%] ${className}`}>
      <CircularProgress color="secondary" />
    </Box>
  );
}
