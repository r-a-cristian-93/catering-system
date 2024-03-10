export default function TableList(props: React.HTMLProps<HTMLTableElement>): JSX.Element
{
	return (
		<table {...props} className={props.className + " table-list"}>
			{props.children}
		</table>
	);
}