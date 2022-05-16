
let ProfileModal = document.getElementById("ProfileModal")
let tbody = document.getElementById("table_body");
//let ProfileCross = document.getElementById("ProfileCross");

let ProfileName = document.getElementById("ProfileName");
let age = document.getElementById("age");
let birthdate = document.getElementById("birthdate");
let flag = document.getElementById("flag");
let totem = document.getElementById("totem");
let rank = document.getElementById("rank");

/*ProfileCross.onclick = function() {
	ProfileModal.style.display = "none";
}*/

window.onclick = function(event) {
	if (event.target == ProfileModal) {
		ProfileModal.style.display = "none";
	}
}
flags = {
	"DZA": "🇩🇿",
	"BRA": "🇧🇷",
	"CHN": "🇨🇳",
	"GER": "🇩🇪",
	"FRA": "🇫🇷",
	"UKR": "🇺🇦",
	"GRC": "🇬🇷",
	"IND": "🇮🇳",
	"ESP": "🇪🇸",
	"POL": "🇵🇱",
	"RUS": "🇷🇺",
	"IRN": "🇮🇷",
	"GBR": "🇬🇧"
}
totems = {
	"dog": "🐶",
	"wolf": "🐺",
	"fox": "🦊",
	"horse": "🐴",
	"bull": "🐂",
	"cow": "🐄",
	"boar": "🐗",
	"bear": "🐻",
	"panda": "🐼",
	"skunk": "🦨",
	"chicken": "🐔",
	"owl": "🦉",
	"crocodile": "🐊",
	"raptor": "🦖",
	"snail": "🐌",
	"spider": "🕷",
	"robot": "🤖",
	"ogre": "👹",
	"devil": "😈",
	"angel": "😇",
	"lobster": "🦞",
	"lynx": "😾"
}

// retrieve the members' data
fetch("https://api.jsonbin.io/b/621e972a06182767436aa7f3/18")
.then(res => res.json())
.then(function(data){
	for (let i in data.members){
		addMemberRow(data.members[i]);
	}
});

function addMemberRow(member){
	// retrieve fide info
	fetch('https://fide-scraper.herokuapp.com/player/'+member.FIDE_ID+'/info?include_history=true')
	.then(function(res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function(value) {
		if (!value){
			return;
		}
		elos = [value.standard_elo, value.rapid_elo, value.blitz_elo];
		
		if (value.history.length > 1){
			variations = [elos[0] - value.history[1].standard, elos[1] - value.history[1].rapid, elos[2] - value.history[1].blitz];
		}
		else{
			variations = [0,0,0];
		}
		
		let row = document.createElement("tr");
		let cell = document.createElement("td");
		cell.setAttribute("title", "Voir le profil");
		cell.innerHTML = member.name;
		cell.onclick = function(){
			editProfile(member,value);
			ProfileModal.style.display = "block";
		}
		row.appendChild(cell);
		
		

		for(let i in elos){
			let cell = document.createElement("td");
			if (elos[i] != "Notrated"){
				cell.innerHTML = elos[i];
				
				if(!isNaN(variations[i]) && variations[i]!= 0){
					
					if (variations[i] > 0){
						cell.innerHTML += ' <i class="positive_variation">(+'+variations[i]+')</i>';
					}
					else if (variations[i] < 0){
						cell.innerHTML += ' <i class="negative_variation">('+variations[i]+')</i>';
					}
					cell.setAttribute("title", "Plus de détails");
					cell.onclick = function(){
						
						let str = value.history[0].numeric_date+"";
						let date = str.substring(0,4)+"-"+str.substring(4,6)+"-01";
						window.open("https://ratings.fide.com/calculations.phtml?id_number="+member.FIDE_ID+"&period="+date+"&rating="+i, "_blank");
					}
				}
			}
			else{
				cell.innerHTML = "";
			}
			row.appendChild(cell);
		}
		tbody.appendChild(row);
	});
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

function sortByEloChange() {
	
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("table");
	switching = true;
	
	while (switching) {
		
		switching = false;
		rows = table.rows;
		
		for (i = 1; i < (rows.length - 1); i++) {
			
			shouldSwitch = false;
			
			x = rows[i].getElementsByTagName("td")[1].getElementsByTagName("i");
			if (x.length>0){
				x = x[0].innerHTML.replaceAll("(","").replaceAll(")","");
			}
			else{
				x = "0";
			}
			
			y = rows[i+1].getElementsByTagName("td")[1].getElementsByTagName("i");
			if (y.length>0){
				y = y[0].innerHTML.replaceAll("(","").replaceAll(")","");
			}
			else{
				y = "0";
			}
			
			
			
			
			if (parseInt(x) < parseInt(y) ) {
				
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



function editProfile(member,fide_infos){
	
	ProfileName.innerHTML = member.name;
	
	if (member.birth_date != ""){
		age.innerHTML= getAge(member.birth_date)+" ans";
		birthdate.innerHTML = birthdate2birthday(member.birth_date);}
		else{
			age.innerHTML= "";
			birthdate.innerHTML = "";
		}
		
		flag.innerHTML = flags[member.origin];
		
		
		if (typeof member.totem != "undefined"){
			totem.innerHTML=totems[member.totem];
			
		}
		else{
			totem.innerHTML="";
		}
		
		if (fide_infos.national_rank_active_players != 0){
			rank.innerHTML= "Rang National: "+fide_infos.national_rank_active_players;
			
		}
		else{
			rank.innerHTML="";
		}
		
		
		
	}
	
	function getAge(dateString) {
		var ageInMilliseconds = new Date() - new Date(dateString);
		return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
	}
	
	function birthdate2birthday(date){
		return date.substring(8)+"/"+date.substring(5,7)+"/"+date.substring(0,4);
	}