$(document).ready(function(){

	// Check if page is course homepage
	if (/^\/courses\/[0-9]+$/.test(window.location.pathname)) {
		// Checks that current user role is not an admin. Admins can access all settings.
		if($.inArray('admin',ENV.current_user_roles) == -1){
			// Disables the Unpublish button
			$('.btn-published').prev().addClass('disabled');
		}
	}

});
