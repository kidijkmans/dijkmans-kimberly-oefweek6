var buttons = document.getElementsByTagName('button');
var filters = document.getElementsByClassName('filter');

function main() {

  for(i=0;i<buttons.length;i++) {
    buttons[i].onclick = function() {

      var label = this.getAttribute("data-label");
      var links = document.getElementsByClassName(label)[0];
        //console.log(label);

      if(links.style.display == "block") {
          //alle links sluiten
          for(i=0;i<buttons.length;i++) {
            buttons[i].getElementsByTagName("span")[0].innerHTML = "+";
          };
          for(i=0;i<buttons.length;i++) {
            filters[i].style.display = "none";
          };
      }else{
          //alle links sluiten
          for(i=0;i<buttons.length;i++) {
            buttons[i].getElementsByTagName("span")[0].innerHTML = "+";
          };
          for(i=0;i<buttons.length;i++) {
            filters[i].style.display = "none";
          };
          //juiste links openen
          this.getElementsByTagName("span")[0].innerHTML = "-";
          links.style.display = "block";
      };

    };
  };

}

window.onload = function() {
       main();
};
