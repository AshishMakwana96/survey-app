import React from "react";
function Button({ text, onClick, disabled, color, textColor }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-6 py-2 font-bold ${color} ${textColor} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </button>
  );
}

export default Button;
