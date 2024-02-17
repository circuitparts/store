export type Unwrap<T> = {
	[K in keyof T]: T[K];
} & object;
