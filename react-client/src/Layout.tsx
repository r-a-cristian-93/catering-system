import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import isUserAuthenticated from "./components/Auth";

export default function Layout(): JSX.Element
{
	return (
		<>
			{
				isUserAuthenticated() && <Navbar />
			}
			<div className="content">
				{
					isUserAuthenticated() ? <Outlet /> : <LoginPage />
				}
			</div>
		</>
	);
}
