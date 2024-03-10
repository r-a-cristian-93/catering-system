import css from "./Card.module.css"

export default function CardDetails(props: React.HTMLProps<HTMLDivElement>): JSX.Element
{
    return (
        <div {...props} className={css.card_details + " " + props.className}>
            {props.children}
        </div>
    );
}