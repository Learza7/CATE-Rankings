

let tbody = document.getElementById("booty");


// get the json data
fetch("https://api.jsonbin.io/b/621e972a06182767436aa7f3/6")
	.then(res => res.json())
	.then(function(data){
		for (let i in data.members){

			addMemberRow(data.members[i]);

			}
	}

		

	)

function addMemberRow(member){
	
	// fetch data
	fetch('https://fide-scraper.herokuapp.com/player/'+member.FIDE_ID+'/info?include_history=true')
	  	.then(function(res) {
	    	if (res.ok) {
	      		return res.json();
	    	}
	  	})
	  	.then(function(value) {

	  		elos = [value.standard_elo, value.rapid_elo, value.blitz_elo];
	  		
	  		if (value.history.length > 1){
	  			variations = [elos[0] - value.history[1].standard, elos[1] - value.history[1].rapid, elos[2] - value.history[1].blitz];
	  		}
	  		else{
	  			variations = [0,0,0];
	  		}
	  		
	  		let row = document.createElement("tr");
	  		let cell = document.createElement("td");

	  		cell.innerHTML = member.name;

	  		row.appendChild(cell);

	  		for(let i in elos){
	  			let cell = document.createElement("td");
	  			if (elos[i] != "Notrated"){
	  				cell.innerHTML = elos[i];

	  				if(!isNaN(variations[i])){
	  					if (variations[i] > 0){
	  						cell.innerHTML += ' <i class="positive_variation">(+'+variations[i]+')</i>';
	  					}
	  					else if (variations[i] < 0){
	  						cell.innerHTML += ' <i class="negative_variation">('+variations[i]+')</i>';
	  					}
	  				}

	  			}
	  			else{
	  				cell.innerHTML = "";
	  			}

	  			row.appendChild(cell);
	  		}
	  		
	  		tbody.appendChild(row);




})
}
function sortByElo() {

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
 
  while (switching) {
   
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
   
      shouldSwitch = false;
  
      x = rows[i].getElementsByTagName("td")[1];
      y = rows[i + 1].getElementsByTagName("td")[1];

      //if no standard elo, replace with rapid
      if (x.innerHTML == ""){
      	
      	x = rows[i].getElementsByTagName("td")[2];
      }
      if (y.innerHTML == ""){
      	y = rows[i+1].getElementsByTagName("td")[2];
      }

      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
       
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
    
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByName() {

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
 
  while (switching) {
   
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
   
      shouldSwitch = false;
  
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];

    

      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
       
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
    
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// ouvrir le json

//pour chaque joueur 

// créer un tr 

// contenant 4 td avec les elos récupérés par l'api avec les variations



