//import { useEffect, useState } from "react";

import { getOrder } from "../controllers/OrderController";
import { Order } from "../models/Order/Order";
import * as Formatter from "../utils/Formatting";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import QueryStatus from "../utils/QueryStatus";
import CardsListComponent from "../components/CardsListComponent";
import OrderItems from "../components/OrderItems";
import { useState } from "react";
import AddItemModal from "../components/AddItemModal";


export default function OrderDetailsPage(): JSX.Element
{
	const { orderId } = useParams();

	const { status, data: order } = useQuery<Order>({
		queryKey: [ "order", Number(orderId) ],
		queryFn: () => getOrder(Number(orderId)),
	});

	const [ isModalActive, setModalActive ] = useState<boolean>(false);

	function handleToogleModal(): void
	{
		setModalActive(prev => !prev);
	}

	function handleAddItemSuccessful(): void
	{
		// do something to update <OrderItems>
	}

	if (status === QueryStatus.LOADING)
		return <h1>Loading...</h1>

	return (
		<div className="box">
			<div className="box-content" id="order-details">
				<div className="order-details-title">Detalii comanda #{order?.id}</div>

				<CardsListComponent order={order || {} as Order} />

				<div className="stepper-wrapper">
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Preluare</div>
						<div className="step-date">
							{Formatter.formatDate(order?.placementDate || "")}
							{" " + Formatter.formatTime(order?.placementDate || "")}
						</div>
					</div>
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Aprovizionare</div>
						<div className="step-date">
							{Formatter.formatDate(order?.supplyDate || "")}
							{" " + Formatter.formatTime(order?.supplyDate || "")}
						</div>
					</div>
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Preparare</div>
						<div className="step-date">
							{Formatter.formatDate(order?.productionDate || "")}
							{" " + Formatter.formatTime(order?.productionDate || "")}
						</div>
					</div>
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Pregatire</div>
						<div className="step-date">
							{Formatter.formatDate(order?.preparingDate || "")}
							{" " + Formatter.formatTime(order?.preparingDate || "")}
						</div>
					</div>
					<div className="stepper-item completed">
						<div className="step-counter"></div>
						<div className="step-name">Expediere</div>
						<div className="step-date">
							{Formatter.formatDate(order?.shippingDate || "")}
							{" " + Formatter.formatTime(order?.shippingDate || "")}
						</div>
					</div>
				</div>

				<OrderItems orderId={Number(orderId)} />

				<button className="add-button">
					<div className="add-button-text" onClick={handleToogleModal}>Adauga articol</div>
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

			{isModalActive && <AddItemModal
				toogleModalCallback={handleToogleModal}
				orderId={Number(orderId)}
				addCallback={handleAddItemSuccessful} />}
		</div>
	);
}
