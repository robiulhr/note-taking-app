"use strict";

import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: "255",
      g: "255",
      b: "255",
      a: "1",
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.props.handleColorChange(color);
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          border: "1px solid rgba(0,0,0,.2)",
          background: this.props.color ? this.props.color : `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: "10px",
          background: "#fff",
          borderRadius: "10px",
          // boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
          {this.state.displayColorPicker ? <ArrowDropUpIcon sx={{ marginLeft: "5px", marginRight: "-15px" }} /> : <ArrowDropDownIcon sx={{ marginLeft: "5px", marginRight: "-15px" }} />}
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPicker;
