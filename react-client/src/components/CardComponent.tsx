export type CardData = {
    id: string;
    iconClass: string;
    title: string;
    contentList: CardContent[];
};

export type CardContent = {
    class: string;
    text: string;
};

type CardProps = {
    cardData: CardData;
};

function CardComponent(props: CardProps): JSX.Element
{
    const { cardData } = props;

    return (
        <div className="card" id={cardData.id}>
            <div className="card-icon">
                <div className={"card-bg " + cardData.iconClass}></div>
            </div>
            <div className="card-details">
                <div className="card-title">{cardData.title}</div>

                {cardData.contentList.map((content) =>
                {
                    return <div className={content.class}>{content.text}</div>;
                })}
            </div>
        </div>
    );
}

export default CardComponent;
