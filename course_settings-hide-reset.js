$(document).ready(function(){
	
	// Checks if page is course settings
	if (/^\/courses\/[0-9]+\/settings$/.test(window.location.pathname)) {
		// Checks that current user role is not an admin. Admins can access all settings.
		if($.inArray('admin',ENV.current_user_roles) == -1){
			// Hides course reset button
			$('a[href*=\'reset\']').hide();
		}
	}

});
