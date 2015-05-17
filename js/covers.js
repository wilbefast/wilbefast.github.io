var covers = (function() {


	var _init = function(settings)
	{
		var sort = settings.sorting;
		var tech = settings.technology;
		var container = settings.cover_container;

		$.getJSON( "covers.json", function( data ) {
		  $.each( data, function( key, val ) {
		  	var c = "mix cover"
		  	for(var i in val.tech)
		  	{
		  		var t = val.tech[i].toLowerCase().replace(/ |\./g, "_");
		  		c += " tech_" + t;
		  		if(!(t in tech))
		  		{
		  			var option = tech[t] = $("<option/>", { 
		  				"value" : ".tech_" + t,
		  				"text" : val.tech[i]
		  			});
					  option.appendTo(tech);
		  		}
		  	}
		  	var link = $("<a/>", {
		  		"data-toggle" : "modal",
		  		"data-target" : "#popup"
		  	});
			  var cover = $("<div/>", { 
			  	"class": c,
			  	"data-year" : val.started,
			  	"data-name" : val.name.charCodeAt(0),
			  });
			  var image = $("<div/>", {
			  	"style" : "background-image : url('covers/" + val.image + "')"
			  });
			  var label = $("<label/>", {
			  	"text" : val.name
			  })
			  image.appendTo(cover);
			  label.appendTo(cover);
			  cover.appendTo(link);
			  link.appendTo(container);
		  });
		 
		 	// Filters
	    tech.on('change', function(){
		    container.mixItUp('filter', this.value);
		  });

	    // Sorts
	    sort.on('change', function(){
		    container.mixItUp('sort', this.value);
		  });

		 	// All done !
		  container.mixItUp();
		 	container.mixItUp('sort', "name:asc");
		});

	}

	return {
		init : _init
	}

})();