let tbody = document.getElementById("booty");
fetch("https://api.npoint.io/5b8ae12b953b9851b6a0")
.then(res => res.json())
.then(data => {

	for(game of data.reverse()){
		addGame(game);
	}


})

const addGame = game => {
	let row = document.createElement("tr");
	let cell1 = document.createElement("td");
	cell1.innerText = game.body;
	row.appendChild(cell1);
	let cell2 = document.createElement("td");
	cell2.innerHTML = "<a href=\""+game.link+"\">" + "Lien" + "</a>";
	row.appendChild(cell2);
	let cell3 = document.createElement("td");
	let day = new Date(game.date * 1000)
	cell3.innerText = day.toDateString();
	row.appendChild(cell3);
	tbody.appendChild(row);
}
