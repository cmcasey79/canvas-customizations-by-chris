$(document).ready(function(){

	// Checks if page is course settings
	if (/^\/courses\/[0-9]+\/settings$/.test(window.location.pathname)) {
		// Checks that current user role is not an admin to hide term start end date and visibility options. Admins can access all settings.
		if($.inArray('admin',ENV.current_user_roles) == -1){
			// Hides course delete button
			$('a.btn.button-sidebar-wide.delete_course_link').hide();
		}
	}

});
