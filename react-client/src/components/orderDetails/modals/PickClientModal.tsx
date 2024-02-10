import { useState } from "react";
import PickClientCreateNew from "./PickClientCreateNew";
import PickClientSearch from "./PickClientSearch";
import ScreenSelector, {ScreenOption} from "./ScreenSelector";

type PickClientModalProps = {
	orderId: number;
	toogleModalCallback: () => void;
};

export default function PickClientModal(props: PickClientModalProps): JSX.Element
{
	const { orderId, toogleModalCallback } = props;

	const [ currentScreen, setCurrentScreen ] = useState<ScreenOption>(ScreenOption.CLIENT_SEARCH);

	function renderScreen(): JSX.Element
	{
		switch (currentScreen)
		{
			case ScreenOption.CLIENT_SEARCH:
				return <PickClientSearch orderId={orderId} toogleModalCallback={toogleModalCallback}/>
			break;
			case ScreenOption.CLIENT_CREATE:
				return <PickClientCreateNew />
			break;
			default:
				return <></>
		}
	}

	function renderSelector(): JSX.Element
	{
		return <>
			<ScreenSelector
				screen={ScreenOption.CLIENT_SEARCH}
				text="Alege un client existent"
				iconPath="/img/register-client.svg"
				isActive={currentScreen === ScreenOption.CLIENT_SEARCH}
				setScreenCallback={setCurrentScreen}
			/>
			<ScreenSelector
				screen={ScreenOption.CLIENT_CREATE}
				text="Inregistreaza un nou client"
				iconPath="/img/register-client.svg"
				isActive={currentScreen === ScreenOption.CLIENT_CREATE}
				setScreenCallback={setCurrentScreen}
			/>
		</>
	}

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
								renderSelector()
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
