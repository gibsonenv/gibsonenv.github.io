var selectModelFunction = function(item) {
	var modelName = item.getElementsByTagName("a")[0].innerHTML;
	console.log(modelName)
	$(".input-model")[0].value = modelName;
}


var selectAgentFunction = function(item) {
	var agentName = item.getElementsByTagName("a")[0].innerHTML;
	console.log(agentName);
	$(".input-agent")[0].value = agentName;
}


var selectAgentBox = function(agentName) {
	$(".input-agent")[0].value = agentName;
}

var selectModelBox = function(item) {
	var inner = item.getElementsByTagName("font")[0].innerHTML;
	var modelName = inner.substring(inner.indexOf(":") + 2);
	console.log(modelName);
	$(".input-model")[0].value = modelName;

}

var agent_list = [
	'Ant',
	'Minitaur',
	'Drone',
	'Humanoid',
	'TurtleBot',
	'JackRabbot',
	'Husky',
];

function generteAgentList(){
    generateAgentSearchList(agent_list);
}


// Main function to generate current page
function generateAgentSearchList(platform_data) {
    var template = document.getElementById('search-drop-agent-template').innerHTML;
    var renderItem = Handlebars.compile(template);
    agent_list.sort()
    for (var i = 0; i < agent_list.length; i++) {
        var info = {'name': agent_list[i]}
        $('#dropAgentUL').append(renderItem(info))
    }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myDropAgentFunction() {
    document.getElementById("myDropAgent").classList.toggle("show");
}

generateAgentSearchList()