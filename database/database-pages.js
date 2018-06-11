/* Code for rendering main /database/ page
   Author: Zhiyang He
   Reference: buildingparser.stanford.edu
*/

num_page = 30;
num_image = 12;
panoramas = []

page_nav_data = '<a href="?page={0}"><li data-filter=".filter-app" class="{1}">{2}</li> </a>';

var platform_data = [];
var platform_links = {}
var platform_keys = [];

$.getJSON('../public/data.json', function(data) {
  $.getJSON('../public/data-link.json', function(links) {
    platform_data = data;
    platform_links = links;

    var platform_data_clean = [];

    //platform_data.sort(function(a, b) {return  ('' + a.id.attr).localeCompare(b.id.attr);})
    var total_num = platform_data.length;

    num_page = parseInt(total_num / num_image) + 1;
    params = parseCurrentPage();
    for (var i = 0; i < num_page; i++) {
      for (var j = 0; j < num_image; j++) {
        var count = i * num_image + j;
        var model = platform_data[count];
        if (count < platform_data.length) {
          //panoramas.push(["../public/pano/{0}/{1}_0.png".format(model['id'], model['id'])])
          //panoramas.push(["../{0}".format(links[model['id']]['pano_top'])])
          if (Object.keys(links).indexOf(model["id"]) >= 0) {
            panoramas.push("../" + links[model["id"]]['pano_thumb']);
            platform_data_clean.push(platform_data[count]);
          } else {
            //console.log(model["id"] + " not found");
            panoramas.push("../none.png" );
          }
        }
      }
    }
    // Sanitize
    platform_data = platform_data_clean;
    generateGalleryCardList(params['page']);
    generatePageLinkList(params['page']);
    generateSearchList(platform_data);
    initPhotoSwipeFromDOM('.my-gallery #gallery-data-wrapper div.platform-data-item');
    render(num_image, panoramas, params['page']);

  })
})


// Main function to generate current page
var parseCurrentPage = function() {
	params = parsePageURL();
	if (params['page'] && params['page'] > 1) {
		goToGallery();
	}
	if (!params['page'])  {
		params['page'] = 1;
	}
  return params
}

var goToGallery = function() {
	window.location.hash = '#gallery'
}


// Create array of gallery cards (buildings) for display
var generateGalleryCardList = function(curr_page) {
	var generateGalleryCard = function(info) {
		$('#gallery-data-wrapper').append(createOneGalleryCard(info));
	}

  var compileGalleryTemplate = function(compiler, info) {
    $('#gallery-data-wrapper').append(compiler(info))
  }

	for (var i = 0; i < num_image; i++) {
    curr_img_index = (curr_page - 1) * num_image + i
    model_info = platform_data[curr_img_index];
    var thumb_pano = "../none.png";
    var thumb_mesh = "../none.png";
    if (Object.keys(platform_links).indexOf(model_info["id"]) >= 0) {
      thumb_pano = platform_links[model_info["id"]]['pano_thumb'];
      mesh_pano = platform_links[model_info["id"]]['mesh_thumb'];
    }
    info = {'name': model_info['id'],
            'viewer_index': i,
            'pano_index': curr_img_index,
            'pano_link': thumb_pano,
            'mesh_link': thumb_mesh}
    var template = document.getElementById('gallery-entry-template').innerHTML;
    var renderModel = Handlebars.compile(template);
    compileGalleryTemplate(renderModel, info);
	}
}


// Generate list of gallery page redirection links
var generatePageLinkList = function (curr_index) {
	var generatePageLink = function(index) {
		class_name = "";
		if (index === curr_index) {
			class_name = "filter-active"
		}
		$('#gallery-page-nav ul').append(page_nav_data.format(index, class_name, index));
		//console.log("Generating index of", index);
	}
	for (var i = 1; i < num_page + 1; i++) {
		generatePageLink(i);
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
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();
      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(paramValue);
        }
        else {
          obj[paramName][paramNum] = paramValue;
        }
      }
      else {
      	if (paramName === "page") {
      		obj[paramName] = parseInt(paramValue);
      	} else {
	        obj[paramName] = paramValue;
	      }
      }
    }
  }
  if (obj["page"] === undefined) obj["page"] = 1; 
  return obj;
}



/*===================================================================================
  ===================================================================================
                      DEPRECATED CODE, FOR REFERENCE ONLY
  ===================================================================================
  ===================================================================================*/


