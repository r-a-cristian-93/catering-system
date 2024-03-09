import { useState } from "react";
import { User } from "../../../models/User.tsx";
import { getUserInfo } from "../../../controllers/UserController.tsx";
import { useQuery } from "react-query";
import { QueryKeysUser } from "../../../QueryKeys/QueryKeysUser.tsx";
import css from "./Navbar.module.css"

type LinkDef = {
	text: string,
	href: string
}

type NavLinkProps = {
	link: LinkDef;
}

function NavLink(props: NavLinkProps): JSX.Element
{
	const { link: { href, text } } = props;

	return (
		<a href={href} className={css.nav_el + (href === window.location.pathname ? " " + css.active : "")}>
			{text}
		</a>
	);
}

export default function Navbar(): JSX.Element
{
	useQuery<User>({
		queryKey: QueryKeysUser.logedInUser,
		queryFn: () => getUserInfo(),
		onSuccess: (user) =>
		{
			setUser(user);
		}
	})

	const [ user, setUser ] = useState<User | null>(null);

	const links: LinkDef[] = [
		{ text: "Acasă", href: "/" },
		{ text: "Comenzi", href: "/comenzi" },
		{ text: "Rețete", href: "/retete" },
		{ text: "Ingrediente", href: "/ingrediente" },
	];

	return (
		<nav className={css.nav}>
			<a href={user?.name ? "/user" : "/login"} className={css.profile}>
				<img src="/img/profile.png" />
				{user?.name || "Login"}
			</a>
			{
				links.map((link, index) => <NavLink key={index} link={link} />)
			}
		</nav>
	);
}
