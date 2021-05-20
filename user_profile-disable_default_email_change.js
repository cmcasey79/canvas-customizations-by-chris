$(document).ready(function(){

	// Check if page is user profile
	if ((/^\/profile$/.test(window.location.pathname)) || (/^\/profile\/settings$/.test(window.location.pathname))) {
		// Checks that current user role is not an admin to hide default email change icon. Admins can access all settings.
		if($.inArray('admin',ENV.current_user_roles) == -1){
			//Hide links to change default email
			$('.email_meta:gt(0)').find('a').hide();
		}
	}

});

/*
Copyright 2021 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/
