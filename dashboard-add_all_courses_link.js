// Adds a link to All Courses directly ont he dashboard.  Helps users find future or concluded courses and reduced amount of tickets about "missing" courses at the end of a term.
$(document).ready(function(){

	// Checks if page is dashboard
	if (window.location.pathname=='/') {
		$('#DashboardCard_Container').before('<div><p>Additional courses, including those from previous semesters, may be found on your <a href="/courses">All Courses</a> page.</p></div>');
	}

});
