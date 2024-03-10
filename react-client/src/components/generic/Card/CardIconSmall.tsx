import css from "./Card.module.css"

export default function CardIconSmall(props: React.HTMLProps<HTMLDivElement>): JSX.Element
{
    return (
        <div {...props} className={css.card_icon + " " + css.card_icon_small + " " + props.className}>
            {props.children}
        </div>
    );
}