import { LucideIcon } from "lucide-react";
import type React from "react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant: "success" | "danger" | "warning" | "neutral";
  className?: string;
}

const variantStyles = {
  success: "bg-green-50 border-green-200 hover:bg-green-100 text-green-700",
  danger: "bg-red-50 border-red-200 hover:bg-red-100 text-red-700",
  warning: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-700",
  neutral: "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700",
};

const iconColors = {
  success: "text-green-600",
  danger: "text-red-600",
  warning: "text-yellow-600",
  neutral: "text-gray-600",
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon: IconComponent,
  label,
  onClick,
  variant,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col justify-center items-center p-3 border rounded-lg transition-colors duration-200 ${variantStyles[variant]} ${className}`}
    >
      <IconComponent className={`w-5 h-5 mb-1 ${iconColors[variant]}`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};
