import { LatLngTuple } from "leaflet";
import { NominatimReverseResponse } from "../models/Nominatim";
import axios from "axios";

export async function getAddress(coordinates: LatLngTuple): Promise<NominatimReverseResponse>
{
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${coordinates[0]}&lon=${coordinates[1]}&format=json`;

    const response = await axios.get<NominatimReverseResponse>(url);

    return response.data;
}


export async function getFakeAddress(coordinates: LatLngTuple): Promise<NominatimReverseResponse>
{
    const promise: Promise<NominatimReverseResponse> = new Promise((resolve) =>
    {
        setTimeout(() =>
        {
            // Simulated address retrieval logic
            const address: NominatimReverseResponse = {
                place_id: 123456789,
                licence: "Random License 123",
                osm_type: "node",
                osm_id: 987654321,
                lat: coordinates[0].toString(),
                lon: coordinates[1].toString(),
                class: "place",
                type: "city",
                place_rank: 4,
                importance: 0.753,
                addresstype: "house",
                name: "Random Place",
                display_name: "Random Place, Random Country",
                address: {
                  region: "Random Region",
                  country: "Random Country",
                  country_code: "RC"
                },
                boundingbox: ["51.4", "51.6", "-0.2", "0"]
              }
            resolve(address);
        }, 500); // Resolves after 2 seconds (simulated delay)
    });

    return promise;
}
