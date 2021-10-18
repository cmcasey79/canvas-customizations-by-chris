// Adds a disclaimer for the course summary on the syllabus page.  Makes it more obvious to students that course content may change, sepecially if they are viewing the syllabus page very early on, or the course is being developed on-the-fly.
$(document).ready(function(){

  // Checks if page is syllabus or homepage
  if ((/^\/courses\/[0-9]+\/assignments\/syllabus$/.test(window.location.pathname)) || (/^\/courses\/[0-9]+$/.test(window.location.pathname))) {
    $('#syllabusContainer').before('<div><p>The following course summary includes only items set up in Canvas as this time.  Additional items may be required outside of Canvas or added to Canvas in the future.</p></div>');
  }

});

/*
Copyright 2019 Christopher Casey

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/
