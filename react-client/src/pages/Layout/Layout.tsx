import Navbar from "../../features/navbar/Navbar";
import { Outlet } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import isUserAuthenticated from "../../utils/Auth";
import css from "./Layout.module.css"

export default function Layout(): JSX.Element
{
	return (
		<>
			{
				isUserAuthenticated() && <Navbar />
			}
			<div className={css.content}>
				{
					isUserAuthenticated() ? <Outlet /> : <LoginPage />
				}
			</div>
		</>
	);
}
