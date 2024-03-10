import css from "./TableList.module.css"

export default function TableList(props: React.HTMLProps<HTMLTableElement>): JSX.Element
{
	return (
		<table {...props} className={props.className + " " + css.table_list}>
			{props.children}
		</table>
	);
}