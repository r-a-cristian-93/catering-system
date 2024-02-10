import PickClientCreateNew from "./PickClientCreateNew";
import PickClientSearch from "./PickClientSearch";
import {ScreenOption} from "./ScreenSelector";
import useScreens, { ScreenConfig } from "../../../hooks/UseScreens";

type PickClientModalProps = {
	orderId: number;
	toogleModalCallback: () => void;
};

export default function PickClientModal(props: PickClientModalProps): JSX.Element
{
	const { orderId, toogleModalCallback } = props;

	const screenConfigSearch: ScreenConfig = {
		selectorParams: { text: "Clienti existenti", iconPath: "/img/register-client.svg"},
		screenElement: <PickClientSearch orderId={orderId} toogleModalCallback={toogleModalCallback}/>
	}

	const screenConfigCreate: ScreenConfig = {
		selectorParams: { text: "Client nou", iconPath: "/img/register-client.svg"},
		screenElement: <PickClientCreateNew />
	}

	const screens = new Map<ScreenOption, ScreenConfig>(
	[
		[ScreenOption.CLIENT_SEARCH , screenConfigSearch],
		[ScreenOption.CLIENT_CREATE , screenConfigCreate],
	]);

	const { renderSelectors, renderScreen } = useScreens(screens);

	return (
		<div className="modal pick-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege client</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>
							×
						</span>
					</div>
					<div className="modal-content">
						<div className="screen-picker">
							{
								renderSelectors()
							}
						</div>
						<br/>
						<br/>
						{
							renderScreen()
						}
					</div>
				</div>
			</div>
		</div>
	);
}
