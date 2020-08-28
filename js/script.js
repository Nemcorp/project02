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
init();

/**
* Initializes page by adding the students, pagination, and a search bar.
*/
function init() {
	showPage(studentList, 1);
	addPagination(studentList);
	addSearchBar();
}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to 
display a "page" of nine students
*/

/**
* Creates and adds the dom elements for students on a chosen page. Will display
* "No Results Found" if list is <1
*
* @param {array} list - The complete array of student objects we will select
*						from to populate the page. 
* @param {int} 	 page - The page number that we want to display. (EG page == 2
*						will display students 9 - 17, given 9 itemsPerPage)
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
	if(list.length < 1){
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

/**
* Adds pagination buttons to the bottom of the page
*
* @param {array} list - The complete array of student objects we wish to 
*						include for a given search.
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
* Adds search bar to the header of the page. Adds an event handler for search functionality.
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
* Adds search logic to the search bar, generating a new list of student objects
* for each click or keyup event.
*/
function addSearchBarEventHandler(){
	const searchButton = document.querySelector("header button");
	searchButton.addEventListener("click", ()=>{
		studentList = generateNewStudentList();
	});

	const input = document.querySelector("#search");
	input.addEventListener("keyup", ()=> {
		studentList = generateNewStudentList();
	});
}


/**
* Generates a list of new students based on the value typed into the input field. Creates
* new pagination and shows new results
*
* @return {array} The list of student objects whose full name includes the string typed
* 				  into the input field, case insensitive
*/
function generateNewStudentList() {
	let newStudentList = [];
	const input = document.querySelector("#search");
	let desiredLetters = input.value.toLowerCase();
	
	// loop through data list to find matches
	for(student of data){
		if(studentNameIncludes(student, desiredLetters)){
			newStudentList.push(student);
		}
	}

	addPagination(newStudentList);
	showPage(newStudentList,1);

	return newStudentList;
}

/**
* Determines if a student's name contains the desiredLetters. 
*
* @param {Object} student         The student whose name we will search for a substring
* @param {str} 	  desiredLetters  The substring which we will search for in the student's name.
*								  Must take lowercase letters.
*
* @return {boolean} True if student's full name includes 'desiredLetters'. False otherwise.
* 				    
*/
function studentNameIncludes(student, desiredLetters) {
	let studentName = student.name.first + " " + student.name.last;
	return(studentName.toLowerCase().includes(desiredLetters));
}








// bugs

// multiples of 45