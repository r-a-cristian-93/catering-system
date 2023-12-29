import { useEffect, useState } from "react";
import { User } from "../models/User.tsx";
import { RoleEnum } from "../models/User.tsx";
import getUserInfo from "../controllers/UserController.tsx";

function Navbar(): JSX.Element
{
	useEffect(() =>
	{
		void getUserInfo().then(user =>
		{
			setUser(user);
			setIsAdmin(user.role.name === RoleEnum.ADMIN);
		});

	}, []);

	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [user, setUser] = useState<User>({} as User)

	const thisPageAddress = document.location.pathname;
	const links = [
		{ text: "Acasa", href: "/home" },
		{ text: "Comenzi", href: "/comenzi" },
		{ text: "Retete", href: "/retete" },
		{ text: "Ingrediente", href: "/ingrediente" },
	];

	if (isAdmin)
		links.push({ text: "-ADMIN-", href: "/admin" });

	return (
		<div className="nav">
			<a
				href={user.name ? "/user" : "/login"}
				className="profile"
			>
				<img src="/img/profile.png" />
				{user.name || "Login"}
			</a>

			{links.map((link, index) =>
			{
				return (
					<a
						key={index}
						href={link.href}
						className={"nav-el" + (link.href === thisPageAddress ? " current-page" : "")}
					>
						{link.text}
					</a>
				);
			})}
		</div>
	);
}

export default Navbar;
