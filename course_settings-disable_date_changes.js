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
