import { useRef, useState } from "react";
import { QueryClient, useQueryClient, useQuery } from "react-query";
import { QueryKeysClient } from "../../../QueryKeys/QueryKeysClient";
import { getClients, getClientsByNameContaining } from "../../../controllers/ClientController";
import { ClientResponseData } from "../../../models/Order";
import { PageableRequestParameters } from "../../../models/Pageable";
import Pager from "../../Pager";
import SearchBar from "../../SearchBar";
import PickClient from "./PickClient";

type PickClientSearchProps = {
    orderId: number;
    toogleModalCallback: () => void;
}

export default function PickClientSearch(props: PickClientSearchProps): JSX.Element
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
        <>
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
        </>
    );
}