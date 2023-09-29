// Returns an object with a role set and type set for the user based on the current page that is loaded
// Optionally include admin roles/types.  Including these types may significantly impact the execute time of this function, only use when absolutely necessary
// For some consistency, this function returns data according to the following rules:
//   - Course roles have 'Course:' appended before the official role name
//   - Course types have 'Course:' appended before the official role type
//   - Account admin roles will have 'Account:' appended before the official role name
//   - Account admin types will be 'Account:admin'
//   - Viewers of oublic courses will have enpty sets.
//   - Role may be empty if the user does not have an official role in the current content (for example a non-admin user on the course dashboard)
//   - Type set will always include 'Account:user' and 'RootAccount:user' for logged in users
async function get_user_context_roles(includeAdmin=false){
	// Create canvas_domain and set it to the current host from the URL
	const canvas_domain=window.location.hostname;
	// Create canvas_user_id variable and set it to the current user id via ENV variable
	const canvas_user_id=ENV.current_user_id;
	// Create canvas_account_id variable and set it to the root account id via ENV variable
	let canvas_account_id=ENV.DOMAIN_ROOT_ACCOUNT_ID;
	// Create canvas_course_id and set it to the current course id if inside a course via the URL, otherwise make it null
	let canvas_course_id=(window.location.pathname.slice(0,9) == '/courses/') ? window.location.pathname.split('/')[2] : null;
	// Set up dictionary with role and type sets
	let role_dict={role:new Set(),type:new Set()};
	// If the user is not an anonymous viewer of a public course
	if (canvas_user_id!=null) {
		// Add the default 'Account:user' and 'RootAccount:user' types into the type dictionary, as they apply to all logged in users
		role_dict.type.add('Account:user').add('RootAccount:user');
		// Checks if the current location is somewhere inside a group
		if (/^\/groups\/[0-9]+/.test(window.location.pathname)) {
			// Get the group_id from the URL (ENV variables are inconsistent for this purpose)
			const canvas_group_id=window.location.pathname.split('/')[2]
			// Get group info via the API
			const group_response=await fetch('/api/v1/groups/'+canvas_group_id)
			if (group_response.ok){
				const group_obj=await group_response.json();
				// If it's a course group, set the canvas_course_id for later use
				if (group_obj.context_type='Course') canvas_course_id=group_obj.course_id;
				// If it's an account group, set the canvas_account_id for later use
				if (group_obj.context_type='Account') canvas_account_id=group_obj.account_id;
			}
		}
		// Checks if the current location is an area associated with a course
		if (canvas_course_id!=null) {
			// Get course info via the API
			const course_response=await fetch('/api/v1/courses/'+canvas_course_id)
			if (course_response.ok){
				const course_obj=await course_response.json();
				// Set the canvas_account_id for later use
				canvas_account_id=course_obj.account_id;
				// For each enrollment returned, add appropriate info to the role_dict sets
				course_obj.enrollments.forEach(enrollment => {
					role_dict.type.add('Course:'+enrollment.type);
					role_dict.role.add('Course:'+((enrollment.type+'enrollment' === enrollment.role.toLowerCase()) ? enrollment.role.slice(0, -10) : enrollment.role));
				});
			}
		}
		// Checks if the user is some kind of admin anywhere in Canvas
		if (includeAdmin && (ENV.current_user_roles.includes('admin'))) {
			// ENV indicates user is some sort fo admin, so add Account admin tyoe
			role_dict.type.add('Account:admin');
			// If on an account page, start at that level
			if (/^\/accounts\/[0-9]+/.test(window.location.pathname)) canvas_account_id=window.location.pathname.split('/')[2]
			// Use google apps script code to find admin roles starting from the current subaccount and working back up the account tree.  This may take a significant amount if time depending on the depth of the current location in the canvas account tree.
			const admin_response=await fetch('<<<paste google apps script webapp deploy url here>>>?canvas_user_id='+canvas_user_id+'&canvas_account_id='+canvas_account_id+'&canvas_domain='+canvas_domain)
			if (admin_response.ok){
				const admin_obj=await admin_response.json();
				console.log(admin_obj);
				if (admin_obj.status=='success') {
					// combine existing role and type lists with the admin lists
					admin_obj.data.role.forEach(adminRole => role_dict.role.add(adminRole));
					admin_obj.data.type.forEach(adminType => role_dict.type.add(adminType));
				};
			};
		};
	};
	return role_dict;
}
