import useScrollBlocking from "../../../hooks/UseScrollBlocking";
import { createPortal } from "react-dom";
import style from "./Modal.module.css"

type ModalProps = {
	title: string;
	children: JSX.Element;
	toggleCallback: () => void;
};

export default function Modal(props: ModalProps): JSX.Element
{
	useScrollBlocking();

	return createPortal(
		<div className={style.modal}>
			<div className={style.modal_container}>
				<div className={style.modal_box}>
					<div className={style.modal_top}>
						<h2 className={style.modal_title}>{props.title}</h2>
						<span className={style.modal_close} onClick={props.toggleCallback}>×</span>
					</div>
					<div className={style.modal_content}>
						{props.children}
					</div>
				</div>
			</div>
		</div>,
		document.body);
}
