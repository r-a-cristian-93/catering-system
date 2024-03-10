import css from "./Card.module.css"

export default function CardSmall(props: React.HTMLProps<HTMLDivElement>): JSX.Element
{
    return (
        // <div {...props} className={css.card + " " + css.card_small + " hover-pointer " + props.className}>
        <div {...props} className={`${css.card} ${css.card_small} hover-pointer ${props.className}`}>
            {props.children}
        </div>
    );
}