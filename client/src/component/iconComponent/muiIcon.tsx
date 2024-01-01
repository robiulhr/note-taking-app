import { SvgIcon } from "@mui/material";
import CustomIconify from "./customIconify";
export default function MuiIcon(props) {
  const { icon, defaultIcon, ...rest } = props;
  return (
    <SvgIcon {...rest}>
      <CustomIconify icon={icon} defaultIcon={defaultIcon} />
    </SvgIcon>
  );
}
