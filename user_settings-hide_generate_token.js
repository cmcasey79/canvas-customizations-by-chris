function generate_announcementbox_html (content_html,announcement_importance='low',announcement_type='') {
	// set announcement class (color) based on announcement_importance parameter
	let announcement_class;
	switch(announcement_importance){
		case 'high':
			announcement_class='ic-notification--danger'
			break;
		case 'medium':
			announcement_class='ic-notification--alert'
			break;
		case 'low':
		default:
			announcement_class='ic-notification--info'
			break;
	}
	// set icon based on announcement_type parameter
	let icon_html;
	switch(announcement_type){
		case 'calendar':
			icon_html='<div class=\'ic-notification__icon\' role=\'presentation\'><i class=\'icon-calendar-month\'></i><span class=\'screenreader-only\'>calendar</span></div>'
			break;
		case 'info':
			icon_html='<div class=\'ic-notification__icon\' role=\'presentation\'><i class=\'icon-info\'></i><span class=\'screenreader-only\'>information</span></div>'
			break;
		case 'question':
			icon_html='<div class=\'ic-notification__icon\' role=\'presentation\'><i class=\'icon-question\'></i><span class=\'screenreader-only\'>question</span></div>'
			break;
		case 'warning':
			icon_html='<div class=\'ic-notification__icon\' role=\'presentation\'><i class=\'icon-warning\'></i><span class=\'screenreader-only\'>warning</span></div>'
			break;
		case 'error':
			icon_html='<div class=\'ic-notification__icon\' role=\'presentation\'><i class=\'icon-warning\'></i><span class=\'screenreader-only\'>error</span></div>'
			break;
		default:
			icon_html='';
	}
	// build entire announcement box html
	let announcement_html='<div id=\'announcementWrapper\'><div class=\'ic-notification '+announcement_class+'\'>'+icon_html+'<div class=\'ic-notification__content\'><div class=\'ic-notification__message\'>'+content_html+'</div></div></div></div>';
	return announcement_html;
}

async function do_global_customizations(){
	let urlPathArray=window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');	
	switch(urlPathArray[0]){
		case 'profile':
			// is page user settings
			if (urlPathArray[1]=='settings') {
				// insert custom token announcement
				document.querySelector('div:has(> a.add_access_token_link)').insertAdjacentHTML('beforebegin',generate_announcementbox_html('<p style=\'margin-top:0\'>To request an access token for a new unofficial or unapproved service, please fill out the <a href="<url>">Canvas Access Token Request form</a>.</p>','low','info'));
				// allow admins to generate tokens for themselves
				if (ENV.current_user_roles.indexOf('admin')>=0)
					document.querySelector('div:has(> a.add_access_token_link)').style.display='inline-block';
			}
	}
};

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
	do_global_customizations();
} else {
	document.addEventListener('DOMContentLoaded', do_global_customizations);
}