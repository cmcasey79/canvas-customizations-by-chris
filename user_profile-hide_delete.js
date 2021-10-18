// Removed the ability for users to delete their Canvas accounts
$(document).ready(function(){

	// Check if page is user profile
	if (/^\/profile$/.test(window.location.pathname)) {
		// Hide the delete link on the profile page
		$("a:contains('Delete My Account')").hide();
	}

});

/*
Copyright 2019 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/
