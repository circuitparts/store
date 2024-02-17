import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, forwardRef, type ComponentPropsWithoutRef, type ElementRef, type HTMLAttributes } from "react";


const Dropdown = Listbox;

const DropdownContainer = forwardRef<ElementRef<"div">, HTMLAttributes<HTMLDivElement>>(
	({ children, className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("relative", className)}
			{...props}>
			{children}
		</div>
	)
);
DropdownContainer.displayName = "DropdownContainer";

const DropdownLabel = forwardRef<ElementRef<typeof Listbox.Label>, ComponentPropsWithoutRef<typeof Listbox.Label>>(
	({ className, ...props }, ref) => (
		<Listbox.Label
			ref={ref}
			className={cn("text-sm font-medium", className as string | undefined)}
			{...props}
		/>
	)
);
DropdownLabel.displayName = Listbox.Label.displayName;

const DropdownTrigger = forwardRef<ElementRef<typeof Listbox.Button>, ComponentPropsWithoutRef<typeof Listbox.Button>>(
	({ className, children, ...props }, ref) => (
		<Listbox.Button
			ref={ref}
			className={cn(
				"border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
				className as string | undefined
			)}
			{...props}>
			<span className="block truncate">{children as React.ReactNode}</span>
			<Icons.CaretSortIcon className="h-4 w-4 opacity-50" />
		</Listbox.Button>
	)
);
DropdownTrigger.displayName = Listbox.Button.displayName;

const DropdownContent = forwardRef<ElementRef<typeof Transition>, ComponentPropsWithoutRef<typeof Transition>>(
	({ ...props }, ref) => (
		<Transition
			ref={ref}
			as={Fragment}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			{...props}
		/>
	)
);
DropdownContent.displayName = Transition.displayName;

const DropdownOptions = forwardRef<
	ElementRef<typeof Listbox.Options>,
	ComponentPropsWithoutRef<typeof Listbox.Options>
>(({ className, ...props }, ref) => (
	<Listbox.Options
		ref={ref}
		className={cn(
			"bg-popover absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
			className as string | undefined
		)}
		{...props}
	/>
));
DropdownOptions.displayName = Listbox.Options.displayName;

const DropdownItem = forwardRef<ElementRef<typeof Listbox.Option>, ComponentPropsWithoutRef<typeof Listbox.Option>>(
	({ className, children, ...props }, ref) => (
		<Listbox.Option
			ref={ref}
			className={({ active }: { active: boolean }) =>
				cn(
					"relative cursor-default select-none py-1.5 pl-2 pr-4",
					active && "bg-gray-100",
					className as string | undefined
				)
			}
			{...props}>
			{({ selected }) => (
				<>
					{children}
					{selected ? (
						<span className="absolute inset-y-0 right-2 flex items-center pl-3">
							<Icons.CheckIcon className="h-4 w-4" />
						</span>
					) : null}
				</>
			)}
		</Listbox.Option>
	)
);
DropdownItem.displayName = Listbox.Option.displayName;

export { Dropdown, DropdownContainer, DropdownContent, DropdownItem, DropdownLabel, DropdownOptions, DropdownTrigger };
