export enum ScreenOption {
    NONE,
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

export type ScreenSelectorParams = {
    text: string;
    iconPath: string;
}

export default function ScreenSelector(props: ScreenSelectorProps): JSX.Element
{
    const {screen, text, iconPath, isActive, setScreenCallback: setScreen} = props;

    return(
        <div
            className={ "screen-picker-selector hover-pointer" +  (isActive ? " screen-picker-selector-active" : "")}
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