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
      <label>
        waiting time of
        <select
          defaultValue="50"
          onChange={props.selectMinutes}
          name="time"
          id="time-limit-dropdown"
        >
          {options}
        </select>
        minutes or less
      </label>
    </div>
  );
}

export default FilterWaitingTime;
