// Replaces default text on course settings>apps tab with HTML of your choosing.  May be useful to include policy/procedures for requesting new integrations.
var do_global_customizations = function(){
	
	if ((/^\/courses\/[0-9]+\/settings$/.test(window.location.pathname)) || (/^\/courses\/[0-9]+\/details$/.test(window.location.pathname))) {
		
		// Replaces descriptive text on External Apps tab.
		function replaceExternalToolsDescription() {
			if (document.getElementById('external_tools_tab').classList.contains('ui-state-active')) {
				document.getElementsByClassName('Header')[0].children[1].innerHTML ='<p>Place custom text here.</p>'
			}
		}
		replaceExternalToolsDescription();
		var AppsTabObserver = new MutationObserver(function(mutations) { 
			mutations.forEach(function(mutation) {
				replaceExternalToolsDescription();
			});
		});
		AppsTabObserver.observe(document.getElementById("external_tools"), {
			childList: true
		}); 
	}
	
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	do_global_customizations();
} else {
	document.addEventListener("DOMContentLoaded", do_global_customizations);
}

/*
Copyright 2022 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
