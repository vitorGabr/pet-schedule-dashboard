import type { AnyFieldApi } from "@tanstack/react-form";
import type { SelectHTMLAttributes } from "react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/cn";
import { FormErrorMessage } from "../form-error-message";

type Props = {
	label?: string;
	field?: AnyFieldApi;
	placeholder?: string;
	options: { label: string; value: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ className, label, field, ...props }: Props) {
	const errorMessage = field?.state.meta?.errors
		.map((err) => err?.message)
		.join(",");
	const name = field?.name ?? props.name;
	const value = field?.state.value ?? props.value;

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
			<Select
				value={value}
				onValueChange={(value) => field?.handleChange?.(value)}
			>
				<SelectTrigger>
					<SelectValue
						placeholder={props.placeholder}
						onBlur={field?.handleBlur}
					/>
				</SelectTrigger>
				<SelectContent>
					{props.options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<FormErrorMessage error={errorMessage} />
		</div>
	);
}
