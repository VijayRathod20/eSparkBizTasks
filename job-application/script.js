const educationDetails = document.getElementById("education-details");
const addEducationButton = document.getElementById("add-education-button");

addEducationButton.addEventListener("click", function () {
  const educationItem = document.createElement("div");
  educationItem.classList.add("education-item");
  educationItem.innerHTML = `
  <label for="degree">courseName</label>
        <input type="text" name="degree" name="degree" required>
        <label for="boardName">Name of Board</label>
        <input type="text" name="board" class="board">
        <label for="passingYear">Passing Year</label>
        <input type="text" name="passingYear">
        <label for="percentage">percentage</label>
        <input type="text" name="percentage">
  `;
  educationDetails.appendChild(educationItem);
});

const experience = document.getElementById('experience');
const addExperienceButton = document.getElementById('add-experience-button');

addExperienceButton.addEventListener('click',function(){
    const experienceItem = document.createElement('div');
    experienceItem.classList.add('experience-details');
    experienceItem.innerHTML = `
    <label for="company-name">Comapany Name</label>
          <input type="text" id="company-name" name="company-name" required />
          <label for="designation">Designation:</label>
          <input type="text" id="designation" name="designation" required />
          <label for="start-date">Form:</label>
          <input type="date" id="start-date" name="start-date" required />
          <label for="end-date">To:</label>
          <input type="date" id="end-date" name="end-date" required />
    `;
    experience.appendChild(experienceItem);
});


function validate(){

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const email = document.getElementById("email");
    const address = document.getElementById("address1");
    

    if (fname.value == "") {
      fname.focus();
      return false;
      
    }
    else if (lname.value == "") {
        fname.focus();
        return false;
      }

    else if (!email.value) {
      email.focus();
      return false;
    }

    else if (!address.value) {
      address.focus();
      return false;
    }
    else{
        return true;
    }

    
};
