import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import isValidJwt from "./components/Auth";

function Layout(): JSX.Element
{
	return (
		<>
			<Navbar />
			<div className="content">
				{
					isValidJwt() ? <Outlet /> : <LoginPage />
				}
			</div>
		</>
	);
}

export default Layout;
