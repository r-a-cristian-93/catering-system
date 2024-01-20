import { useRef, useState } from "react";
import { AddressResponseData } from "../../../models/Order";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import Pager from "../../Pager";
import { PageableRequestParameters } from "../../../models/Pageable";
import PickAddress from "./PickAddress";
import { QueryKeysAddress } from "../../../QueryKeys/QueryKeysAddress";
import { getAddresesByValueContaining } from "../../../controllers/AddressControllere";
import SearchBar from "../../SearchBar";

type PickAddressModalProps = {
	orderId: number;
	toogleModalCallback: () => void;
};

export default function PickAddressModal(props: PickAddressModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

	const searchAddress = useRef<string | null>("");

	const { orderId, toogleModalCallback } = props;

	const pageAbleRequestParameters = useRef<PageableRequestParameters>({
		page: "0",
		size: "4",
		prop: "id",
		dir: "DESC",
	});

	const [ addressResponseData, setAddressResponseData] = useState<AddressResponseData | null>(
		queryClient.getQueryData<AddressResponseData>(QueryKeysAddress.all) || null
	)

	// const [ searchAddress, setSearchAddress ] = useState<string | null>("");

	useQuery<AddressResponseData>({
		queryKey: QueryKeysAddress.all,
		queryFn: () => getAddresesByValueContaining("", pageAbleRequestParameters.current),
		onSuccess: (responseData) =>
		{
			setAddressResponseData(responseData);
		},
		staleTime: Infinity
	});

	function setActivePage(pageNumber: number): void
	{
		pageAbleRequestParameters.current.page = pageNumber.toString();

		getSearchData();
	}

	function handleSearch(searchValue: string | null): void
	{
		searchAddress.current = searchValue;

		if (searchAddress.current)
		{
			pageAbleRequestParameters.current.page = "0";
			getSearchData();
		}
	}

	function handleSearchReset(): void
	{
		searchAddress.current = "";
		void queryClient.invalidateQueries(QueryKeysAddress.all);
	}

	function getSearchData(): void
	{
		void getAddresesByValueContaining(searchAddress.current || "", pageAbleRequestParameters.current).then((responseData) =>
		{
			console.log(responseData);
			setAddressResponseData(responseData);
		});
	}

	return (
		<div className="modal pick-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Alege adresa de livrare</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>
							×
						</span>
					</div>
					<div className="modal-content">

						<SearchBar onSearch={handleSearch} onReset={handleSearchReset} />

						<table id="pick-table" className="full table-list">
							<thead>
								<tr>
									<th>Adresa</th>
								</tr>
							</thead>
							<tbody>
								{addressResponseData?.content.map(
									(address) =>
										address.id > 0 && (
											<PickAddress
												key={address.id}
												orderId={orderId}
												address={address}
												toogleModalCallback={toogleModalCallback}
											/>
										)
								)}
							</tbody>
						</table>
						{
							addressResponseData && <Pager pagerArgs={
								{
									activePage: addressResponseData.pageable.pageNumber,
									totalPages: addressResponseData.totalPages,
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
								<span>Inregistreaza o noua adresa</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
