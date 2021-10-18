// Adds an HTML section to the syllabus page.  Useful to put university policies here and have them appear automatically on every syllabus.
$(document).ready(function(){

  // Checks if page is syllabus or homepage
  if ((/^\/courses\/[0-9]+\/assignments\/syllabus$/.test(window.location.pathname)) || (/^\/courses\/[0-9]+$/.test(window.location.pathname))) {
    $('#edit_course_syllabus_form').after('<div style="margin-top:2em;margin-bottom:2em;"><h2>Important University-wide Information and Policies:</h2><p>Insert information here...</p></div>');
  }

});

/*
Copyright 2019 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/
