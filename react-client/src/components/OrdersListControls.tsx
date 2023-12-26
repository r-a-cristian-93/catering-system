export default function OrdersListControls(): JSX.Element
{
    return (
        <>
            <button className="button" type="button" onClick="orderAdd()">
                + Adauga comanda noua
            </button>
            <div className="pager">
                <button
                    className="pager-button"
                    type="button"
                    onClick='orderBuildTableAll({"page":0,"size":"10","prop":"dueDate","dir":"ASC","currentPage":0,"totalPages":1});'
                >
                    «
                </button>
                <button
                    className="pager-button pager-current"
                    type="button"
                    onClick='orderBuildTableAll({"page":0,"size":"10","prop":"dueDate","dir":"ASC","currentPage":0,"totalPages":1});'
                >
                    1
                </button>
                <button
                    className="pager-button"
                    type="button"
                    onClick='orderBuildTableAll({"page":0,"size":"10","prop":"dueDate","dir":"ASC","currentPage":0,"totalPages":1});'
                >
                    »
                </button>
            </div>
        </>
    );
}
