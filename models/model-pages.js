$.getJSON('../public/data.json', function(data) {
  $.getJSON('../public/data-link.json', function(links) {
    params = parsePageURL();
    //renderCurrentPage(params, data, links);
    renderCurrentPageFromLinks(params, data, links);
    activateButtons();
    var videos = document.getElementsByTagName('video');
    for (var i=0; i<videos.length; i++) {
      videos[i].addEventListener('loadeddata', playAllVideos, false);
    }
  })
})


var playAllVideos = function() {
  var videos = document.getElementsByTagName('video');
  for (var i=0; i<videos.length; i++) {
    videos[i].play();
  }
}


// Parse the current page URL argument
var parsePageURL = function( ) {
  url = window.location.href;
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  obj = {};
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];
    // split our query string into its component parts
    var arr = queryString.split('&');
    for (var i=0; i<arr.length; i++) {
      var a = arr[i].split('=');
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];
      paramName = paramName;
      paramValue = paramValue;
      obj[paramName] = paramValue;
    }
  }
  return obj;
}


var renderCurrentPageFromLinks = function(params, data, links) {
  var curr_data = {
    name: params["id"],
    stats_room: 1,
    stats_nav: 2,
    stats_area: 2,
    stats_floor: 3,
    split_full: 'None',
    split_medium: 'None',
    split_tiny: 'None',
    split_full_plus: 'None',
  }

  for (var i = 0; i < data.length; i++) {
    model = data[i];
    curr_link = links[model["id"]];
    if (params["id"] === model["id"]) {
      curr_data["name"] = model["id"];
      curr_data["stats_room"] = model["stats"]["room"];
      curr_data["stats_nav"] = model["stats"]["navigation_complexity"];
      curr_data["stats_ssa"] = model["stats"]["ssa"];
      curr_data["stats_area"] = model["stats"]["area"];
      curr_data["split_full"] = jsUcfirst(model["split_full"]);
      curr_data["split_medium"] = jsUcfirst(model["split_medium"]);
      curr_data["split_tiny"] = jsUcfirst(model["split_tiny"]); 
      curr_data["split_full_plus"] = jsUcfirst(model["split_full+"]);
      
      // Web links
      curr_data["pano_0"] = curr_link["pano_0"];
      curr_data["pano_1"] = curr_link["pano_1"];
      curr_data["pano_2"] = curr_link["pano_2"];
      curr_data["pano_3"] = curr_link["pano_3"];
      
      curr_data["mesh_0"] = curr_link["mesh_0"];
      curr_data["mesh_1"] = curr_link["mesh_1"];
      curr_data["mesh_2"] = curr_link["mesh_2"];
      curr_data["mesh_3"] = curr_link["mesh_3"];
      curr_data["mesh_4"] = curr_link["mesh_4"];
      curr_data["mesh_5"] = curr_link["mesh_5"];

      curr_data["record_0"] = curr_link["record_0"];
      curr_data["record_1"] = curr_link["record_1"];
      curr_data["record_2"] = curr_link["record_2"];
      curr_data["record_3"] = curr_link["record_3"];

      curr_data["scenario_0"] = curr_link["scenario_0"];
      curr_data["scenario_1"] = curr_link["scenario_1"];
      curr_data["scenario_2"] = curr_link["scenario_2"];
      curr_data["scenario_3"] = curr_link["scenario_3"];

      var template = document.getElementById('model-template-link').innerHTML;
      var renderModel = Handlebars.compile(template);
      document.getElementById('model-body').innerHTML = renderModel(curr_data);  
      return;    
    }
  }
  var template = document.getElementById('model-template-fail').innerHTML;
  var renderModel = Handlebars.compile(template);
  document.getElementById('model-body').innerHTML = renderModel(curr_data);  

}


var renderCurrentPage = function(params, data, links) {
  var curr_data = {
    name: params["id"],
    stats_room: 1,
    stats_nav: 2,
    stats_area: 2,
    stats_floor: 3,
    split_full: 'None',
    split_medium: 'None',
    split_tiny: 'None',
  }

  for (var i = 0; i < data.length; i++) {
    model = data[i];
    if (params["id"] === model["id"]) {
      curr_data["name"] = model["id"];
      curr_data["stats_room"] = model["stats"]["room"];
      curr_data["stats_nav"] = model["stats"]["navigation_complexity"];
      curr_data["stats_ssa"] = model["stats"]["ssa"];
      curr_data["stats_area"] = model["stats"]["area"];
      curr_data["split_full"] = jsUcfirst(model["split_full"]);
      curr_data["split_medium"] = jsUcfirst(model["split_medium"]);
      curr_data["split_tiny"] = jsUcfirst(model["split_tiny"]); 
      var template = document.getElementById('model-template').innerHTML;
      var renderModel = Handlebars.compile(template);
      document.getElementById('model-body').innerHTML = renderModel(curr_data);  
      return;    
    }
  }
  var template = document.getElementById('model-template-fail').innerHTML;
  var renderModel = Handlebars.compile(template);
  document.getElementById('model-body').innerHTML = renderModel(curr_data);  

}


var activateButtons = function() {
    // Model data filter
  $("#model-data-flters li").click ( function() {
    console.log("Click")
    $("#model-data-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#model-data-wrapper").fadeTo(100, 0);

    $(".model-data-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function() {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#model-data-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

}


function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}