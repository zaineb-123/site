import "./StatusToggle.css";

const StatusToggle = ({
  value = 1,
  onChange,
  disabled = false,
  variant = "default",
  className = "",
  size = "md",
  showTooltip = true,
}) => {
  const options = [
    {
      value: 1,
      tooltip: "Not Started",
      icon: (
        <svg width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      ),
    },
    {
      value: 2,
      tooltip: "In Progress",
      icon: (
        <svg width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M7.5 8V4.5a.5.5 0 0 1 1 0V8h3.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
        </svg>
      ),
    },
    {
      value: 3,
      tooltip: "Completed",
      icon: (
        <svg width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      ),
    },
  ];

  const getActiveColor = (val) => {
    switch (val) {
      case 1:
        return { background: "var(--primary-medium)", color: "var(--surface)" };
      case 2:
        return { background: "#FFBF00", color: "var(--surface)" };
      case 3:
        return { background: "var(--success)", color: "#0c7328" };
      default:
        return {};
    }
  };

  const handleClick = (newValue) => {
    if (!disabled && onChange) {
      onChange(newValue);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "status-toggle-sm";
      case "lg":
        return "status-toggle-lg";
      default:
        return "status-toggle-md";
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "pill":
        return "status-toggle-pill";
      case "minimal":
        return "status-toggle-minimal";
      case "outline":
        return "status-toggle-outline";
      default:
        return "";
    }
  };

  return (
    <div
      className={`status-toggle ${getSizeClass()} ${getVariantClass()} ${className}`}
      role="radiogroup"
      aria-label="Status selector"
    >
      <div className="status-toggle-container">
        {options.map((option) => {
          const isActive = value === option.value;
          const activeStyle = isActive ? getActiveColor(option.value) : {};

          return (
            <button
              key={option.value}
              type="button"
              className={`status-option ${isActive ? "status-option-active" : ""} ${disabled ? "status-option-disabled" : ""}`}
              onClick={() => handleClick(option.value)}
              disabled={disabled}
              aria-checked={isActive}
              aria-label={option.tooltip}
              title={showTooltip ? option.tooltip : ""}
              style={activeStyle}
            >
              <span className="status-icon">
                {option.icon}
                {isActive && variant !== "minimal" && (
                  <span className="status-pulse"></span>
                )}
              </span>
              {isActive && variant !== "minimal" && (
                <span className="status-indicator"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusToggle;