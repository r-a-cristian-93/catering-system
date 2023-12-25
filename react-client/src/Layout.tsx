import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout(): JSX.Element
{
	return (
		<>
			<Navbar />
			<div className="content">
				<Outlet />
			</div>
		</>
	);
}

export default Layout;
