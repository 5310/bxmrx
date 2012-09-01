$(document).ready(function() {
	
	// Constants
	var prefix = "bxmrx";
	var keylength = 10;
	var ownurl = "http://5310.github.com/"
	
	// Store URLs to OKV.
	$('#enter').click(function() {
		
		// If URLs form valid:
		if ( $('#urls')[0].checkValidity() ) {
			
			// Create an empty list of URLs.
			var urllist = [];
			// Add each URL to list.
			$('.url').each(function(index) {
				urllist.push($(this)[0].value);
			});
			
			// Generate a key for the list.
			var key = new Date().getDay() + "" + (Math.floor( Math.random() * ( Math.pow(10, keylength) - 1 - Math.pow(10, keylength - 1) ) ) + 1 + Math.pow(10, keylength-1));
			
			// Store
			window.remoteStorage.setItem(prefix+key, urllist, function() {
				
				// Read															//DEBUG:
				/*window.remoteStorage.getItem(prefix+key, function(value, key) {
					console.log(value);
				});*/
				
				// Set the new bxmrx'd URL to the generated URL field.
				$('#shorturl')[0].value = ownurl + "?k=" + key;
				
				// Focus generated URL.
				$('#shorturl').focus();											//BUG: Not working when called from in here.
				
				// Clear URLs.
				$('#urls').empty().append('<div class="row"><input class="url" type="url" placeholder="url" required pattern="https?://.+" /><input class="delete" type="button" value="delete" /></div>');
				
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
		}
	});
	
	
	// Select generated URL upon focus.
	$('#shorturl').focus(function() {
		console.log("Generated URL selected.");
		$(this).select();
	});
	$('#shorturl').mouseup(function(e){ // fix for chrome and safari
        e.preventDefault();
	});


	// Add new URL entry row.
	$('#addurl').click(function() {
		$('#urls').append('<div class="row"><input class="url" type="url" placeholder="url" required pattern="https?://.+"/><input class="delete" type="button" value="delete"/></div>');
	});
	
	// Delete URL entry row, or at least clear if the only one.
	$(document).on("click", '.delete', function() {
		// If more than one URL entry exists, remove self, or else clear self.
		if ( $('.url').length > 1 ) {
			$(this).parent().hide(500, function() { $(this).remove(); });
		} else {
			$(this).parent().find('.url')[0].value = "";
		}
	});

});
