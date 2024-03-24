import { useEffect, useState } from "react";
import ScreenSelector, { ScreenOption, ScreenSelectorParams } from "../components/orderDetails/modals/ScreenSelector/ScreenSelector";

type UseScreensReturn = {
    selectors: () => JSX.Element[];
    currentScreen: () => JSX.Element;
}

export type ScreenConfig = {
    selectorParams: ScreenSelectorParams;
    screenElement: JSX.Element;
}

export default function useScreens(screens: Map<ScreenOption, ScreenConfig>): UseScreensReturn
{
    const [ currentScreen, setCurrentScreen ] = useState<ScreenOption>(ScreenOption.NONE);

    useEffect(() =>
        {
            const screenOptions: ScreenOption[] = [... screens.keys()];
            if (screenOptions.length)
                setCurrentScreen(screenOptions[0]);
        },
    []);

    const useScreensReturn: UseScreensReturn = {
        currentScreen: (): JSX.Element =>
        {
            const screenElement: JSX.Element | undefined = screens.get(currentScreen)?.screenElement;

            return screenElement || <></>;
        },

        selectors: (): JSX.Element[] =>
        {
            const selectors: JSX.Element[] = Array.from(screens, ([key, value], index) =>
                <ScreenSelector
                    key={index}
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

    return useScreensReturn
}