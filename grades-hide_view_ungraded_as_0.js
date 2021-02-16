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

/*
Copyright 2021 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
