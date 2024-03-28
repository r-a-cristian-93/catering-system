import { useOrderDetailsContext } from "../../../../contexts/OrderDetailsContext";
import { usePickAddressContext } from "../../../../contexts/PickAddressContext";
import { updateAddress } from "../../../../controllers/AddressControllere";
import { ClientAddress } from "../../../../models/Order";
import PickAddressMap from "../PickAddressMap";

type PickAddressProps = {
	toogleModalCallback: () => void;
}

export default function PickAddress(props: PickAddressProps): JSX.Element
{
    const { order, refetchOrder } = useOrderDetailsContext();
    const { label, markerPosition } = usePickAddressContext();

    function handleSetAddress(): void
    {
        if (markerPosition && label && order?.client?.address)
        {
            const address: ClientAddress = {
                ...order.client.address,
                value: label,
                latitude: markerPosition[ 0 ],
                longitude: markerPosition[ 1 ]
            }

            void updateAddress(address).then(refetchOrder).then(props.toogleModalCallback);
        }
    }

    return (
        <PickAddressMap>
            <div className="sticky-address-label">
                {
                    label &&
                    <div>
                        {label}
                        {/* // hide this when creating new client? */}
                        <button className={"button"} style={{ marginLeft: "40px" }} onClick={handleSetAddress}>Foloseste aceasta adresa</button>
                    </div>
                }
                <div>
                    <span>Adresa curentă: </span>
                    {order?.client?.address?.value}
                </div>
            </div>
        </PickAddressMap>
    )
}

