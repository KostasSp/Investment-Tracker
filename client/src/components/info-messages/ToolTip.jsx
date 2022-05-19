import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

const ToolTip = (props) => {
  return (
    <div>
      {" "}
      <Tooltip title={props.message}>
        <InfoIcon className="info-icon" />
      </Tooltip>
    </div>
  );
};

export default ToolTip;
