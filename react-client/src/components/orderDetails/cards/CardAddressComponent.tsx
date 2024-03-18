import { useState } from "react";
import { ClientAddress } from "../../../models/Order";
import PickAddressTable from "../modals/PickAddressTable";
import Modal from "../../generic/Modal/Modal";
import Card from "../../generic/Card/Card";
import CardIcon from "../../generic/Card/CardIcon";
import CardDetails from "../../generic/Card/CardDetails";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysAddress } from "../../../QueryKeys/QueryKeysAddress";
import { getAddresses } from "../../../controllers/AddressControllere";
import { useOrderDetailsContext } from "../../../contexts/OrderDetailsContext";

type CardAddressProps = {
	orderId: number;
	clientId: number | null;
	address: ClientAddress | null;
}

export default function CardAddressComponent(props: CardAddressProps): JSX.Element
{
	const { orderId, clientId, address } = props;

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToggleModal(): void
	{
		setModalActive(prev => !prev);
	}

	return (
		<>
			<Card className="card hover-pointer" onClick={handleToggleModal}>
				<CardIcon>
					<div className="card-bg img-pinlocation"></div>
				</CardIcon>
				<CardDetails>
					<div className="card-title">Adresa livrare</div>
					<div className="card-text-medium">
						{address?.value}
					</div>
				</CardDetails>
			</Card>
			{
				isModalActive && clientId &&
				<Modal title="Alege adresa" toggleCallback={handleToggleModal} style={{ width: "1200px" }}>
					<PickAddressModalContent orderId={orderId} clientId={clientId} />
				</Modal>
			}
		</>
	);
}

type PickAddressModalContent = {
	orderId: number;
	clientId: number;
}

export function PickAddressModalContent(props: PickAddressModalContent): JSX.Element
{
	const { orderId, clientId } = props;

	const queryClient: QueryClient = useQueryClient();

	const [ clientAddresses, setClientAddresses ] = useState<ClientAddress[] | null>(
		queryClient.getQueryData<ClientAddress[]>(QueryKeysAddress.byClientId(clientId)) || null
	);

	const { order } = useOrderDetailsContext();

	const position: LatLngTuple = [ order?.deliveryAddress?.latitude || 0, order?.deliveryAddress?.longitude || 0 ];

	useQuery<ClientAddress[]>({
		queryKey: QueryKeysAddress.byClientId(clientId),
		queryFn: () => getAddresses(clientId),
		onSuccess: (responseData) =>
		{
			setClientAddresses(responseData);
		},
		staleTime: Infinity,
	});


	return (
		<div className="address-selector">
			<PickAddressTable orderId={orderId} clientId={clientId} />

			<MapContainer key={new Date().getTime()} center={position} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{
					clientAddresses?.map((address, index) => <Marker key={index} position={[ address.latitude, address.longitude ]} />)
				}
			</MapContainer>
		</div>
	)
}