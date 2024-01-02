import { Avatar, Box, Chip, Typography } from "@mui/material";
import { useHorizontalScroll } from "../../customHooks/useHorizontalScroll";

export default function AvatarTagsCart({ noteTags }: { noteTags: string[] }) {
  const scrollRef = useHorizontalScroll();
  return (
    <Box className="flex items-center justify-evenly w-[100%] mt-3 h-[50px]">
      <Box className="w-[60px] flex items-center justify-start h-[100%]">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Box>
      <Box className="w-[3px] h-[100%] bg-[gray]"></Box>
      <Box className="w-[calc(100%-60px)] h-[100%] flex items-center justify-center">
        <Box className="h-[40px] w-[100%] flex flex-row items-center justify-start">
          <Typography className={`inline-block mx-2`}>Tags: </Typography>
          <Box ref={scrollRef} className={`relative overflow-scroll no-scrollbar h-[100%] flex flex-row items-center justify-start`}>
            {noteTags.map((ele) => {
              return <Chip className="mx-1 max-w-[120px]" label={ele} variant="outlined" />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
