import { Box, Chip, Typography } from "@mui/material";
import { useHorizontalScroll } from "../../customHooks/useHorizontalScroll";

export default function TagsCart({ noteTags }: { noteTags: string[] }) {
  const scrollRef = useHorizontalScroll();
  return (
    <Box className="h-[40px] mt-4 w-[100%] flex flex-row items-center justify-start">
      <Typography className={`inline-block mx-2`}>Tags: </Typography>
      <Box ref={scrollRef} className={`relative overflow-scroll no-scrollbar h-[100%] flex flex-row items-center justify-start`}>
        {noteTags.map((ele) => {
          return <Chip className="mx-1 max-w-[120px]" label={ele} variant="outlined" />;
        })}
      </Box>
    </Box>
  );
}
