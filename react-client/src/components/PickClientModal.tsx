import { ChangeEvent, useRef, useState } from "react";
import { Client, ClientResponseData } from "../models/Order/Order";
import { getClients, getClientsByNameContaining } from "../controllers/ClientController";
import PickClient from "./PickClient";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysClient } from "../QueryKeys/QueryKeysClient";
import Pager, { PagerArgs } from "./Pager";
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

	const [ clients, setClients ] = useState<Client[] | null>(null);
	const [ pagerArgs, setPagerArgs ] = useState<PagerArgs>({} as PagerArgs);
	const [ searchName, setSearchName ] = useState<string | null>(null);
	const [ isSearchActive, setSearchActive ] = useState<boolean>(false);


	useQuery<ClientResponseData>({
		queryKey: QueryKeysClient.all,
		queryFn: () => getClients(clientsRequestParameters.current),
		onSuccess: (responseData) =>
		{
			if (!isSearchActive)
			{
				setClients(responseData.content);
				setPagerArgs({
					activePage: responseData.pageable.pageNumber,
					totalPages: responseData.totalPages,
					setActivePageCallback: setActivePage,
				});
			}
		},
	});

	function setActivePage(pageNumber: number): void
	{
		clientsRequestParameters.current.page = pageNumber.toString();

		void queryClient.invalidateQueries(!isSearchActive ? QueryKeysClient.all : QueryKeysClient.search);
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		setSearchName(event.target.value);

		if (!event.target.value)
		{
			setSearchActive(false);
			setActivePage(0);
		}
	}

	function handleSearch(): void
	{
		if (searchName)
		{
			setSearchActive(true);
			void getClientsByNameContaining(searchName || "", clientsRequestParameters.current).then((responseData) =>
			{
				setClients(responseData.content);
				setPagerArgs({
					activePage: responseData.pageable.pageNumber,
					totalPages: responseData.totalPages,
					setActivePageCallback: setActivePage,
				});
			});
		}
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
								{clients?.map(
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
						<Pager pagerArgs={pagerArgs} />
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
