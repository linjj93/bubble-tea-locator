import React from "react";
import FilterNumberOfShops from "./FilterNumberOfShops";
import FilterWaitingTime from "./FilterWaitingTime";
import "../styles/Filters.css";

function Filters(props) {
  return (
    <div className="advanced-filters">
      <FilterNumberOfShops
        limits={props.limits}
        selectLimit={props.selectLimit}
      />
      <FilterWaitingTime
        minutes={props.minutes}
        selectMinutes={props.selectMinutes}
      />
    </div>
  );
}

export default Filters;
