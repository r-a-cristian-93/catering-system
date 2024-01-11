import { Client } from "../models/Order/Order";

type PickClientProps = {
    orderId: number;
    client: Client;
}

export default function PickClient(props: PickClientProps): JSX.Element
{
    return (
        <tr>
            <td>{props.client.name}</td>
            <td>{props.client.phone || "-"}</td>
        </tr>
    )
}