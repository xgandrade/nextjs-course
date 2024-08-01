import { GamepadIcon, HomeIcon, MedalIcon, RouteIcon, UserIcon } from "@/components";

const NavbarList = ({ children, className }) => {
    return (
        <ul className={`my-4 border-t border-indigo-400/20 hover:border-indigo-400/40 ${className}`}>{children}</ul>
    )
};

const NavbarListItem = ({ children, className }) => {
    return (
        <li className={`my-2 rounderd-1g bg-transparent p-2 hover:bg-indigo-400/40 hover:text-indigo-500 cursor-pointer flex gap-2 items-center ${className}`}>{children}</li>
    )
};

export const Navbar = () => {
    return (
        <nav className="flex h-screen flex-col bg-slate-900 border-r border-indigo-400/40 hover:border-indigo-400/80 w-72 p-2 text-slate-300">
            <div className="flex items-center justify-center my-4">
                <img src="https://1000marcas.net/wp-content/uploads/2019/12/Heineken-Logo.png"
                    alt="Logo coringao"
                    className="w-auto h-17 p-2" />
            </div>
            <NavbarList className={"flex-grow"}>
                <NavbarListItem>
                    <HomeIcon className="w-4 h-4" />Home
                </NavbarListItem>
                <NavbarListItem>
                    <GamepadIcon className="w-4 h-4" />Games
                </NavbarListItem>
                <NavbarListItem>
                    <MedalIcon className="w-4 h-4" />Top 10
                </NavbarListItem>
                <NavbarListItem>
                    <RouteIcon className="w-4 h-4" />Walkthrough
                </NavbarListItem>
            </NavbarList>
            <NavbarList>
                <NavbarListItem>
                    <UserIcon className="w-4 h-4" />User
                </NavbarListItem>
            </NavbarList>
        </nav>
    )
}