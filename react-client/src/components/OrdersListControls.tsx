import Pager from "./Pager";
import { PagerProps } from "./Pager";

export default function OrdersListControls( props: PagerProps ): JSX.Element
{
    return (
        <>
            <button className="button" type="button" onClick={() => {}}>
                + Adauga comanda noua
            </button>
            <Pager pagerArgs={props.pagerArgs}/>
        </>
    );
}
