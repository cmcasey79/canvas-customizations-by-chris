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
