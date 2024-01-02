import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { MouseEvent, MouseEventHandler, RefObject } from "react";
import { tagType } from "../../../types/types";
type TagsMainInputPropsType = {
  anchorEl: RefObject<HTMLElement>;
  value: tagType[];
  handleClear: MouseEventHandler<HTMLButtonElement>;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  handleDelete: (event: MouseEvent<SVGElement>, index: number) => void;
};
export default function TagsMainInput({ anchorEl, value, handleClear, handleClick, handleDelete }: TagsMainInputPropsType) {
  return (
    <Box ref={anchorEl} className="h-[60px] w-[300px] text-[13px]">
      <Box className="w-[100%] rounded-sm bg-white p-1 flex items-center h-[100%] justify-between flex-row">
        <Box className="w-[250px] grid grid-cols-2 gap-1 h-[100%] overflow-scroll overflow-x-hidden">
          {value.length <= 0 ? (
            <Typography className="w-[100%] h-[50px] flex items-center p-2 text-start">Filter by Tags</Typography>
          ) : (
            value.map((option, index) => (
              <Box
                key={index}
                sx={{
                  "& span": { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" },
                  "& svg": { fontSize: "20px", cursor: "pointer", padding: "4px" },
                }}
                className="flex justify-between max-w-[100px] truncate items-center h-[24px] m-[2px] leading-3 bg-[#fafafa] border-1 rounded-sm box-content p-[0 4px 0 10px] outline-0 overflow-hidden"
              >
                <span>{option.name}</span>
                <CloseIcon
                  onClick={(e) => {
                    handleDelete(e, index);
                  }}
                />
              </Box>
            ))
          )}
        </Box>
        <Box className={`h-[100%] w-[50px] flex flex-row items-center justify-center`}>
          <Button className="text-2xl h-[50%] min-w-[20px] min-h-[20px]" onClick={handleClick}>
            +
          </Button>
          {value.length > 0 && (
            <Button className="text-md font-semibold h-[50%] min-w-[20px] min-h-[20px]" onClick={handleClear}>
              x
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