var createOneGalleryCard = function (info) {
  /*
  Param: Info
    img_b: thumbnail image,
    img_m: large image,
    caption: image description
    title: image title
    subtitle: small title appearing beneath title
  */
  
  /*gallery_card_data = ' <div class="col-lg-12 col-md-12 platform-data-item filter-card">\
                        <div class="box">';
  for (var i = 0; i < info.length; i++) {
      gallery_card_data += ' \
          <figure itemprop="associatedMedia" itemscope> \
            <a href={0} itemprop="contentUrl" data-size="1024x768">\
                <img src={1} itemprop="thumbnail" alt="Image description" />\
            </a>\
            <figcaption itemprop="caption description">{2}</figcaption>\
            <div class="details">\
              <h4>{3}</h4>\
              <span>{4}</span>\
            </div>\
          </figure>'.format(info[i]['img_b0'], info[i]['img_m0'], info[i]['caption0'], info[i]['title0'], info[i]['subtitle0'])  
    
  }
  gallery_card_data += '</div></div>'
  */
  gallery_card_data = template.format(info['id'], info['index']);

  return gallery_card_data;
}



template = '<div class="col-lg-3 col-md-3 platform-data-item filter-card">\
                <div class="box">\
                  <div class="row">\
                      <div class="col-lg-12">\
                        <canvas id="viewer_{1}"></canvas>\
                      </div>\
                      <div class="col-lg-12">\
                        <figure itemprop="associatedMedia" style="text-align: center" itemscope> \
                            <a href="../public/record/{0}/{0}_0.gif" itemprop="contentUrl" data-size="1024x768">\
                            <img src="../public/mesh/{0}_3.png" text-align="center" itemprop="thumbnail" alt="Image description" />\
                            </a>\
                            <figcaption itemprop="caption description">Model Name</figcaption>\
                        </figure>\
                        <figure itemprop="associatedMedia" style="text-align: center" itemscope> \
                            <a href="../public/record/{0}/{0}_1.gif" itemprop="contentUrl" data-size="1024x768">\
                            <figure>\
                            <figcaption itemprop="caption description">Model Name</figcaption>\
                        </figure>\
                        <figure itemprop="associatedMedia" style="text-align: center" itemscope> \
                            <a href="../public/pano/{0}/{0}_1.png" itemprop="contentUrl" data-size="1024x768">\
                            <img src="" text-align="center" itemprop="thumbnail"/>\
                            </a>\
                            <figcaption itemprop="caption description">Model Name</figcaption>\
                        </figure>\
                        <figure itemprop="associatedMedia" style="text-align: center" itemscope> \
                            <a href="../public/mesh/{0}_1.png" itemprop="contentUrl" data-size="1024x768">\
                            <img src="" text-align="center" itemprop="thumbnail"/>\
                            </a>\
                            <figcaption itemprop="caption description">Model Name</figcaption>\
                        </figure>\
                        <figure itemprop="associatedMedia" style="text-align: center" itemscope> \
                            <a href="../public/pano/{0}/{0}_2.png" itemprop="contentUrl" data-size="1024x768">\
                            <img src="" text-align="center" itemprop="thumbnail"/>\
                            </a>\
                            <figcaption itemprop="caption description">Model Name</figcaption>\
                        </figure>\
                        <!--div class="details">\
                          <h4>123</h4>\
                          <span>123</span>\
                        </div-->\
                        </figure>\
                      </div>\
                  </div>\
                </div>\
            </div>'



var constructInfoObject = function(model_info) {

  var model_id = model_info['id'];
  var getGifPath = function(index) {return "../public/record/{0}/{1}_{2}.gif".format(model_id, model_id, index)}
  var getPanoPath = function(index) {return "../public/pano/{0}/{1}_{2}.png".format(model_id, model_id, index)}
  var getModelPath = function(index) {return "../public/mesh/{0}_{1}.png".format(model_id, index)}
  info = [
      // PANO 0
      {'img_b0': getPanoPath(0),
      'img_m0': getPanoPath(0),
      'caption0': "Image Caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // GIF 0
      {'img_b0': getGifPath(0),
      'img_m0': getPanoPath(0),
      'caption0': "Image Caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},


      // PANO 1
      {'img_b0': getPanoPath(1),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // GIF 1
      {'img_b0': getGifPath(1),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // PANO 2
      {'img_b0': getPanoPath(2),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // GIF 2
      {'img_b0': getGifPath(2),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // PANO 3
      {'img_b0': getPanoPath(3),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // GIF 3
      {'img_b0': getGifPath(3),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // Model 0
      {'img_b0': getModelPath(0),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // Model 1
      {'img_b0': getModelPath(1),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title8': "Model",
      'subtitle0': "Psych Building"},

      // Model 2
      {'img_b0': getModelPath(2),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},

      // Model 3
      {'img_b0': getModelPath(3),
      'img_m0': getPanoPath(0),
      'caption0': "new caption",
      'title0': "Model",
      'subtitle0': "Psych Building"},
    ]
    return info
}
