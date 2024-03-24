import { getOrderItems } from "../../controllers/OrderItemsController.tsx";
import { OrderItem } from "../../models/Order.tsx";
import OrderItemComponent from "./OrderItemComponent";
import * as Formatter from "../../utils/Formatting.tsx";
import { useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import AddOrderItemTable from "./modals/AddOrderItemTable.tsx";
import { QueryKeysOrder } from "../../QueryKeys/QueryKeysOrder.tsx";
import AddButton from "../generic/AddButton/AddButton.tsx";
import Modal from "../generic/Modal/Modal.tsx";
import TableList from "../generic/TableList/TableList.tsx";
import css from "../generic/TableList/TableList.module.css"

type OrderItemsProps = {
	orderId: number;
}

function getTotalCost(orderItems: OrderItem[]): number
{
	return orderItems.reduce((total, orderItem) =>
		total + orderItem.servings * orderItem.recipe.ingCost, 0
	);
}

export default function OrderItems(props: OrderItemsProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();
	const orderId = props.orderId;

	// fetch order items
	const { isSuccess: orderItemsQuerySucess } = useQuery<OrderItem[]>({
		queryKey: QueryKeysOrder.itemsByOrderId(orderId),
		queryFn: () => getOrderItems(orderId),
		onSuccess: (orderItems) =>
		{
			// set orderItems
			setOrderItems(orderItems);
		}
	});

	const [ orderItems, setOrderItems ] = useState<OrderItem[] | null>(
		queryClient.getQueryData(QueryKeysOrder.itemsByOrderId(orderId)) as OrderItem[]
	);

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

	function handleChildDelete(orderItem: OrderItem): void
	{
		setOrderItems((prevItems) => prevItems &&
			prevItems.filter((item) => item.id !== orderItem.id)
		);
	}

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	function handleAddItemSuccessful(orderItem: OrderItem): void
	{
		// optimistic update
		setOrderItems((prevItems) => prevItems &&
			[ ...prevItems, orderItem ]
		);
	}

	return (
		<>
			<TableList className={css.details_table} header={[ "Articol", "Porții", "Cost unitar", "Cost total" ]}>
				{
					orderItemsQuerySucess && orderItems && orderItems.map((orderItem) =>
						<OrderItemComponent key={orderItem.id} orderItem={orderItem}
							changeCallback={handleChildChange}
							deleteCallback={handleChildDelete} />
					)
				}
				<tr className="font-size-140">
					<th></th>
					<th></th>
					<th>Total:</th>
					<th>
						{
							orderItemsQuerySucess && orderItems && Formatter.formatCurrency(getTotalCost(orderItems))
						}
					</th>
				</tr>
			</TableList>

			<br />
			<AddButton text="Adauga articol" onClick={handleToggleModal} />

			{
				isModalActive &&
				<Modal title="Adaugă articol" toggleCallback={handleToggleModal}>
					<AddOrderItemTable
						key={Math.round(Math.random() * 100)}
						orderId={orderId}
						addSuccessfulCallback={handleAddItemSuccessful} />
				</Modal>
			}
		</>
	);
}