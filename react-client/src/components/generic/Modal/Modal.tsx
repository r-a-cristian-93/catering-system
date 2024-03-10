import useScrollBlocking from "../../../hooks/UseScrollBlocking";
import { createPortal } from "react-dom";
import css from "./Modal.module.css"

type ModalProps = {
	title: string;
	children: JSX.Element;
	toggleCallback: () => void;
};

export default function Modal(props: ModalProps): JSX.Element
{
	useScrollBlocking();

	return createPortal(
		<div className={css.modal}>
			<div className={css.modal_container}>
				<div className={css.modal_box}>
					<div className={css.modal_top}>
						<h2 className={css.modal_title}>{props.title}</h2>
						<span className={css.modal_close} onClick={props.toggleCallback}>×</span>
					</div>
					<div className={css.modal_content}>
						{props.children}
					</div>
				</div>
			</div>
		</div>,
		document.body);
}
