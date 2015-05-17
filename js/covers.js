var covers = (function() {

	var _popup;

	var _covers = {}

	var _select = function(cover) {
		_popup.modal('show');
		_popup.find("#popup_image").attr("src", "covers/" + cover.image);
		_popup.find("#popup_title").text(cover.name);
		$.getJSON("info/" + cover.key + ".json", function( data ) {
		});
	}

	var _init = function(settings)
	{
		var sort = settings.sorting;
		var tech = settings.technology;
		var container = settings.cover_container;
		_popup = settings.popup;

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
			  var cover = $("<div/>", { 
			  	"class": c,
			  	"data-year" : val.started,
			  	"data-name" : val.name.charCodeAt(0),
			  	"data-awesome" : val.awesome
			  });
			  val.image = (val.image || key + ".png");
			  var image = $("<div/>", {
			  	"style" : "background-image : url('covers/" + val.image + "')"
			  });
			  var label = $("<label/>", {
			  	"text" : val.name
			  });
			  image.appendTo(cover);
			  label.appendTo(cover);
			  cover.appendTo(container);

			  // Save
			  var c = cover.get(0);
			  c.key = key;
			  c.image = val.image;
			  c.name = val.name;
			  _covers[key] = cover;
		  });

		  // Links
		  for(var key in _covers)
		  	_covers[key].click(function() { _select(this); })
		 
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
		 	container.mixItUp('sort', "awesome:desc");
		});

	}

	return {
		init : _init,
		select : _select
	}

})();