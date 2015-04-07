var covers = (function() {


	var _init = function(settings)
	{

		$.getJSON( "covers.json", function( data ) {
		  $.each( data, function( key, val ) {
		  	console.log(key, val);
			  var cover = $("<div/>", { 
			  	"class": "mix category-1" 
			  });
			  cover.css("background-image", "url(covers/" + val.image + ")");  
			  cover.appendTo(settings.cover_container);
		  });
		 
		  settings.cover_container.mixItUp();
		});

	}

	return {
		init : _init
	}

})();