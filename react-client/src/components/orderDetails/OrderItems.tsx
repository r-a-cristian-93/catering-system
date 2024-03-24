import { OrderItem } from "../../models/Order.tsx";
import OrderItemComponent from "./OrderItemComponent";
import * as Formatter from "../../utils/Formatting.tsx";
import { useState } from "react";
import AddOrderItemTable from "./modals/AddOrderItemTable.tsx";
import AddButton from "../generic/AddButton/AddButton.tsx";
import Modal from "../generic/Modal/Modal.tsx";
import TableList from "../generic/TableList/TableList.tsx";
import css from "../generic/TableList/TableList.module.css"
import { useOrderDetailsContext } from "../../contexts/OrderDetailsContext.tsx";


function getTotalCost(orderItems: OrderItem[]): number
{
	return orderItems.reduce((total, orderItem) =>
		total + orderItem.servings * orderItem.recipe.ingCost, 0
	);
}

export default function OrderItems(): JSX.Element
{
	const { orderItems, setOrderItems } = useOrderDetailsContext();
	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	orderItems?.sort((a, b) => a.id - b.id);

	function handleChildChange(orderItem: OrderItem): void
	{
		if (orderItems !== null)
		{
			const newItems: OrderItem[] = [ ...orderItems ];
			const index: number = orderItems.findIndex((item) => item.id === orderItem.id);

			if (index !== -1)
			{
				newItems[ index ] = orderItem;
				setOrderItems(newItems);
			}
		}
	}

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
			<TableList className={css.details_table} header={[ "Articol", "Porții", "Cost unitar", "Cost total" ]}>
				{
					orderItems && orderItems.map((orderItem) =>
						<OrderItemComponent key={orderItem.id} orderItem={orderItem}
							changeCallback={handleChildChange} />
					)
				}
				<tr className="font-size-140">
					<th></th>
					<th></th>
					<th>Total:</th>
					<th>
						{
							orderItems && Formatter.formatCurrency(getTotalCost(orderItems))
						}
					</th>
				</tr>
			</TableList>

			<br />
			<AddButton text="Adauga articol" onClick={handleToggleModal} />

			{
				isModalActive &&
				<Modal title="Adaugă articol" toggleCallback={handleToggleModal}>
					<AddOrderItemTable />
				</Modal>
			}
		</>
	);
}