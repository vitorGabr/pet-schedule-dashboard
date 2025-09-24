export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number,
	immediate: boolean = false,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return function (this: any, ...args: Parameters<T>) {
		const later = () => {
			timeout = undefined;
			if (!immediate) func.apply(this, args);
		};

		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, delay);

		if (callNow) func.apply(this, args);
	};
}
