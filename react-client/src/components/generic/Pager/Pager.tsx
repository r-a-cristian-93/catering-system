import css from "./Pager.module.css"

export type PagerButtonProps = {
    page: number;
    text: string;
    setActivePageCallback: (newActivePage: number) => void;
    isCurrentPage: boolean;
};

export function PagerButton(props: PagerButtonProps): JSX.Element
{
    function handleClick(): void
    {
        props.setActivePageCallback(props.page);
    }

    return (
        <li
            onClick={handleClick}
            className={css.pager_button + (props.isCurrentPage ? " " + css.pager_current : "")}
        >
            {props.text}{" "}
        </li>
    );
}

export type PagerArgs = {
    activePage: number;
    totalPages: number;
    setActivePageCallback: (newActivePage: number) => void;
};

export type PagerProps = {
    pagerArgs: PagerArgs;
};

export default function Pager(props: PagerProps): JSX.Element
{
    const buttons: JSX.Element[] = [];
    let pageIndex: number = 0;
    let keyIndex: number = 1000;

    pageIndex = props.pagerArgs.activePage > 0 ? props.pagerArgs.activePage - 1 : 0;

    buttons.push(
        <PagerButton
            key={keyIndex++}
            page={pageIndex}
            text="&laquo;"
            setActivePageCallback={props.pagerArgs.setActivePageCallback}
            isCurrentPage={false}
        />
    );

    for (pageIndex = 0; pageIndex < props.pagerArgs.totalPages; pageIndex++)
    {
        if (
            pageIndex < 2 || // first two pages
            pageIndex > props.pagerArgs.totalPages - 3 || // last two pages
            pageIndex === props.pagerArgs.activePage - 1 ||
            pageIndex === props.pagerArgs.activePage ||
            pageIndex === props.pagerArgs.activePage + 1
        )
        {
            if (
                (props.pagerArgs.activePage > 3 &&
                    pageIndex > 2 &&
                    pageIndex < props.pagerArgs.activePage) || // left side dots
                (props.pagerArgs.activePage < props.pagerArgs.totalPages - 1 &&
                    pageIndex > props.pagerArgs.activePage + 2 &&
                    pageIndex < props.pagerArgs.totalPages - 1) // right side dots
            )
            {
                buttons.push(<li key={keyIndex++} className={css.pager_button + " " + css.inactive}>...</li>
                );
            }

            buttons.push(
                <PagerButton
                    key={keyIndex++}
                    page={pageIndex}
                    text={(pageIndex + 1).toString()}
                    setActivePageCallback={props.pagerArgs.setActivePageCallback}
                    isCurrentPage={pageIndex === props.pagerArgs.activePage}
                />
            );
        }
    }

    pageIndex = props.pagerArgs.totalPages - 1;

    buttons.push(
        <PagerButton
            key={keyIndex++}
            page={pageIndex}
            text="&raquo;"
            setActivePageCallback={props.pagerArgs.setActivePageCallback}
            isCurrentPage={false}
        />
    );

    return <ul className={css.pager}>{buttons.map((button) => button)}</ul>;
}
