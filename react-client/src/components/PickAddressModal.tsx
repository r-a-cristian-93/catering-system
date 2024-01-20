import { ChangeEvent, useRef, useState } from "react";
import { AddressResponseData } from "../models/Order/Order";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryKeysClient } from "../QueryKeys/QueryKeysClient";
import Pager from "./Pager";
import { PageableRequestParameters } from "../models/Pageable";
import PickAddress from "./PickAddress";
import { QueryKeysAddress } from "../QueryKeys/QueryKeysAddress";
import { getAddresesByValueContaining } from "../controllers/AddressControllere";

type PickAddressModalProps = {
	orderId: number;
	toogleModalCallback: () => void;
};

export default function PickAddressModal(props: PickAddressModalProps): JSX.Element
{
	const queryClient: QueryClient = useQueryClient();

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

	const [ searchAddress, setSearchAddress ] = useState<string | null>("");

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

	function handleChange(event: ChangeEvent<HTMLInputElement>): void
	{
		setSearchAddress(event.target.value);

		if (!event.target.value)
		{
			console.log("invalidate");

			void queryClient.invalidateQueries(QueryKeysClient.all);
		}
	}

	function handleSearch(): void
	{
		if (searchAddress)
		{
			getSearchData();
		}
	}

	function getSearchData(): void
	{
		// void getClientsByNameContaining(searchName || "", pageAbleRequestParameters.current).then((responseData) =>
		// {
		// 	setAddressResponseData(responseData);
		// });
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
								value={searchAddress || ""}
								onChange={handleChange}
							/>
							<button className="search-magnifier" onClick={handleSearch}>
								<img width="20px" height="20px" src="/img/search.svg" />
							</button>
						</div>
						<table id="pick-client-table" className="full table-list">
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
