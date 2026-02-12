(async function addCourseNavigationExternalToolVisibilityIcon(){
	/* 
	Wait until element decsribed by the input CSS Selector String exists
	Last updated 2015-11-12
	*/
	function waitForElm(cssSelectorStr) {
		return new Promise(resolve => {
			if (document.querySelector(cssSelectorStr)) {
				return resolve(document.querySelector(cssSelectorStr));
			}

			const observer = new MutationObserver(mutations => {
				if (document.querySelector(cssSelectorStr)) {
					observer.disconnect();
					resolve(document.querySelector(cssSelectorStr));
				}
			});

			// If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}

	/* 
	A generic function to get the results of a Canvas API call to the input URL.
	- Does not do any additional authentication.
	- Will get all pages of paginated calls
	Last updated 2015-11-12
	*/
	async function canvasApiGet(urlStr) {
		try {
			let requestUrlStr
			// Set up headers
			const headersObj = {
				'Content-Type': 'application/json'
			};

			// Add per_page parameter to URL if it was not included already.  This will maximize the results per request
			if (!urlStr.includes('per_page')) {
				let separator = urlStr.includes('?') ? '&' : '?';
				requestUrlStr = `${urlStr}${separator}per_page=100`;
			} else {
				requestUrlStr=urlStr;
			}

			let repeat=true;
			let returnKeyStr=null;
			let returnData=[];
			// Make the first API call
			let response = await fetch(requestUrlStr,{headers:headersObj});
			while (repeat) {
				if (!response.ok) {
				  const errorText = await response.text();
				  throw new Error(`Canvas API error: ${response.status} ${response.statusText}. ${errorText}`);
				}

				data = await response.json();
				if ((typeof data ==='object') && (!Array.isArray(data))) {
					keys=Object.keys(data);
					if ((keys.length==1) && (Array.isArray(data[keys[0]]))) {
						returnKeyStr=keys[0];
						data=data[returnKeyStr];
					} else {
						returnData=data;
						repeat=false;
					}
				}
				if (Array.isArray(data)) {
					returnData.push(...data)
					// Check if there's a next page in the Link header
					const linkHeaderObj = parseLinkHeader(response.headers.get('Link'));
					requestUrlStr=linkHeaderObj.current
					lastUrl=linkHeaderObj.last
					if ((requestUrlStr!=lastUrl) && ('next' in linkHeaderObj)) {
						requestUrlStr=linkHeaderObj.next;
						response = await fetch(requestUrlStr,{headers:headersObj});
					} else {
						repeat=false;
					}
				} else {
					repeat=false;
				}
			}
			if (returnKeyStr) {
				return {returnKeyStr : returnData};
			} else {
				return returnData;
			}	
		} catch (error) {
			console.error('Error calling Canvas API:', error);
			throw error;
		}
	}

	/* 
	Parse a link header string into an object
	Last updated 2015-11-12
	*/
	function parseLinkHeader(linkHeaderStr) {
		let linksObj = {};
		if (linkHeaderStr) {
			// Split the header into individual link parts
			const linkHeaderPartsStrArr = linkHeaderStr.split(',');
			linkHeaderPartsStrArr.forEach(linkHeaderPartStr => {
				// Extract the URL and parameters
				const linkHeaderPartStrArr = linkHeaderPartStr.match(/<([^>]+)>;\s*(.*)/);
				if (linkHeaderPartStrArr) {
					const urlStr = linkHeaderPartStrArr[1];
					const paramsStr = linkHeaderPartStrArr[2];
					const linkObj = { urlStr: urlStr };
					// Parse parameters
					const paramPairsStrArr = paramsStr.split(';');
					paramPairsStrArr.forEach(paramPairStr => {
						const paramMatchStrArr = paramPairStr.trim().match(/([^=]+)="?([^"]+)"?/);
						if (paramMatchStrArr) {
							const key = paramMatchStrArr[1].trim();
							const value = paramMatchStrArr[2].trim();
							linkObj[key] = value;
						}
					});
					// Use the 'rel' parameter as the key for the object
					if (linkObj.rel) {
						linksObj[linkObj.rel] = linkObj;
					}
				}
			});
		}
		return linksObj;
	}
	
	/*
	Adds an accessible tooltip to a link element using aria-describedby
	@param {HTMLElement} targetElm - The link element to add tooltip to
	@param {string} tooltipText - The text content for the tooltip
	*/
	function addAccessibleTooltip(targetElm, tooltipText, tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`) {

		// Create the tooltip element
		const tooltipElm = document.createElement('div');
		tooltipElm.textContent = tooltipText;
		tooltipElm.classList.add('ui-tooltip-content');
		// Create tooltip container element, mimicing Instructure-created tooltips
		const tooltipContainerElm=document.createElement('div');
		tooltipContainerElm.id=tooltipId
		tooltipContainerElm.setAttribute('role', 'tooltip');
		tooltipContainerElm.classList.add('ui-tooltip', 'ui-widget', 'ui-corner-all', 'ui-widget-content', 'center', 'bottom', 'vertical');
		tooltipContainerElm.style.opacity = '0';
		tooltipContainerElm.style.transition = 'opacity 0.5s ease-in-out';
		// Add tooltip to container, then add the container to the document body
		tooltipContainerElm.appendChild(tooltipElm);
	  
		// Function to show tooltip
		function showTooltip() {
			document.body.appendChild(tooltipContainerElm);
			// Position the container properly
			tooltipContainerElm.style.setProperty('top',`${targetElm.getBoundingClientRect().top-tooltipContainerElm.getBoundingClientRect().height-5}px`,'important');
			tooltipContainerElm.style.setProperty('left',`${targetElm.getBoundingClientRect().left-8}px`,'important');
			// Associate the tooltip with the menu item for accessibility purposes
			targetElm.setAttribute('aria-describedby', tooltipId);
			// Fade in the container element
			tooltipContainerElm.style.opacity = '1';
		}
	  
		// Function to hide and remove tooltip
		function hideTooltip() {
			tooltipContainerElm.style.opacity = '0';
			// Disassociate the tooltip with the menu item for accessibility purposes
			targetElm.removeAttribute('aria-describedby');
			setTimeout(() => {
				if (tooltipContainerElm.parentNode) {
					document.body.removeChild(tooltipContainerElm);
				}
			}, 500);
		}

		// Mouse events
		targetElm.addEventListener('mouseenter', showTooltip);
	  
		// Keyboard events - show on focus, hide on blur
		targetElm.addEventListener('focus', showTooltip);
		targetElm.addEventListener('blur', hideTooltip);
	  
	  
		// Mouseout event - hide tooltip
		targetElm.addEventListener('mouseleave', hideTooltip);
	  
		// Hide tooltip on scroll
		window.addEventListener('scroll', function() {
			if (tooltipContainerElm.parentNode) {
				hideTooltip();
				}
			}, { passive: true });
	}

	const urlPathStrArr=window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');	
	// is current page in a course
	if ((urlPathStrArr[0]=='courses') && (urlPathStrArr[1])) {
		// Add slashed eyeball to LTI course navigation items only visible to course Admins (account admins, teachers, etc)
		if (['admin','teacher','ta','designer'].filter(element => ENV.current_user_roles.includes(element)).length>0) {
			let canvasHiddenExtToolIdArr;
			// Retrieve array of tool_ids to hide form session storage
			storedCanvasHiddenExtToolIdArrObj=JSON.parse(sessionStorage.getItem(`canvasHiddenExtToolIdArr-${urlPathStrArr[1]}`));
			// If array was retireved and is less than 24 hours old, use that.  Otherwise make an API call to get a new list and store that list
			if ((storedCanvasHiddenExtToolIdArrObj) && (storedCanvasHiddenExtToolIdArrObj.timestamp>Date.now()-24*60*60*1000)) {
				canvasHiddenExtToolIdArr=storedCanvasHiddenExtToolIdArrObj.value;
			} else {
				let canvasExtToolObjArr=await canvasApiGet(`/api/v1/courses/${urlPathStrArr[1]}/external_tools?include_parents=true&placement=course_navigation`);
				canvasHiddenExtToolIdArr=[];
				canvasExtToolObjArr.forEach((canvasExtToolObj) => {
					if ((canvasExtToolObj?.course_navigation?.visibility==='admins') || (canvasExtToolObj?.course_navigation?.label==='Item Banks')) {
						canvasHiddenExtToolIdArr.push(canvasExtToolObj.id);
					}
				});
				sessionStorage.setItem(`canvasHiddenExtToolIdArr-${urlPathStrArr[1]}`,JSON.stringify({'value':canvasHiddenExtToolIdArr, 'timestamp':Date.now()}));
			}
			waitForElm('#section-tabs').then((elm) => {
				// For each tool that has course-navigation visibility set to "admin"
				canvasHiddenExtToolIdArr.forEach((extToolId) => {
					// Find the coresponding course navigation element
					const courseNavExtToolElm=document.querySelector(`#section-tabs [class^="context_external_tool_${extToolId}"]`);
					// Continue if the element was found. If the element was not found, the menu item must be disabled.
					if (courseNavExtToolElm) {
						// Add slashed eyeball icon and accessibility info to element
						courseNavExtToolElm.insertAdjacentHTML('beforeend','<i class="nav-icon icon-off" aria-hidden="true" role="presentation"></i>');
						courseNavExtToolElm.setAttribute('aria-label', `${courseNavExtToolElm.textContent}. Not visible to students`);
						courseNavExtToolElm.setAttribute('data-html-tooltip-title', 'Not visible to students');
						courseNavExtToolElm.parentElement.classList.add('section-hidden')
						// Display tooltip when mouse is over element
						addAccessibleTooltip(courseNavExtToolElm,`${courseNavExtToolElm.textContent}. Not visible to students`,`ui-tooltip-context_external_tool_${extToolId}`);
					}
				});
			});
		}
	}
})();
