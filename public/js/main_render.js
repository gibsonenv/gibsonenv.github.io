function render(num_elements, panoramas, curr_page){

	var manualControl = false;
	var longitude = new Array(num_elements).fill(0);
	var latitude = new Array(num_elements).fill(0);
	var savedX = [];
	var savedY = [];
	var savedLongitude = [];
	var savedLatitude = [];
	// panoramas background
	var panoramasArray = {};
	var myFrames = {};
	for (var i = 0; i < num_elements; i++) {
		if (panoramas === undefined) {
			panoramasArray[i] = ["public/2d3ds/Area_1_RGB3.png"];	
		} else {
			panoramasArray[i] = [panoramas[i + (curr_page - 1) * num_elements]];
		}
		myFrames[i] = document.getElementById("viewer_" + i);
	}
	var scene = [];
	var camera = [];
	var sphere = [];
	var sphereMaterial = [];
	var panoramaNumber = [];
	var sphereMesh = [];
	var renderer = [];

	var numPanoramas = num_elements;

	// setting up the renderer
	for (var i = 0; i < numPanoramas; i++) {
		if (myFrames[i] === null) {continue; }
		renderer[i] = new THREE.WebGLRenderer({canvas: myFrames[i]});
		renderer[i].setViewport(0, 0, myFrames[i].clientWidth, myFrames[i].clientHeight);
		renderer[i].setSize(myFrames[i].clientWidth, myFrames[i].clientHeight, false);
		
		scene[i] = new THREE.Scene();
		// adding a camera
		camera[i] = new THREE.PerspectiveCamera(100, myFrames[i].clientWidth / myFrames[i].clientHeight, 1, 1000);
		camera[i].target = new THREE.Vector3(0, 0, 0);
		// creation of a big sphere geometry
		sphere[i] = new THREE.SphereGeometry(100, 100, 40);
		sphere[i].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
		//panoramaNumber[i] = Math.floor(Math.random()*panoramasArray[i].length);
		panoramaNumber[i] = 0;
		sphereMaterial[i] = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(panoramasArray[i][panoramaNumber[i]])});
		// geometry + material = mesh (actual object)
		sphereMesh[i] = new THREE.Mesh(sphere[i], sphereMaterial[i]);
		scene[i].add(sphereMesh[i]);
		// listeners
		// when the mouse is pressed, we switch to manual control and save current coordinates
		
		function onDocumentMouseDown(event){
			event.preventDefault();
			manualControl = true;
			for (j = 0; j < numPanoramas; j++) {
				savedX[j] = event.clientX;
				savedY[j] = event.clientY;
				savedLongitude[j] = longitude[j];
				savedLatitude[j] = latitude[j];
			}
		}

		// when the mouse moves, if in manual contro we adjust coordinates
		function onDocumentMouseMove(event){
			if(manualControl){
				for (j = 0; j < numPanoramas; j++) {
					longitude[j] = (savedX[j] - event.clientX) * 0.1 + savedLongitude[j];
					latitude[j] = (event.clientY - savedY[j]) * 0.1 + savedLatitude[j];
				}
			}
		}
		// when the mouse is released, we turn manual control off
		function onDocumentMouseUp(event){
			manualControl = false;
		}
		function onWindowResize(){
			for (j = 0; j < numPanoramas; j++) {
				renderer[j].setViewport(0, 0, myFrames[j].clientWidth, myFrames[j].clientHeight)
				renderer[j].setSize( myFrames[j].clientWidth, myFrames[j].clientHeight, false);
				camera[j].aspect = myFrames[j].clientWidth / myFrames[j].clientHeight;
				camera[j].updateProjectionMatrix();
			}
		}
		function onButtonClick(value) {
			for (j = 0; j < numPanoramas; j++) {
				panoramaNumber[j] = value;
				sphereMaterial[j] = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(panoramasArray[i][panoramaNumber[i]])});
				camera[j].updateProjectionMatrix();
			}
		}
		myFrames[i].addEventListener("mousedown", onDocumentMouseDown, false);
		myFrames[i].addEventListener("mousemove", onDocumentMouseMove, false);
		myFrames[i].addEventListener("mouseup", onDocumentMouseUp, false);
		myFrames[i].addEventListener("buttonclick", onButtonClick, false);
		myFrames[i].addEventListener("resize", onWindowResize, false );
	}
	
	function update() {
		requestAnimationFrame(update);
		for (var j = 0; j < numPanoramas; j++) {
			if(!manualControl) {
				longitude[j] += 0.1;
			}
			// limiting latitude from -85 to 85 (cannot point to the sky or under your feet)
			latitude[j] = Math.max(-85, Math.min(85, latitude[j]));
			// moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
			camera[j].target.x = 500 * Math.sin(THREE.Math.degToRad(90 - latitude[j])) * Math.cos(THREE.Math.degToRad(longitude[j]));
			camera[j].target.y = 500 * Math.cos(THREE.Math.degToRad(90 - latitude[j]));
			camera[j].target.z = 500 * Math.sin(THREE.Math.degToRad(90 - latitude[j])) * Math.sin(THREE.Math.degToRad(longitude[j]));
			camera[j].lookAt(camera[j].target);
			// calling again render function
			renderer[j].render(scene[j], camera[j]);
		}	
	}

	update();
}


var num_elements = 3;
var cur_page = 1;
var panoramas = ['public/pano/Adairsville/Adairsville_0.png',
				 'public/pano/Biltmore/Biltmore_0.png',
				 'public/pano/Springerville/Springerville_0.png'];
render(num_elements, panoramas, cur_page);