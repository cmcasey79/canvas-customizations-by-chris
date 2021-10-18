//DEPRICATED As of 2021, Instructure has changed date functionality and this script is no longer functional or needed.  Preserving for archives.
//Disables course settings start and end boxes fr non-admins
$(document).ready(function(){

	// Checks if page is course settings
	if (/^\/courses\/[0-9]+\/settings$/.test(window.location.pathname)) {
		// Checks that current user role is not an admin. Admins can access all settings.
		if($.inArray('admin',ENV.current_user_roles) == -1){
			// Disables 'Starts' date
			$('#course_start_at').prop('disabled',true);
			$('#course_start_at').removeClass('date_entry hasDatepicker');
			$('#course_start_at + button.ui-datepicker-trigger').hide();
			// Disables "Ends' date and fixes display flaw introduced by lack of datepicker
			$('#course_conclude_at').prop('disabled',true);
			$('#course_conclude_at').removeClass('date_entry hasDatepicker');
			$('#course_conclude_at + button.ui-datepicker-trigger').hide();
			$('[name=\'course[restrict_enrollments_to_course_dates]\'').before('<div class="datetime_suggest"></div>');
			// Disables the 'Users can only participate in the course between these dates' checkbox
			$('#course_restrict_enrollments_to_course_dates').prop('disabled',true);	
		}
	}

});

/*
Copyright 2019 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/
