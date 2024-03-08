import useScrollBlocking from "../../hooks/UseScrollBlocking";
import { createPortal } from "react-dom";

type ModalProps = {
	title: string;
	children: JSX.Element;
	isModalActive: boolean;
	toggleCallback: () => void;
};

export default function Modal(props: ModalProps): JSX.Element
{
	useScrollBlocking();

	if (!props.isModalActive)
		return <></>;

	return createPortal(
		<div className="modal" id="edit-order-details-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">{props.title}</h2>
						<span className="modal-close no-print" onClick={props.toggleCallback}>×</span>
					</div>
					<div className="modal-content">
						{props.children}
					</div>
				</div>
			</div>
		</div>,
		document.body);
}
