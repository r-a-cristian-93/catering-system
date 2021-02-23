
/* ************** PAGER *************** */

function newPagerButton(text, action) {
	return $("<button>").addClass("pager-button").attr({"type": "button", "onclick": action}).html(text);
}

function newPager(args) {
	var pager = $("<div>").addClass("pager");
	args.page = 0;
	pager.append(newPagerButton("&laquo;", args.buildFunction.name +"("+ JSON.stringify(args) + ");"));

	for(i = 0; i<args.totalPages; i++) {
		args.page = i;
		if(
			args.page < 2 || 							//first two pages
			args.page > args.totalPages-3 ||			//last two pages			
			args.page == args.currentPage-1 ||			
			args.page == args.currentPage ||
			args.page == args.currentPage+1			
			) {			
			
			if (
				(args.currentPage > 3 && args.page > 2 && args.page < args.currentPage) ||											//left side dots
				(args.currentPage < args.totalPages-1 && args.page > args.currentPage+2 && args.page < args.totalPages-1)			//right side dots
				) {
				pager.append($("<span>").addClass("pager-extend").html("..."));		
			}			
			
			var button = newPagerButton(args.page+1, args.buildFunction.name +"("+ JSON.stringify(args) + ");");
			if(args.currentPage == args.page) {	button.addClass("pager-current"); }
			pager.append(button);
		}		
	}
		
	pager.append(newPagerButton("&raquo;", args.buildFunction.name +"("+ JSON.stringify(args) + ");"));	
	return pager;
}
