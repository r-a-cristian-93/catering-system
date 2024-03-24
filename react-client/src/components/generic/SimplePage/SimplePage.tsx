import { ChangeEvent } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import css from "./SimplePage.module.css"

type SimplePageProps = React.HTMLProps<HTMLTableElement> & {
	title: string;
	editableTitle?: EditableTitle | undefined;
	imagePath: string;
}

type EditableTitle = {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
}

export default function SimplePage(props: SimplePageProps): JSX.Element
{
	return (
		<div className={css.box}>
			<div className={css.box_header}>
				<Breadcrumbs />
				<img height="100px" src={props.imagePath} />
				<h1 className={css.box_title}>
					{
						props.editableTitle
							? <input
								name="name"
								value={props.title}
								onChange={props.editableTitle.onChange}
								onBlur={props.editableTitle.onBlur} />


							: props.title}
				</h1>
			</div>
			<div className={css.box_content}>
				{props.children}
			</div>
		</div>
	)
}