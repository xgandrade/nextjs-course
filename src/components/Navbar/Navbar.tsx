import { GamepadIcon, HomeIcon, MedalIcon, RouteIcon, UserIcon } from "@/components";
import { cn } from "@/helpers/cn";
import { NavbarList } from "./NavbarList";
import { NavbarListItemLink } from "./NavbarListItemLink";
import { NavbarProps } from "./types";

export const Navbar = ({ className, ...props }: NavbarProps) => {
    return (
        <nav className={cn("flex h-screen flex-col bg-slate-900 border-r border-indigo-400/40 hover:border-indigo-400/80 w-72 p-2 text-slate-300", className)} {...props}>
            <div className="flex items-center justify-center my-4">
                <img src="https://1000marcas.net/wp-content/uploads/2019/12/Heineken-Logo.png"
                    alt="Logo coringao"
                    className="w-auto h-17 p-2" />
            </div>
            <NavbarList className={"flex-grow"}>
                <NavbarListItemLink href={"/"}>
                    <HomeIcon className="w-4 h-4" />Home
                </NavbarListItemLink>
                <NavbarListItemLink href={"/games"}>
                    <GamepadIcon className="w-4 h-4" />Games
                </NavbarListItemLink>
                <NavbarListItemLink href={"/top10"}>
                    <MedalIcon className="w-4 h-4" />Top 10
                </NavbarListItemLink>
                <NavbarListItemLink href={"/walkthrough"}>
                    <RouteIcon className="w-4 h-4" />Walkthrough
                </NavbarListItemLink>
            </NavbarList>
            <NavbarList>
                <NavbarListItemLink href={"/user"}>
                    <UserIcon className="w-4 h-4" />User
                </NavbarListItemLink>
            </NavbarList>
        </nav>
    )
}