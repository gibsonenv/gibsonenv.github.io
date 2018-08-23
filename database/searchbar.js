function myFilterFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("dropUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function myClickInput() {
  console.log(event.target.matches('input'))
  if (!event.target.matches('input')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      console.log(openDropdown, openDropdown.classList.contains('show'))
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myDropFunction() {
    console.log(document.getElementById("myDropdown"))
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('input')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function generateSearchList(platform_data) {
    var template = document.getElementById('search-drop-item-template').innerHTML;
    var renderItem = Handlebars.compile(template);
    var total_display = 600;
    if (platform_data.length < total_display){
        total_display = platform_data.length;
    }
    var all_ids = [];
    for (var i = 0; i < platform_data.length; i++) {
        all_ids.push(platform_data[i].id);
    }
    all_ids.sort()
    if (all_ids.indexOf('Ackermanville') >= 0) {
      all_ids.splice( all_ids.indexOf('Ackermanville'), 1 );
    }
    if (all_ids.indexOf('Adairsville') >= 0) {
      all_ids.splice( all_ids.indexOf('Adairsville'), 1 );
    }
    all_ids.push("Adairsville");
    all_ids.push("Ackermanville");
    for (var i = 0; i < total_display; i++) {
        var info = {'name': all_ids[i]}
        $('#dropUL').append(renderItem(info))
    }
}