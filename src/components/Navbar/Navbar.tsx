import { GamepadIcon, HomeIcon, MedalIcon, RouteIcon, UserIcon } from "@/components";
import { cn } from "@/helpers/cn";
import Image from "next/image";
import { NavbarList } from "./NavbarList";
import { NavbarListItemLink } from "./NavbarListItemLink";
import { NavbarProps } from "./types";

export const Navbar = ({ className, user, ...props }: NavbarProps) => {
    return (
        <nav
            className={cn("fixed top-0 left-0 flex h-screen flex-col bg-slate-900 border-r border-indigo-400/40 hover:border-indigo-400/80 w-72 p-2 text-slate-300", className)} {...props}>
            <div className="flex items-center justify-center my-4">
                <Image
                    src={process.env.LOGO_GUI_GAMES!}
                    alt="Logo coringao"
                    className="w-auto h-64"
                    height={512}
                    width={512}
                />
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
                {user ? (
                    <NavbarListItemLink href={"/user"}>
                        <UserIcon className="w-4 h-4" /> {user.name}
                    </NavbarListItemLink>
                ) :
                    <NavbarListItemLink href={"/auth/sign-in"}>
                        <UserIcon className="w-4 h-4" /> LogIn
                    </NavbarListItemLink>}
            </NavbarList>
        </nav>
    )
}