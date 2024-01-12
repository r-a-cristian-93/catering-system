import { ChangeEvent, useRef, useState } from "react";
import { ClientResponseData } from "../models/Order/Order";
import { getClients, getClientsByNameContaining } from "../controllers/ClientController";
import PickClient from "./PickClient";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysClient } from "../QueryKeys/QueryKeysClient";
import Pager from "./Pager";
import { PageableRequestParameters } from "../models/Pageable";

type PickClientModalProps = {
	orderId: number;
	toogleModalCallback: () => void;
};

export default function PickClientModal(props: PickClientModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const { orderId, toogleModalCallback } = props;

	const clientsRequestParameters = useRef<PageableRequestParameters>({
		page: "0",
		size: "4",
		prop: "id",
		dir: "DESC",
	});

	const [ clientResponseData, setClientResponseData] = useState<ClientResponseData | null>(
		queryClient.getQueryData<ClientResponseData>(QueryKeysClient.all) || null
	)

	const [ searchName, setSearchName ] = useState<string | null>("");

	useQuery<ClientResponseData>({
		queryKey: QueryKeysClient.all,
		queryFn: () => getClients(clientsRequestParameters.current),
		onSuccess: (responseData) =>
		{
			setClientResponseData(responseData);
		},
		staleTime: Infinity
	});

	function setActivePage(pageNumber: number): void
	{
		clientsRequestParameters.current.page = pageNumber.toString();

		getSearchData();
		}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		setSearchName(event.target.value);

		if (!event.target.value)
		{
			console.log("invalidate");

			void queryClient.invalidateQueries(QueryKeysClient.all);
		}
	}

	function handleSearch(): void
	{
		if (searchName)
		{
			getSearchData();
		}
	}

	function getSearchData(): void
	{
		void getClientsByNameContaining(searchName || "", clientsRequestParameters.current).then((responseData) =>
		{
			setClientResponseData(responseData);
		});
	}

	return (
		<div className="modal pick-client-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege client</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>
							×
						</span>
					</div>
					<div className="modal-content">
						<div className="search-bar">
							<input
								type="search"
								name="search"
								placeholder="Cauta..."
								value={searchName || ""}
								onChange={handleChange}
							/>
							<button className="search-magnifier" onClick={handleSearch}>
								<img width="20px" height="20px" src="/img/search.svg" />
							</button>
						</div>
						<table id="pick-client-table" className="full table-list">
							<thead>
								<tr>
									<th>Nume</th>
									<th>Telefon</th>
								</tr>
							</thead>
							<tbody>
								{clientResponseData?.content.map(
									(client) =>
										client.id > 0 && (
											<PickClient
												key={client.id}
												orderId={orderId}
												client={client}
												toogleModalCallback={toogleModalCallback}
											/>
										)
								)}
							</tbody>
						</table>
						{
							clientResponseData && <Pager pagerArgs={
								{
									activePage: clientResponseData.pageable.pageNumber,
									totalPages: clientResponseData.totalPages,
									setActivePageCallback: setActivePage
								}
							} />
						}
						<br />
						<div>
							<button className="button" type="button">
								<img
									src="/img/register-client.svg"
									style={{ filter: "invert(1)", marginRight: "12px" }}
								/>
								<span>Inregistreaza un nou client</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
