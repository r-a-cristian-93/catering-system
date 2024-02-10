import { useState } from "react";
import ScreenSelector, { ScreenOption, ScreenSelectorParams } from "../components/orderDetails/modals/ScreenSelector";

type useScreensReturn = {
    renderSelectors: () => JSX.Element[];
    renderScreen: () => JSX.Element;
}

type ScreenConfig = {
    selectorParams: ScreenSelectorParams;
    screenElement: JSX.Element;
}

export default function useScreens(screens: Map<ScreenOption, ScreenConfig>): useScreensReturn
{
    const [ currentScreen, setCurrentScreen ] = useState<ScreenOption>(ScreenOption.NONE);

    return	{
        renderScreen: (): JSX.Element =>
        {
            const screenElement: JSX.Element | undefined = screens.get(currentScreen)?.screenElement;

            return screenElement || <></>;
        },

        renderSelectors: (): JSX.Element[] =>
        {
            const selectors: JSX.Element[] = Array.from(screens, ([key, value]) =>
                <ScreenSelector
                    screen={key}
                    text={value.selectorParams.text}
                    iconPath={value.selectorParams.iconPath}
                    isActive={currentScreen === key}
                    setScreenCallback={setCurrentScreen}
                />
            );

            return selectors;
        }
    }
}