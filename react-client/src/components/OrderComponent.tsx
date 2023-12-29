import { Order } from "../models/Order";
import * as Formatter from "../utils/Formatting";

type OrderComponentProps = {
    order: Order;
};

export default function OrderComponent(props: OrderComponentProps): JSX.Element
{
    return (
        <tr
            id={props.order.id.toString()}
            onClick={() =>
                {
                    window.location.href = document.location.pathname + "/detalii_comanda/" + props.order.id
                }
            }>
            <td>{props.order.id}</td>
            <td>
                <div className={props.order.status.name}></div>
            </td>
            <td>
                <div>
                    <div>{props.order.client?.name}</div>
                    <h5>{props.order.client?.phone}</h5>
                </div>
            </td>
            <td>{Formatter.formatDate(props.order.placementDate)}</td>
            <td>{Formatter.formatDate(props.order.dueDate)}</td>
            <td>{Formatter.formatCurrency(props.order.ingCost)}</td>
        </tr>
    );
}
