import { HelpPopover } from "@/components/ui/help-popover";

export function BackorderedComponentsTip() {
	return (
		<HelpPopover>
			<p className="my-2">
				Ocsasionally some components may not be available in-stock at the time of your order. In such cases, we
				will place those components under back-ordered items and notify you by email of the expected delivery
				date as soon as it is confirmed by the supplier. We will dispatch all back-ordered items at once when
				they arrive in stock. However, if you prefer each item to be dispatched as soon as it is available,
				please get in touch with us.
			</p>
		</HelpPopover>
	);
}
