import type { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "@/utils/cn";

type Props = React.ComponentProps<"p"> & {
	error?: string | undefined;
	meta?: AnyFieldApi["state"]["meta"];
};

export function FormErrorMessage({ className, error, meta, ...props }: Props) {
	const body = error ? String(error ?? "") : meta?.errors.join(", ");

	if (!body) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			className={cn(
				"text-destructive text-sm first-letter:capitalize",
				className,
			)}
			{...props}
		>
			{body}
		</p>
	);
}
