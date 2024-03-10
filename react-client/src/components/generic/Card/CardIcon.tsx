import css from "./Card.module.css"

export default function CardIcon(props: React.HTMLProps<HTMLDivElement>): JSX.Element
{
    return (
        <div {...props} className={css.card_icon + " " + props.className}>
            {props.children}
        </div>
    );
}