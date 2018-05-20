
num_page = 30;
num_image = 20;

page_nav_data = '<a href="?page={0}"><li data-filter=".filter-app" class="{1}">{2}</li> </a>';

String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}

var parseCurrentPage = function() {
	params = parsePageURL();
	if (params['page']) {
		goToGallery();
	}
	if (!params['page'])  {
		params['page'] = 1;
	}
	//console.log(params)
	generateGalleryCardList();
	generatePageLinkList(params['page']);
}


var goToGallery = function() {
	window.location.hash = '#gallery'
}


// Create array of gallery cards (buildings) for display
var generateGalleryCardList = function(data) {
	var generateGalleryCard = function(info) {
		$('#gallery-data-wrapper').append(createOneGalleryCard(info));
	}
	for (var i = 0; i < num_page; i++) {
		info = {
			'img_b': "../public/img/models_small/rsz_19_psych.png",
			'img_m': "../public/img/models_small/rsz_19_psych.png",
			'caption': "Image Caption",
			'title': "Model",
			'subtitle': "Psych Building"
		}
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
	for (var i = 1; i < num_image + 1; i++) {
		generatePageLink(i);
	}
}


var createOneGalleryCard = function (info) {
	/*
	Param: Info
		img_b: thumbnail image,
		img_m: large image,
		caption: image description
		title: image title
		subtitle: small title appearing beneath title
	*/
	gallery_card_data = ' <div class="col-lg-3 col-md-6 platform-data-item filter-card">		\
          <figure itemprop="associatedMedia" itemscope>	\
            <a href={0} itemprop="contentUrl" data-size="1024x768">\
                <img src={1} itemprop="thumbnail" alt="Image description" />\
            </a>\
            <figcaption itemprop="caption description">{2}</figcaption>\
            <div class="details">\
              <h4>{3}</h4>\
              <span>{4}</span>\
            </div>\
          </figure>\
        </div>'
    return gallery_card_data.format(info['img_b'], info['img_m'], info['caption'], info['title'], info['subtitle'])
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
  return obj;
}

parseCurrentPage();