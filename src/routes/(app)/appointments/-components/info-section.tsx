import { LucideIcon } from "lucide-react";
import type React from "react";

interface InfoSectionProps {
	icon: LucideIcon;
	title: string;
	value: string;
	subtitle?: string;
	bgColor: string;
	iconColor: string;
}

export const InfoSection: React.FC<InfoSectionProps> = ({
	icon: IconComponent,
	title,
	value,
	subtitle,
	bgColor,
	iconColor,
}) => {
	return (
		<div className="flex items-center space-x-3">
			<div className={`p-2 ${bgColor} rounded-lg`}>
				<IconComponent className={`w-5 h-5 ${iconColor}`} />
			</div>
			<div>
				<p className="text-sm font-medium text-slate-700">{title}</p>
				<p className="text-slate-900">{value}</p>
				{subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
			</div>
		</div>
	);
};
