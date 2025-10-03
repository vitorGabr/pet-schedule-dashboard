import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { FormErrorMessage } from "../form-error-message";

type Props = {
	label?: string;
	field?: AnyFieldApi;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ className, label, field, ...props }: Props) {
	const errorMessage = field?.state.meta?.errors
		.map((err) => err?.message)
		.join(",");
	const name = field?.name ?? props.name;

	return (
		<div className="space-y-2">
			<Label
				data-slot="form-label"
				data-error={!!errorMessage}
				className={cn("data-[error=true]:text-destructive", className)}
				htmlFor={name}
			>
				{label}
			</Label>
			<Input
				aria-invalid={!!errorMessage}
				name={name}
				value={field?.state.value}
				onBlur={field?.handleBlur}
				onChange={(e) => {
					if (props.type === "number") {
						field?.handleChange?.(e.target.valueAsNumber);
					} else {
						field?.handleChange?.(e.target.value);
					}
				}}
				{...props}
			/>
			<FormErrorMessage error={errorMessage} />
		</div>
	);
}
