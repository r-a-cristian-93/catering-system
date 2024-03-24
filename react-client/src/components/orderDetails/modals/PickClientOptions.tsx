import PickClientCreateNew from "./PickClientCreateNew/PickClientCreateNew";
import PickClientSearch from "./PickClientSearch";
import { ScreenOption } from "./ScreenSelector/ScreenSelector";
import useScreens, { ScreenConfig } from "../../../hooks/UseScreens";
import css from "./ScreenSelector/ScreenSelector.module.css"

type PickClientOptionsProps = {
	orderId: number;
	toggleModalCallback: () => void;
};

export default function PickClientOptions(props: PickClientOptionsProps): JSX.Element
{
	const { orderId, toggleModalCallback } = props;

	const screenConfigSearch: ScreenConfig = {
		selectorParams: { text: "Clienti existenti", iconPath: "/img/users.svg" },
		screenElement: <PickClientSearch orderId={orderId} toogleModalCallback={toggleModalCallback} />
	}

	const screenConfigCreate: ScreenConfig = {
		selectorParams: { text: "Client nou", iconPath: "/img/register-client.svg" },
		screenElement: <PickClientCreateNew toogleModalCallback={toggleModalCallback} />
	}

	const screens = new Map<ScreenOption, ScreenConfig>(
		[
			[ ScreenOption.CLIENT_SEARCH, screenConfigSearch ],
			[ ScreenOption.CLIENT_CREATE, screenConfigCreate ],
		]);

	const { selectors, currentScreen } = useScreens(screens);

	return (
		<>
			<div className={css.screen_picker}>
				{
					selectors()
				}
			</div>
			<br />
			<br />
			{
				currentScreen()
			}
		</>
	);
}
