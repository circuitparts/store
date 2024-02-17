export function Container({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 min-h-screen mt-6">{children}</div>
		</main>
	);
}
