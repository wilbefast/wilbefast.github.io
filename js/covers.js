var covers = (function() {


	var _init = function(settings)
	{
		var $tech = settings.technology

		$.getJSON( "covers.json", function( data ) {
		  $.each( data, function( key, val ) {
		  	var c = "mix cover"
		  	for(var i in val.tech)
		  	{
		  		var t = val.tech[i].toLowerCase().replace(/ |\./g, "_");
		  		c += " tech_" + t;
		  		if(!(t in $tech))
		  		{
		  			var option = $tech[t] = $("<div/>", { 
		  				"class" : "checkbox" 
		  			});
		  			option.append($("<input/>", { 
		  				"type" : "checkbox",
		  				"value" : ".tech_" + t
		  			}));
		  			option.append($("<label/>", {
		  				"text"	: val.tech[i]
		  			}));
					  option.insertAfter($tech);
		  		}
		  	}
		  	var link = $("<a/>", {
		  		"data-toggle" : "modal",
		  		"data-target" : "#popup"
		  	});
			  var cover = $("<div/>", { 
			  	"class": c
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
			  link.appendTo(settings.cover_container);
		  });

		 	checkboxFilter.init();
		 
		  settings.cover_container.mixItUp();

	    /*$filterSelect.on('change', function(){
		    $container.mixItUp('filter', this.value);
		  });*/
		});

	}

	return {
		init : _init
	}

})();