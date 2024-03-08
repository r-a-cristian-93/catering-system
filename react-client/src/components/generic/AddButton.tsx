type AddButtonProps = {
    text: string;
    onClick: () => void;
};

export default function AddButton(props: AddButtonProps): JSX.Element
{
    return (
        <button className="add-button" onClick={props.onClick}>
            <div className="add-button-text">{props.text}</div>
            <div className="add-button-dot">+</div>
        </button>
    );
}
