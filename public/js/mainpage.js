$(document).ready(function(){
	//listener for button
	$('#userBtn').click(function(){
		//send get ajax call
		$.get( "/api/v1/users", function( data ) {
			$( "#ajax_response" ).html( JSON.stringify(data) );
		});
	});
});