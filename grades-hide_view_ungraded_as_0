var do_global_customizations = function(){

	// Checks if page is course gradebook	
	if (/^\/courses\/[0-9]+\/gradebook$/.test(window.location.pathname)) {
		// Removes View Ungraded as 0 menu option
		function HideViewUngradedAs0() {
			$( "li:contains('View Ungraded as 0')" ).css( "display", "none" );
		}
		HideViewUngradedAs0();
		var ViewMenuObserver = new MutationObserver(function(mutations) { 
			mutations.forEach(function(mutation) {
				HideViewUngradedAs0();
			});
		});
		ViewMenuObserver.observe(document.getElementById("gradebook-toolbar"), {
			attributes: true, subtree:true
		}); 
	}
  
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	do_global_customizations();
} else {
	document.addEventListener("DOMContentLoaded", do_global_customizations);
}
