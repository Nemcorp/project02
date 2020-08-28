/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


const itemsPerPage = 9;
var studentList = data;


// Call functions


showPage(studentList, 1);
addPagination(studentList);
addSearchBar();

/*
Create the `showPage` function
This function will create and insert/append the elements needed to 
display a "page" of nine students
*/
function showPage(list, page) {
	let startIndex = (page-1) * itemsPerPage;
	let endIndex = page * itemsPerPage -1; 

	// if last page of list, we might not have 9 students. Find out how
	// many we should actually have
	if(endIndex >= list.length) {
		endIndex = list.length-1;
	}



	let studentList = document.querySelector(".student-list");
	studentList.innerHTML = "";

	// if no students are found, display "No students found"
	if(list.length == 0){
		studentList.innerHTML = `
			<span>No results found</span>
		`;
	}else {
		for(let i = startIndex; i <= endIndex; i ++) {
			let student = list[i];
			// decided not to use a conditional here. It's more efficient 
			// to avoid looping through unecessary students
			let studentDomInfo = `  
				<li class="student-item cf">
				    <div class="student-details">
				      <img class="avatar" src="${student.picture.medium}" alt="Profile Picture">
				      <h3> ${student.name.first} ${student.name.last} </h3>
				      <span class="email"> ${student.email} </span>
				    </div>
				    <div class="joined-details">
				      <span class="date">Joined ${student.registered.date}</span>
				    </div>
				</li>
	  		`;
	  		
	  		studentList.insertAdjacentHTML("beforeend", studentDomInfo);
		}
	}
}

/*
Create the `addPagination` function
This function will create and insert/append the elements 
needed for the pagination buttons
*/
function addPagination(list) {
	var numPaginationButtons = Math.ceil(list.length/itemsPerPage);

	let linkList = document.querySelector('.link-list');
	linkList.innerHTML = "";

	for(let i=1; i<=numPaginationButtons; i++) {
		let buttonDomInfo = `
			<li>
				<button type="button">${i}</button>
			</li>
		`;
		linkList.insertAdjacentHTML("beforeend", buttonDomInfo);
	}

	if(list.length >0){
		linkList.firstElementChild.firstElementChild.classList.add("active");

		linkList.addEventListener("click", (e)=> {
			let pageButton = e.target;
			let pageNumber = pageButton.textContent;

			if(pageButton.tagName === "BUTTON"){
				// remove active class from previous active element
				for(let li of linkList.children) {
					let button = li.firstElementChild;
					button.classList.remove("active");
				}

				// add active class to clicked element
				pageButton.classList.add("active");
			}

			showPage(studentList, pageNumber);
		});
	}

}

/**
* adds search bar to the header of the page
*/
function addSearchBar(){
	const header = document.querySelector("header");
	let searchBarDomInfo = `
		<label for="search" class="student-search">
		  <input id="search" placeholder="Search by name...">
		  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
		</label>
	`;
	header.insertAdjacentHTML("beforeend", searchBarDomInfo);

	// add search bar event handler
	addSearchBarEventHandler();
}

/**
* 
*/
function addSearchBarEventHandler(){
	const searchButton = document.querySelector("header button");
	searchButton.addEventListener("click", ()=>{
		studentList = generateNewStudentList();
		addPagination(studentList);
		showPage(studentList,1);
	});

	const input = document.querySelector("#search");
	input.addEventListener("keyup", ()=> {
		studentList = generateNewStudentList();
		addPagination(studentList);
		showPage(studentList,1);
	});
}

/**
* 
*/
function generateNewStudentList() {
	let newStudentList = [];
	const input = document.querySelector("#search");
	let desiredLetters = input.value;
	// loop through data list to find matches
	for(student of data){
		if(studentNameIncludes(student, desiredLetters)){
			newStudentList.push(student);
		}
	}

	return newStudentList;
}


function studentNameIncludes(student, desiredLetters) {
	let studentName = student.name.first + " " + student.name.last;
	return(studentName.toLowerCase().includes(desiredLetters));
}








