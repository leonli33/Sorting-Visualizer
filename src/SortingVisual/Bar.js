import React, { Component } from "react";
import "./Bar.css";

export default class Bar extends Component {
  render() {
    const {
      size,
      isDoneBeingSorted,
      isBeingCompared,
      isCurrentlyInCorrectOrder,
      index,
      showSize,
    } = this.props;

    let extraClassName = "";
    if (isDoneBeingSorted) {
      extraClassName = "doneElement";
    } else if (isBeingCompared) {
      extraClassName = "comparedElement";
    } else if (isCurrentlyInCorrectOrder) {
    }
    return (
      <div className={`bar ${extraClassName}`} id={`Bar-${index}`}>
        <text className={`${showSize ? "size-text" : "hide-size"}`}>
          {size}
        </text>
      </div>
    );
  }
}
