import RecordNewPrice from "./RecordNewPrice";

type RecordNewPriceModalProps = {
	ingredientId: number;
	toogleModalCallback: () => void;
};

export default function RecordNewPriceModal(props: RecordNewPriceModalProps): JSX.Element
{
	const { ingredientId, toogleModalCallback } = props;

	return (
		<div className="modal pick-modal">
			<div className="modal-container">
				<div className="modal-box">
					<div className="modal-top">
						<h2 className="modal-title">Inregistrare pret nou</h2>
						<span className="modal-close no-print" onClick={toogleModalCallback}>
							×
						</span>
					</div>
					<div className="modal-content">
						<div className="cards-small">
							<RecordNewPrice ingredientId={ingredientId} toogleModalCallback={toogleModalCallback}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
