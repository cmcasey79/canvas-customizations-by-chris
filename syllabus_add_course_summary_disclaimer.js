$(document).ready(function(){

  // Checks if page is syllabus or homepage
  if ((/^\/courses\/[0-9]+\/assignments\/syllabus$/.test(window.location.pathname)) || (/^\/courses\/[0-9]+$/.test(window.location.pathname))) {
    $('#syllabusContainer').before('<div><p>The following course summary includes only items set up in Canvas as this time.  Additional items may be required outside of Canvas or added to Canvas in the future.</p></div>');
  }

});
