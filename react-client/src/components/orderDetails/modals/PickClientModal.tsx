import { useRef, useState } from "react";
import { ClientResponseData } from "../../../models/Order";
import { getClients, getClientsByNameContaining } from "../../../controllers/ClientController";
import PickClient from "./PickClient";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysClient } from "../../../QueryKeys/QueryKeysClient";
import Pager from "../../Pager";
import { PageableRequestParameters } from "../../../models/Pageable";
import SearchBar from "../../SearchBar";

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

	const searchName = useRef<string | null>("");

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

	function handleSearch(searchValue: string | null): void
	{
		searchName.current = searchValue;

		if (searchName.current)
		{
			clientsRequestParameters.current.page = "0";
			getSearchData();
		}
	}

	function handleSearchReset(): void
	{
		searchName.current = "";
		void queryClient.invalidateQueries(QueryKeysClient.all);
	}

	function getSearchData(): void
	{
		void getClientsByNameContaining(searchName.current || "", clientsRequestParameters.current).then((responseData) =>
		{
			setClientResponseData(responseData);
		});
	}

	return (
		<div className="modal pick-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege client</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>
							×
						</span>
					</div>
					<div className="modal-content">
						<SearchBar onSearch={handleSearch} onReset={handleSearchReset} />
						<table id="pick-table" className="full table-list">
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
