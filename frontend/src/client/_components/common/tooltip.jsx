import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "font-awesome/css/font-awesome.css";
import React from "react";

const TooltipComponent = (props) => {
  const renderTooltip = (props) => <Tooltip>{props.text}</Tooltip>;

  return (
    <div>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip(props)}
      >
        <i className="fa fa-info-circle info"></i>
      </OverlayTrigger>
    </div>
  );
};

export default TooltipComponent;
