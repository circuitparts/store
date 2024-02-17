import { CartButton } from "@/components/header/cart-button";
import { CurrencySelector } from "@/components/header/currency/currency-selector";
import { LoginButton } from "@/components/header/login-button";
import { GuestMenu } from "@/components/header/menu/guest-menu";
import { UserMenu } from "@/components/header/menu/user-menu";

export function ActionBar(){
  return (
		<div className="flex flex-1 items-center justify-end space-x-4">
			<nav className="flex items-center space-x-2">
				<CurrencySelector />
				<UserMenu />
				<GuestMenu />
				<LoginButton />
				<CartButton />
			</nav>
		</div>
  );
}