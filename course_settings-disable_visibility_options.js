// Disables the course setting "visibility" options from being chaned by non-admins.
$(document).ready(function(){

	// Checks if page is course settings
	if (/^\/courses\/[0-9]+\/settings$/.test(window.location.pathname)) {
		// Checks that current user role is not an admin. Admins can access all settings.
		if($.inArray('admin',ENV.current_user_roles) == -1){
			// Disables the 'Visibility' dropdown
			$('#course_course_visibility').prop('disabled',true);	
			// Disables the 'Visibility' customization checkbox
			$('#course_custom_course_visibility').prop('disabled',true);
			// Disables the 'Syllabus' customization checkbox
			$('#Syllabus').prop('disabled',true);	
		}
	}

});

/*
Copyright 2019 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/
