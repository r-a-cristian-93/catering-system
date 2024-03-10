import css from "./Card.module.css"

export default function Card(props: React.HTMLProps<HTMLDivElement>): JSX.Element
{
    return (
        <div {...props} className={css.card + " " + props.className}>
            {props.children}
        </div>
    );
}