import { useState } from "react";
import "./switcher.css"; // your CSS

const ThreeWayToggle = () => {
  const [value, setValue] = useState("-1"); // default selected: Pending

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="tw-toggle">
      <input
        type="radio"
        name="toggle"
        value="false"
        checked={value === "false"}
        onChange={handleChange}
      />
      <label className="toggle toggle-yes">not started</label>

      <input
        type="radio"
        name="toggle"
        value="-1"
        checked={value === "-1"}
        onChange={handleChange}
      />
      <label className="toggle toggle-yes">in progress</label>

      <input
        type="radio"
        name="toggle"
        value="true"
        checked={value === "true"}
        onChange={handleChange}
      />
      <label className="toggle toggle-yes">completed</label>

      <span></span>
    </div>
  );
};

export default ThreeWayToggle;
