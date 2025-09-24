import type React from "react";

interface InfoCardProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
	title,
	children,
	className = "",
}) => {
	return (
		<div className={`p-4 bg-slate-50 rounded-lg ${className}`}>
			<p className="text-sm font-medium text-slate-700 mb-2">{title}</p>
			{children}
		</div>
	);
};
