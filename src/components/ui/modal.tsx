"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

interface ModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

interface ModalContentProps {
	children: React.ReactNode;
	className?: string;
}

interface ModalHeaderProps {
	children: React.ReactNode;
	className?: string;
}

interface ModalTitleProps {
	children: React.ReactNode;
	className?: string;
}

interface ModalDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

interface ModalCloseProps {
	children: React.ReactNode;
	className?: string;
}

const Modal = ({ open, onOpenChange, children, className }: ModalProps) => {
	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [open]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onOpenChange(false);
				}
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					onOpenChange(false);
				}
			}}
			role="dialog"
			tabIndex={-1}
		>
			<div className="fixed inset-0 bg-black/50" />
			<div className={cn("relative z-50", className)}>{children}</div>
		</div>
	);
};

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
	({ children, className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"bg-background border border-border rounded-lg shadow-lg max-h-[90vh] overflow-y-auto",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	),
);
ModalContent.displayName = "ModalContent";

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
	({ children, className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("flex items-center justify-between p-6 border-b border-border", className)}
			{...props}
		>
			{children}
		</div>
	),
);
ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
	({ children, className, ...props }, ref) => (
		<h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
			{children}
		</h2>
	),
);
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
	({ children, className, ...props }, ref) => (
		<p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
			{children}
		</p>
	),
);
ModalDescription.displayName = "ModalDescription";

const ModalClose = React.forwardRef<
	HTMLButtonElement,
	ModalCloseProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			"rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
			className,
		)}
		{...props}
	>
		{children}
		<span className="sr-only">Close</span>
	</button>
));
ModalClose.displayName = "ModalClose";

export { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalClose };
