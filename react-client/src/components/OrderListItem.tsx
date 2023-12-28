import { Order } from "../controllers/OrdersController";

type OrderListItemProps = {
    order: Order;
};

function formatDate(fullDate: string): string
{
    const date: Date = new Date(fullDate);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).replace(new RegExp("/", 'g'), ".");
}

function formatCurrency(value: number): string
{
    return value.toFixed(2) + " Lei";
}

export default function OrderListItem(props: OrderListItemProps): JSX.Element
{
    return (
        <tr
            id={props.order.id.toString()}
            onClick={() =>
                {
                    window.location.href = document.location.pathname + "/detalii_comanda?id=" + props.order.id
                }
            }>
            <td>{props.order.id}</td>
            <td>
                <div className={props.order.status.name}></div>
            </td>
            <td>
                <div>
                    <div>{props.order.client.name}</div>
                    <h5>{props.order.client.phone}</h5>
                </div>
            </td>
            <td>{formatDate(props.order.placementDate)}</td>
            <td>{formatDate(props.order.dueDate)}</td>
            <td>{formatCurrency(props.order.ingCost)}</td>
        </tr>
    );
}
