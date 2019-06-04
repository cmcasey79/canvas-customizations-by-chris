$(document).ready(function(){

	// Check if page is user profile
	if (/^\/profile$/.test(window.location.pathname)) {
		// Checks that current user role is not an admin to hide default email change icon. Admins can access all settings.
		if($.inArray('admin',ENV.current_user_roles) == -1){
			//Hide links to change default email
			$('.email_meta:gt(0)').find('a').hide();
		}
	}

});
