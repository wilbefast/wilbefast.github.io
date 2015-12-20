var covers = (function() {

	var _popup;

	var _covers = {}

	var _select = function(cover) {
		_popup.modal('show');
		var image = _popup.find("#popup_image");
		image.show();
		image.attr("src", "covers/" + cover.image);
		_popup.find("#popup_title").text(cover.name);
		$.getJSON("info/" + cover.key + ".json", function(data) {
			// description
			if(data.description)
			{
				_popup.find(".description").show();
				var description = "";
				for(var i in data.description)
					description += data.description[i];
				_popup.find("#popup_description").text(description);
			}
			else
				_popup.find(".description").hide();

			// embed
			var embed_root = _popup.find("#popup_embed");
			embed_root.empty();
			if(data.embed)
			{
				image.hide();

				// youtube video
				if(data.embed.youtube)
				{
					var url = "https://www.youtube.com/embed/"+data.embed.youtube;
					var video = ($("<iframe width=\"500\" height=\"350\" src=\"" 
						+ url + "\"frameborder=\"0\" allowfullscreen></iframe>"));
					embed_root.append(video);
				}
				// vine video
				else if(data.embed.vine)
				{
					var url = "https://vine.co/v/" + data.embed.vine + "/embed/simple";
					var video = ($("<iframe width=\"500\" height=\"350\" src=\""
						+ url + "\"frameborder=\"0\" allowfullscreen></iframe>"));
					embed_root.append(video);
				}
				// twitter video
				else if(data.embed.twitter_video)
				{
					var url = "https://twitter.com/" + data.embed.twitter_video;
					var video = ($("<blockquote class=\"twitter-video\" lang=\"en\"><a href=\"" 
						+ url + "\"></a></blockquote>"));
					embed_root.append(video);
				}
			}

			// team members
			if(data.team)
			{
				_popup.find(".team").show();
				var team_table = _popup.find("#popup_team");
				team_table.empty();
				for(var role in data.team)
				{
					var members = data.team[role];

					var row = $("<tr/>");
					row.append($("<td/>", { text: role}));
					var members_string = "";
					for(var i in members)
					{
						members_string += members[i];
						if(i >=  members.length - 1)
							members_string += ".";
						else
							members_string += ", ";
					}
					row.append($("<td/>", { text: members_string}));
					team_table.append(row);
				}
			}
			else
				_popup.find(".team").hide();

			// external links
			if(data.links)
			{
				_popup.find(".links").show();
				var links_list = _popup.find("#popup_links");
				links_list.empty();
				for(var link in data.links)
				{
					var href = data.links[link];
					links_list.append($("<li/>").append($("<a/>", { 
						text : link, 
						href : href,
						target : "_blank"
					})));
				}
			}
			else
				_popup.find(".links").hide();

		}).fail(function( jqXHR, textStatus, errorThrown) {
			console.error(textStatus, "while retrieving JSON file for cover", cover.key, textStatus, errorThrown);
		});
	}

	var _init = function(settings)
	{
		var sort = settings.sorting;
		var tech = settings.technology;
		var container = settings.cover_container;

		_popup = settings.popup;
		_popup.on('hidden.bs.modal', function () {
		  _popup.find("#popup_embed").empty();
		})

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