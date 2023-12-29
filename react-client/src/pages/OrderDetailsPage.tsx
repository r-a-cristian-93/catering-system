//import { useEffect, useState } from "react";

import getOrderDetails from "../controllers/OrderDetailsController";
import OrderDetails from "../models/OrderDetails";
import * as Formatter from "../utils/Formatting";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import QueryStatus from "../utils/QueryStatus";
import CardsListComponent from "../components/CardsListComponent";
import { getOrderItems } from "../controllers/OrderItemsController";


export default function OrderDetailsPage(): JSX.Element
{
	const {orderId} = useParams();

	const {status, data: orderDetails} = useQuery<OrderDetails>({
		queryKey: ["orderDetails", Number(orderId)],
		queryFn: () => getOrderDetails(Number(orderId)),
	});

	const {status: itemsStatus, data: items} = useQuery<string>({
		queryKey: ["orderItems", Number(orderId)],
		queryFn: () => getOrderItems(Number(orderId)),
	})

	if (itemsStatus === QueryStatus.SUCCESS)
		console.log(JSON.parse(items));

	if (status === QueryStatus.LOADING)
		return <h1>Loading...</h1>

	return (
		<div className="box">
			<div className="box-content" id="order-details">
				<div className="order-details-title">Detalii comanda #{orderDetails?.id}</div>

				<CardsListComponent orderDetails={orderDetails || {} as OrderDetails} />

				<div className="stepper-wrapper">
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Preluare</div>
						<div className="step-date">
							{Formatter.formatDate(orderDetails?.placementDate || "")}
							{" " + Formatter.formatTime(orderDetails?.placementDate  || "")}
						</div>
					</div>
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Aprovizionare</div>
						<div className="step-date">
							{Formatter.formatDate(orderDetails?.supplyDate  || "")}
							{" " + Formatter.formatTime(orderDetails?.supplyDate  || "")}
						</div>
					</div>
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Preparare</div>
						<div className="step-date">
							{Formatter.formatDate(orderDetails?.productionDate  || "")}
							{" " + Formatter.formatTime(orderDetails?.productionDate  || "")}
						</div>
					</div>
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Pregatire</div>
						<div className="step-date">
							{Formatter.formatDate(orderDetails?.preparingDate  || "")}
							{" " + Formatter.formatTime(orderDetails?.preparingDate  || "")}
						</div>
					</div>
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Expediere</div>
						<div className="step-date">
							{Formatter.formatDate(orderDetails?.shippingDate  || "")}
							{" " + Formatter.formatTime(orderDetails?.shippingDate  || "")}
						</div>
					</div>
				</div>
				<table id="order-details-table" className="full table-list">
					<tr className="font-size-120">
						<th>Articol</th>
						<th>Portii</th>
						<th>Cost unitar</th>
						<th>Cost total</th>
					</tr>
					<tr id="det_5" className="font-size-120">
						<td>Cartofi prajiti</td>
						<td>
							<div contentEditable="true">24</div>
						</td>
						<td>1.02 Lei</td>
						<td>24.60 Lei</td>
						<td>
							<img className="active" src="/img/delete.png" />
						</td>
					</tr>
					<tr id="det_8" className="font-size-120">
						<td>Mititei</td>
						<td>
							<div contentEditable="true">24</div>
						</td>
						<td>7.04 Lei</td>
						<td>168.96 Lei</td>
						<td>
							<img className="active" src="/img/delete.png" />
						</td>
					</tr>
					<tr id="det_total" className="font-size-140">
						<th></th>
						<th></th>
						<th>Total:</th>
						<th>193.56 Lei</th>
					</tr>
				</table>
				<button className="add-button">
					<div className="add-button-text">Adauga articol</div>
					<div className="add-button-dot">+</div>
				</button>
				<div className="action-bar">
					<div className="action-button">
						<div className="action-icon anulata"></div>
						<div className="action-details">
							<div>Anuleaza</div>
							<div>comanda</div>
						</div>
					</div>
					<div className="action-button">
						<div className="action-icon img-cart"></div>
						<div className="action-details">
							<div>Lista</div>
							<div>aprovizionare</div>
						</div>
					</div>
					<div className="action-button">
						<div className="action-icon img-cart"></div>
						<div className="action-details">
							<div>Printare</div>
							<div>raport complet</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
