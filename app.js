/* 
	? Fetch API
	* asynchronous function
	* we need it because we don't know how long fetching data will take
	* we wait until our Promise is resolved or rejected
	* fetch allows us to handle the data in three states
		* pending - hasn't finished
		* success - finished
		* failed - not finished (due to network problems or time-to-live (TTL))
	
	* JSON JavaScript Object Notation
		* we think of it as an object
		* is a string representation of an object
		* ex: "{ 'name': 'Paul', 'age': 27 }"
		* to aid in transmission, data gets encapsulated into ReadableStream object
		* it needs JSONified
*/

let url = "https://prismix.dev/api/v1/statuses";

// fetch(url)
// 	.then(response => response.json())
// 	.then(data => console.log(data))
// 	.catch(error => console.log(error))
// 	.then(() => console.log("This code runs after first then resolver"))
// 	.finally(() => console.log("This code runs after then's and catch's"))

console.log("Last bit of code");

/* 
	? Fetch Process
	* 1. fetch grabs your resource and returns Promise object
	* Promise can be pending, fulfilled, or rejected
	* 2. use .then() resolver to strip the Promise
	* we catch the data in the paramater of the callback function (response)
	* response is useless as its encapsulated 
	* 3. use Response.json() method to read and strip it
	* .json() method returns a Promise again
	* 4. use another .then() resolver to strip its Promise
	* catch it into a parameter and do as you please with the data
	* 5. use .catch() to deal with any error handling
*/

/* 
	? Fetch with Async Await and Try Catch
*/

/* 
? Challenge
* parse thru the data
* build blocks that display the following:
* name
* description
* updated date
* recent issues
! SPICEY MODE
* add an input field and a button
* as you type, the search removes all irrelvant blocks
*/

let search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
	let items = document.querySelectorAll(".item-container")
	let searchTerm = search.value.toLowerCase()
	
	items.forEach(item => {
		console.dir(item)
		if (!item.innerText.toLowerCase().includes(searchTerm)) {
			item.style.display = "none"
		} else {
			item.style.display = "block"
		}
	})
})

function render(data) {
	let main = document.querySelector(".main-container");

	data.forEach(d => {
		// console.log(d);
		let div = document.createElement("div");
		div.classList.add("item-container", "card", "card-body");
		div.style.width = "18rem";
		let h5name = document.createElement("h5");
		h5name.classList.add("name", "card-title", "text-primary");
		h5name.textContent = d.name;
		let pDesc = document.createElement("p");
		pDesc.className = "description";
		pDesc.textContent = `Status: ${d.description}`;
		let pDate = document.createElement("p");
		pDate.className = "date";
		pDate.textContent = `Last Updated: ${d.updatedAt}`;
		let pUp = document.createElement("p");
		pUp.className = "uptime";
		pUp.textContent = `Uptime: ${d.uptime30dPct}`;
		let divIssues = document.createElement("div");
		divIssues.className = "issues-container";
		if (d.recentIncidentBriefs) {
			d.recentIncidentBriefs.forEach(i => {
				let p = document.createElement("p");
				p.className = "incident";
				p.textContent = `Impact: ${i.impact} - ${i.name}`;
				divIssues.appendChild(p);
			});
		} else {
			let p = document.createElement("p");
			p.className = "incident";
			p.textContent = "Incident History Unavailable";
			divIssues.appendChild(p);
		}
		div.append(h5name, pDesc, pDate, pUp, divIssues);
		main.appendChild(div);
	});
}

let getData = async () => {
	try {
		let res = await fetch(url);
		let data = await res.json();
		data = data.services;
		
		render(data)
	} catch (err) {
		console.log(err);
	}
};

getData();
