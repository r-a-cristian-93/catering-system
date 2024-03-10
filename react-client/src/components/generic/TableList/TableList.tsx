import css from "./TableList.module.css"

type TableListProps = React.HTMLProps<HTMLTableElement> & {
	header: string[]
}

export default function TableList(props: TableListProps): JSX.Element
{
	return (
		<table {...props} className={props.className + " " + css.table_list}>
			<thead>
				<tr>
					{props.header.map((columnName, index) => <th key={index}>{columnName}</th>)}
				</tr>
			</thead>
			<tbody>
				{props.children}
			</tbody>
		</table>
	);
}