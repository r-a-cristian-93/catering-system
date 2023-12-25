function Navbar(): JSX.Element
{
	const currentAddress = document.location.pathname;
	console.log(currentAddress);

	const links = [
		{ text: "Acasa", href: "/home" },
		{ text: "Comenzi", href: "/comenzi" },
		{ text: "Retete", href: "/retete" },
		{ text: "Ingrediente", href: "/ingrediente" },
		{ text: "-ADMIN-", href: "/admin" },
	];

	return (
		<div className="nav">
			<a href="user" className="profile">
				<img src="/img/profile.png" />
				USERNAME HERE
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
