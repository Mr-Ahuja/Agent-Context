import React from "react";
import "./styles.css";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", children, ...rest }) => {
  return <div className={["card", className].filter(Boolean).join(" ")} {...rest}>{children}</div>;
};

