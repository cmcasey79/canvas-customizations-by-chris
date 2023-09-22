// Returns an object with a role list and type list for the user based on the current page that is loaded
// For some consistency, this function returns data according to the following rules:
//   - Course roles have 'Course:' appended before the official role name
//   - Course types have 'Course:' appended before the official role type
//   - Account admin roles will have 'Account:' appended before the official role name
//   - Account admin types will be 'Account:admin'
//   - Lists will be empty if the user does not have an official role in the current content (for example a non-admin user on the course dashboard)
var get_user_context_roles = function(){
	canvas_account_id=ENV.DOMAIN_ROOT_ACCOUNT_ID;
	role_dict={role:[],type:[]};
	// Checks if the page is somewhere inside a course
	if (window.location.pathname.slice(1).split('/')[0] == 'courses') {
		let request = new XMLHttpRequest();
		// Gets course API response
		request.open('GET','/api/v1/courses/'+window.location.pathname.slice(1).split('/')[1],false);
		request.onload = function() {
			if (request.status == 200) {
				response_obj=JSON.parse(request.response);
				// save the course account id for later admin check
				canvas_account_id=response_obj.account_id
				// adds any roles returned by the API to the return object
				for (let i = 0; i < response_obj.enrollments.length; i++) {
					role_dict.type.push('Course:'+response_obj.enrollments[i].type);
					if (response_obj.enrollments[i].type+'enrollment' == response_obj.enrollments[i].role.toLowerCase()) {
						role_dict.role.push('Course:'+response_obj.enrollments[i].role.slice(0,-10));
					}
					else {
						role_dict.role.push('Course:'+response_obj.enrollments[i].role);
					};
				};
			};
		};
		request.send();
	};
	// Checks if the user is some kind of admin anywhere in Canvas
	if (ENV.current_user_roles.includes('admin')) {
		// If on an account page, start at that level
		if (/^\/accounts\/[0-9]+/.test(window.location.pathname)) {
			canvas_account_id=window.location.pathname.split('/')[2];
		};
		// Starting at the current subaccount, find all admin roles, then go to parent account and repeat until finished
		while (canvas_account_id !== null) {
			let request = new XMLHttpRequest();
			request.open('GET','/api/v1/accounts/'+canvas_account_id+'/admins?user_id[]='+ENV.current_user_id,false);
			request.onload = function() {
				if (request.status == 200) {
					response_obj=JSON.parse(request.response);
					for (let i = 0; i < response_obj.length; i++) {
						if (response_obj.parent_account_id == null) {
							role_dict.role.push('RootAccount:'+response_obj[i].role);
							if (!(role_dict.type.includes('RootAccount:admin'))) role_dict.type.push('RootAccount:admin');
						}
						if (!(role_dict.role.includes('Account:'+response_obj[i].role))) role_dict.role.push('Account:'+response_obj[i].role);
						if (!(role_dict.type.includes('Account:admin'))) role_dict.type.push('Account:admin');
					};
				};
			};
			request.send();	
			request = new XMLHttpRequest();
			request.open('GET','/api/v1/accounts/'+canvas_account_id,false);
			request.onload = function() {
				if (request.status == 200) {
					response_obj=JSON.parse(request.response);
					for (let i = 0; i < response_obj.length; i++) {
						role_dict.type.push('Account '+response_obj[i].role);
					};
					canvas_account_id=response_obj.parent_account_id;
				};
			};
			request.send();	
		};
	};
	return role_dict;
}
