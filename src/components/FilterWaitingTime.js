import React from "react";

function FilterWaitingTime(props) {
  const options = props.minutes.map(num => {
    return (
      <option key={num} value={num}>
        {num}
      </option>
    );
  });
  return (
    <div className="select-time">
      <select
        defaultValue="50"
        onChange={props.onChange}
        name="time"
        id="time-limit-dropdown"
      >
        {options}
      </select>
      minutes or less
    </div>
  );
}

export default FilterWaitingTime;
