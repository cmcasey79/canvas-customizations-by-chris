var do_customizations = function(){
  if (/^\/courses\/[0-9]+\/content_migrations$/.test(window.location.pathname)) {
  	function disableDateAdjust() {
  		element=document.getElementById("dateAdjustCheckbox")
  		if (typeof(element) != 'undefined' && element != null) {
  			element.disabled=true;
  		}
  	}
  	disableDateAdjust();
  	var ImportObserver = new MutationObserver(function(mutations) { 
  		mutations.forEach(function(mutation) {
  			disableDateAdjust();
  		});
  	});
  	ImportObserver.observe(document.getElementById("converter"), {
  		childList: true
  	}); 
  }
}

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
	do_customizations();
} else {
	document.addEventListener("DOMContentLoaded", do_customizations);
}
