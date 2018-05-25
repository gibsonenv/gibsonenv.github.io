num_page = 30;
num_image = 12;
panoramas = []

page_nav_data = '<a href="?page={0}"><li data-filter=".filter-app" class="{1}">{2}</li> </a>';

var platform_data = [];

$.getJSON('data.json', function(data) {
  platform_data = data;
  num_page = parseInt(data.length / num_image) + 1;
  parseCurrentPage();
  for (var i = 0; i < num_image; i++) {
    panoramas.push(["../public/pano/{0}/{1}_0.png".format(platform_data[i]['id'], platform_data[i]['id'])])
  }
  generateGalleryCardList(params['page']);
  generatePageLinkList(params['page']);
  initPhotoSwipeFromDOM('.my-gallery #gallery-data-wrapper div.platform-data-item');
  render(num_image, panoramas);
})


// Main function to generate current page
var parseCurrentPage = function() {
	params = parsePageURL();
	if (params['page']) {
		goToGallery();
	}
	if (!params['page'])  {
		params['page'] = 1;
	}
}

var goToGallery = function() {
	window.location.hash = '#gallery'
}

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

// Create array of gallery cards (buildings) for display
var generateGalleryCardList = function(curr_page) {
	var generateGalleryCard = function(info) {
		$('#gallery-data-wrapper').append(createOneGalleryCard(info));
	}

	for (var i = 0; i < num_image; i++) {
    curr_img_index = (curr_page - 1) * num_image + i
    //console.log(platform_data[curr_img_index]);
		/*info = {
      // PANO 1
			'img_b0': "../public/img/models_small/rsz_19_psych.png",
			'img_m0': "../public/img/recording.avi",
      'caption0': "Image Caption",
			'title0': "Model",
			'subtitle0': "Psych Building",

      // GIF 1
      'img_b1': "../public/img/recording.avi",
      'img_m1': "../public/img/recording.avi",
      'caption1': "new caption",
      'title1': "Model",
      'subtitle1': "Psych Building"
		}*/

    model_info = platform_data[curr_img_index];
    //info = constructInfoObject(model_info);

    info = {'id': platform_data[curr_img_index]['id'],
            'index': i}
		generateGalleryCard(info);
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

