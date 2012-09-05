$(document).ready(function() {
	
	// Constants
	var prefix = "bxmrx";
	var keylength = 10;
	var ownurl = "http://5310.github.com/bxmrx/index.html"
	
	
	// Store URLs to OKV.
	$('#enter').click(function() {
		
		// If URLs form valid:
		if ( $('#urls')[0].checkValidity() ) {

			// Display generating URL message.
			$('#shorturl').html("CREATING BXMRX");
			$('#shorturl').fadeIn();
			
			// Create an empty list of URLs.
			var urllist = [];
			// Add each URL to list.
			$('.url').each(function(index) {
				urllist.push($(this)[0].value);
			});
			
			// Generate a key for the list.
			var key = new Date().getDay() + "" + (Math.floor( Math.random() * ( Math.pow(10, keylength) - 1 - Math.pow(10, keylength - 1) ) ) + 1 + Math.pow(10, keylength-1));
			//var key = "test";													//DEBUG:
			
			// Store
			window.remoteStorage.setItem(prefix+key, urllist, function() {
				
				// Set the new bxmrx'd URL to the generated URL field.
				$('#shorturl').html(ownurl + "?k=" + key);
				
				// Clear URLs.
				$('#urls').empty().append('<div class="row"><input class="url" type="url" placeholder="url" required pattern="https?://.+" /><input class="delete" type="button" value="×" /></div>');
				
			});
	
		}
		
	});
	
	
	// Enable or disable the enter button based on form validity.
	$('#urls').bind("propertychange keyup input paste", function() {
		// If form is valid, enable button, else disable it.
		if ( $('#urls')[0].checkValidity() ) {
			$('#enter').removeAttr('disabled');
		} else {
			$('#enter').attr('disabled','disabled');
			// Also hide previously generated entry.
			$('#shorturl').hide(500);
		}
	});
	
	
	// Select generated URL upon focus.
	$('#shorturl').click(function() {
		var doc = document;
		var text = doc.getElementById('shorturl');    
		if (window.getSelection) {
			var selection = window.getSelection();            
			var range = doc.createRange();
			range.selectNodeContents(text);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	});


	// Add new URL entry row.
	$('#addurl').click(function() {
		var row = '<div class="row"><input class="url" type="url" placeholder="url" required pattern="https?://.+"/><input class="delete" type="button" value="×"/></div>';
		$('#enter').attr('disabled','disabled');
		$(row).hide().appendTo('#urls').fadeIn();
	});
	
	
	// Delete URL entry row, or at least clear if the only one.
	$(document).on("click", '.delete', function() {
		
		// If more than one URL entry exists, remove self, or else clear self.
		if ( $('.url').length > 1 ) {
			$(this).parent().hide(500, function() { 
				$(this).remove(); 
				// If form is valid, enable button.
				if ( $('#urls')[0].checkValidity() )
					$('#enter').removeAttr('disabled');
			});
		} else {
			$(this).parent().find('.url')[0].value = "";
		}
	});

	
	// Display URLlist.
	var global_urllist = [];
	display = function(key) {
		
		window.remoteStorage.getItem(prefix+key, function(value, prefixkey) {
			
			// Convert to array if returned as string.							//BUG: Sometimes, OKV returns value as string!
			if ( toType(value) == "string" )
				value = value.split(",");
			
			// If URL-list exists, display them. Or else, display failure message.
			if ( value !== null && value.length > 0 ) {
					
				// Set urllist globally.
				global_urllist = value;
			
				// For all links in URL-list.
				$('#links').empty();
				for ( var i = 0; i < value.length; i++ ) {
				
					// Create all the links.
					var url = value[0].trim();
					var link = '<div><a class="link" href="' + url + '">' + url + '</a></div>';
					$('#links').append(link);

					// Display ALL the things.
					$('#loadingmessage').hide(500, function() {
						$('#launch').html("OPEN BXMRX "+key);
						$('#links').fadeIn();
						$('#launch').fadeIn();
					});
					
				}
				
			} else {
				// Display failure message.
				$('#loadingmessage').hide(100, function() {
					$('#failmessage').fadeIn();
				});
			}
		
		});
		
	};
	
	// Launch an array of URLs.
	launch = function() {
		for ( var i = 0; i<global_urllist.length; i++ ) {
			window.open(global_urllist[i], '');    
		}  
		//close();
	};


	// Get URL parameter.
	parameter = function(name) {
		return decodeURI(
			(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
		);
	}
	// Get type of variable.
	toType = function(obj) {
	  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	}
	
	
	// Set page mode by URL parameter, or lack thereof.
	mode: {
		// If displaying a BXMRX, or making one.
		if ( parameter('k') !== "null" ) {
			$('#show').show();
			display(parameter('k'));
			$('#launch').hide();												//BUG: Fading in from display: none is breaking style for some reason.
		} else {
			$('#make').show();
		}
	};
	

});
