import css from "./Navbar.module.css"
import { useGetUserQuery } from "./userSlice.tsx";

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
	const {data: user} = useGetUserQuery();

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
