import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

type User = {
	username: string;
	name: string;
	role: {
		name: string;
	}
}


async function requestUserInfo(): Promise<User>
{
	const response = await fetch(VITE_API_URL + "/employees/myinfo", {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const json = response.json();
	const user: Promise<User> = json.then(json => 
	{
		console.log(json);

		const user: User = {} as User;

		Object.assign(user, json);

		return user;
	});

	return user;
}

function Navbar(): JSX.Element
{
	const currentAddress = document.location.pathname;

	useEffect(() => 
	{
		void requestUserInfo().then(user => 
		{
			setFullname(user.name);
			setIsAdmin(user.role.name === "admin");
		});

	}, []);

	const [fullname, setFullname] = useState<string>("Login");
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
			<a href="user" className="profile">
				<img src="/img/profile.png" />
				{fullname}
			</a>

			{links.map((link, index) => 
			{
				return (
					<a
						key={index}
						href={link.href}
						className={
							"nav-el" +
							(link.href === currentAddress ? " current-page" : "")
						}
					>
						{link.text}
					</a>
				);
			})}
		</div>
	);
}

export default Navbar;
