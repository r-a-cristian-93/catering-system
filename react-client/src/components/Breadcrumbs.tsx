import { useLocation } from "react-router-dom";

export default function Breadcrumbs(): JSX.Element
{
	const location = useLocation();

	// Extracting the path segments
	const pathSegments: string[] = location.pathname.split('/').filter(segment => segment !== '');

	// Building the navigation link structure
	const navigationLinks: JSX.Element[] = [];

	navigationLinks.push(
		<span key={0}>
		<a href={"/"}>{"Acasa"}</a>
	</span>);

	navigationLinks.push(...pathSegments.map((segment, index) =>
	{
		const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

		return (
			<span key={index+1}>
				{' / '}
				<a href={path}>{segment}</a>
			</span>
		);
	}));

	return <div className="breadcrumbs">{navigationLinks}</div>
}