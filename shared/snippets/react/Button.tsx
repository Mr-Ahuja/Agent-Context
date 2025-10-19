import React from "react";
import "./styles.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "primary" };
export const Button: React.FC<ButtonProps> = ({ variant = "default", className = "", children, ...rest }) => {
  const cls = ["btn", variant === "primary" ? "primary" : "", className].filter(Boolean).join(" ");
  return <button className={cls} {...rest}>{children}</button>;
};

