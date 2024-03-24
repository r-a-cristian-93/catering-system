import { FilterMenuElementProps } from "./FilterMenuElement";

export default function FilterMenuElementChild(props: FilterMenuElementProps): JSX.Element
{
	const { setActiveFilter, filter, topElementIndex } = props;

	function handleOnClick(): void
	{
		setActiveFilter(filter, topElementIndex);
	}

	return (
		<a onClick={handleOnClick}>
			{filter.displayName}
		</a>
	)
}
