// Adds a link to All Courses directly ont he dashboard.  Helps users find future or concluded courses and reduced amount of tickets about "missing" courses at the end of a term.
var do_customizations = function(){
	// Checks if page is dashboard
	if (window.location.pathname=='/') {
		document.getElementById('DashboardCard_Container').insertAdjacentHTML('beforebegin', '<div><p>Additional courses, including those from previous semesters, may be found on your <a href="/courses">All Courses</a> page.</p></div>');
	}
}

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	do_customizations();
} else {
	document.addEventListener("DOMContentLoaded", do_customizations);
}
