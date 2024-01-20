import { AddressResponseData } from "../models/Order/Order";
import { PageableRequestParameters } from "../models/Pageable";

const { VITE_API_URL } = import.meta.env;

export async function getAddresesByValueContaining(value: string, pageableRequestParameters: PageableRequestParameters): Promise<AddressResponseData>
{
	const queryParameters = new URLSearchParams({
        value: value,
        ...pageableRequestParameters,
    });

    const url: string = VITE_API_URL + "/addresses/byValueContainingPageable?" + queryParameters.toString();

    const response = await fetch(url,
    {
        method: "GET",
        headers: {
            "ContentType": "application/json",
        },
        credentials: "include"
    });

    const addressesPromise: Promise<AddressResponseData> = response.json().then( (json) =>
    {
        const responseData: AddressResponseData = {} as AddressResponseData;

        Object.assign(responseData, json);

        return responseData;
    });

    return addressesPromise;
}