import css from "./AddButton.module.css"

type AddButtonProps = {
    text: string;
    onClick: () => void;
};

export default function AddButton(props: AddButtonProps): JSX.Element
{
    return (
        <button className={css.add_button} onClick={props.onClick}>
            <div className={css.add_button_text}>{props.text}</div>
            <div className={css.add_button_dot}>+</div>
        </button>
    );
}
