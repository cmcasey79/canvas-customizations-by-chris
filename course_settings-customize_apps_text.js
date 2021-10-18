// Replaces default text on course settings>apps tab with HTML of your choosing.  May be useful to include policy/procedures for requesting new integrations.
$(document).ready(function(){
		
		// Replaces descriptive text on External Apps tab.
		function replaceExternalToolsDescription(){
			if($('#external_tools_tab').hasClass('ui-state-active')){
				$('.Header div:nth-child(2):not(.externalApps_buttons_container)').html('<p>Place custom text here.</p>');
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
	
});

/*
Copyright 2019 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
