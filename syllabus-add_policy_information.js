$(document).ready(function(){

  // Checks if page is syllabus or homepage
  if ((/^\/courses\/[0-9]+\/assignments\/syllabus$/.test(window.location.pathname)) || (/^\/courses\/[0-9]+$/.test(window.location.pathname))) {
    $('#edit_course_syllabus_form').after('<div style="margin-top:2em;margin-bottom:2em;"><h2>Important University-wide Information and Policies:</h2><p>Insert information here...</p></div>');
  }

});
