import { LatLngTuple } from "leaflet";
import { NominatimReverseResponse } from "../models/Nominatim";
import axios from "axios";

export async function getAddress(coordinates: LatLngTuple): Promise<NominatimReverseResponse>
{
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${coordinates[0]}&lon=${coordinates[1]}&format=json`;

    const response = await axios.get<NominatimReverseResponse>(url);

    return response.data;
}