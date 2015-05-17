var covers = (function() {


	var _init = function(settings)
	{
		var $tech = $("#technology");

		$.getJSON( "covers.json", function( data ) {
		  $.each( data, function( key, val ) {
		  	var c = "mix"
		  	for(var i in val.tech)
		  	{
		  		var t = val.tech[i].toLowerCase().replace(/ |\./g, "_");
		  		c += " tech_" + t;
		  		if(!(t in $tech))
		  		{
		  			$tech[t] = $("<button/>", {
		  				"text" : val.tech[i],
		  				"class" : "filter",
		  				"data-filter" : ".tech_" + t
		  			});
					  $tech[t].insertAfter($tech);
		  		}
		  	}
			  var cover = $("<div/>", { 
			  	"class": c
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