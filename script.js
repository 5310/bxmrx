$(document).ready(function() {
	
	// Urls
	$('#urls').change(function() {
		console.log('!');
	});

	// Add
	$('#addurl').click(function() {
		$('#urls').append('<div class="row"><input class="url" type="url" placeholder="url" required pattern="https?://.+"/><input class="delete" type="button" value="delete"/></div>');
	});
	
	// Delete
	$(document).on("click", '.delete', function() {
		console.log($(this).parent().find('.url')[0].value);
	});
	
	// Enter
	$('#enter').click(function() {
		console.log($('#urls')[0].checkValidity());
	});
	
	// Generated Url
	$('#shorturl').focus(function() {
		console.log(321);
		$(this).select();
	});
	$('#shorturl').mouseup(function(e){ // fix for chrome and safari
        e.preventDefault();
	});

});
