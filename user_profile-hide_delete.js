$(document).ready(function(){

	// Check if page is user profile
	if (/^\/profile$/.test(window.location.pathname)) {
		// Hide the delete link on the profile page
		$("a:contains('Delete My Account')").hide();
	}

});
