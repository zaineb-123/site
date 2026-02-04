import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  icon,
  iconPosition = "left",
  onClick,
  title="",
  type = "button",
  className = "",
}) => {
  return (
    <button
    title={title}
      type={type}
      className={`btn btn-${variant}${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && children && iconPosition === "left" && (
        <span className="btn__icon btn__icon--left">{icon}</span>
      )}

      {children && <span className="btn__content">{children}</span>}

      {icon && children && iconPosition === "right" && (
        <span className="btn__icon btn__icon--right">{icon}</span>
      )}

      {icon && !children && (
        <span className="btn__icon btn__icon--only">{icon}</span>
      )}
    </button>
  );
};

export default Button;
