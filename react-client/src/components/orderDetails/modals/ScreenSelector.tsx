export enum ScreenOption {
    CLIENT_CREATE,
    CLIENT_SEARCH,
}

type ScreenSelectorProps = {
    screen: ScreenOption;
    text: string;
    iconPath: string;
    isActive: boolean;
    setScreenCallback: (screen: ScreenOption) => void;
}


export default function ScreenSelector(props: ScreenSelectorProps): JSX.Element
{
    const {screen, text, iconPath, isActive, setScreenCallback: setScreen} = props;

    return(
        <div
            className={ "screen-picker-selector" +  (isActive ? " screen-picker-selector-active" : "")}
            onClick={() =>
                {
                    setScreen(screen);
                }
            }>
            <img
                src={iconPath}
                style={{ marginRight: "12px" }}
            />
            <span>
                {text}
            </span>
        </div>
    )
}