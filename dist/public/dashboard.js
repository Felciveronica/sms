
let studentIdToDelete = null;
     
function showModal(r,studentId)
 { studentIdToDelete = studentId; 
  const modal = document.getElementById("confirmationModal");
   modal.style.display = "block"; 
  } 
  
  function closeModal() 
  { studentIdToDelete = null; 
      const modal = document.getElementById("confirmationModal"); 
      modal.style.display = "none"; 
  }
// <td><button onclick="showModal(${r}, '${student._id}')">Delete</button>
              // <button onclick="editStudent(${r}, '${student._id}')">Edit</button></td>

  function render(students) {
      const studentTableBody = document.getElementById('student-body');
      studentTableBody.innerHTML = '';
      let r = 1;
      let i=0; 
      const arr=[['#c596bb','#9c7092'],['#9ea4e5','#676fc1'],['#abb4c7','#9765ba'],['#84cdd1','#63b4b8'],['#91cfa5','#64b87f']]
      students.forEach(student => {
          const row = document.createElement('tr');
          row.style.backgroundColor = arr[i][0];
          row.setAttribute('data-id', student._id);
          row.innerHTML = `
              <td>${r}</td>
              <td>${student.name}</td>
              <td>${student.email}</td>
              <td>${student.phone}</td>
              <td>${student.RegistrationNumber}</td>
              <td style="padding: 0px;"><button onclick="showModal(${ r }, '${student._id }')" class="addbutton" style="background-color:${arr[i][1]};color:white">Delete</button> 
             
              <button class='addbutton'  style="border: solid 2px ${arr[i][1] }; color : #383838;background-color:${ arr[i][0] }"   onclick="showeditModal( '${student._id }','${student.name}','${student.email}','${ student.phone}','${ student.RegistrationNumber}')">Edit</button></td>
              
          `;
          studentTableBody.appendChild(row);
          r++;
          i= (i + 1) %5;
      });
  }

  async function deleteStudent() {
      try {
          const response = await fetch(`/user/delete/${studentIdToDelete}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.ok) {
              const updatedStudents = await response.json();
              render(updatedStudents);
              alert('Student deleted successfully!');
              closeModal();  
          } else {
              const error = await response.json();
              alert(`Error: ${error.message}`);
          }
      } catch (err) {
          console.error('Error deleting student:', err);
          alert('An error occurred while deleting the student.');
      }
  }

  // async function editStudent(r, studentId) {
  //     try {
  //         const response = await fetch(`/user/delete/${studentId}`, {
  //             method: 'DELETE',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //         });

  //         if (response.ok) {
  //             const updatedStudents = await response.json();
  //             render(updatedStudents);
  //             alert('Student deleted successfully!');
  //         } else {
  //             const error = await response.json();
  //             alert(`Error: ${error.message}`);
  //         }
  //     } catch (err) {
  //         console.error('Error deleting student:', err);
  //         alert('An error occurred while deleting the student.');
  //     }
  // }

    // Error messages container
    const errorMessages1 = document.getElementById('msg1');
  const errorMessages2 = document.getElementById('msg2');
  const errorMessages3 = document.getElementById('msg3');
  const errorMessages4 = document.getElementById('msg4');


  function showaddModal()
 { 
  const modal = document.getElementById("addmodal");
   modal.style.display = "block"; 
   errorMessages1.innerHTML = ''; // Clear previous errors
errorMessages2.innerHTML = '';
errorMessages3.innerHTML = '';   
errorMessages4.innerHTML = '';
let hasError = false;
// Validate inputs

  } 
 
  function closeaddModal() 
  {
      const modal = document.getElementById("addmodal"); 
      modal.style.display = "none"; 
     
errorMessages1.innerHTML = ''; // Clear previous errors
errorMessages2.innerHTML = '';
errorMessages3.innerHTML = '';   
errorMessages4.innerHTML = '';
// Validate inputs
let hasError = false;
  }


  const eform = document.getElementById('addForm');
  eform.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent the default form submission
   
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const phone = document.getElementById('phone').value.trim();
const RegistrationNumber = document.getElementById('RegistrationNumber').value.trim();

errorMessages1.innerHTML = ''; // Clear previous errors
errorMessages2.innerHTML = '';
errorMessages3.innerHTML = '';   
errorMessages4.innerHTML = '';
let hasError=false;

if (!name) {
  errorMessages1.innerHTML += '<p>Username cannot be empty.</p>';
  hasError = true;
}

if (!email) {
  errorMessages2.innerHTML += '<p>Email cannot be empty.</p>';
  hasError = true;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errorMessages2.innerHTML += '<p>Invalid email format.</p>';
  hasError = true;
}

if (!phone) {
  errorMessages3.innerHTML += '<p>Password cannot be empty.</p>';
  hasError = true;
}
if(!RegistrationNumber)
{
  errorMessages4.innerHTML += '<p>Registration Number cannot be empty.</p>';
  hasError = true;
}

// Stop if there are errors
if (hasError) {
  return;
}

        
      const formData = new FormData(eform);
      const data = Object.fromEntries(formData.entries());

      try {
          const response = await fetch('/user/addstudent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          });

          if (response.ok) {
              const result = await response.json();
              alert('student added successful');
              console.log(result)
              window.location.href = '/user'; // Redirect to dashboard
          } else {
              const error = await response.text();
              errorMessages.innerHTML += `<p>${error}</p>`;; // Show error message
          }
      } catch (err) {
          console.error('Error:', err);
          alert('An error occurred. Please try again later.');
      }
 
  });


//     function showeditModal(id,name,email,phone,reg)
//    { console.log("show edit modal")
//     const modal = document.getElementById("editmodal");
//      modal.style.display = "block"; 
//      errorMessages1.innerHTML = ''; // Clear previous errors
// errorMessages2.innerHTML = '';
// errorMessages3.innerHTML = '';   
// errorMessages4.innerHTML = '';

// // Validate inputs
// let hasError = false;
// document.getElementById('editname').value=name;
// document.getElementById('editemail').value=email;
// document.getElementById('editphone').value=phone;
// document.getElementById('editname').value=reg;


//     } 
 
//     function closeeditModal() 
//     {
//         const modal = document.getElementById("editmodal"); 
//         modal.style.display = "none"; 
     
// errorMessages1.innerHTML = ''; // Clear previous errors
// errorMessages2.innerHTML = '';
// errorMessages3.innerHTML = '';   
// errorMessages4.innerHTML = '';
// // Validate inputs
// let hasError = false;
//     }

//     let editstudentid=null;
//     function showeditModal(id, name, email, phone, reg) {
//     console.log("show edit modal");
//     const modal = document.getElementById("editmodal");
//     modal.style.display = "block"; 

//     // Clear previous errors
//     document.getElementById('emsg1').innerHTML = '';
//     document.getElementById('emsg2').innerHTML = '';
//     document.getElementById('emsg3').innerHTML = '';
//     document.getElementById('emsg4').innerHTML = '';

//     // Pre-fill the form fields with student data
//     document.getElementById('editname').value = name;
//     document.getElementById('editemail').value = email;
//     document.getElementById('editphone').value = phone;
//     document.getElementById('editRegistrationNumber').value = reg;

//     editstudentid=id;
// }

// function closeeditModal() {
//     const modal = document.getElementById("editmodal");
//     modal.style.display = "none";

//     // Clear previous errors
//     document.getElementById('emsg1').innerHTML = '';
//     document.getElementById('emsg2').innerHTML = '';
//     document.getElementById('emsg3').innerHTML = '';
//     document.getElementById('emsg4').innerHTML = '';
//     editstudentid=null;
// }

// const form = document.getElementById('editForm');
//         form.addEventListener('submit', async (e) => {
//             e.preventDefault(); // Prevent the default form submission
   
//             const username = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const phone = document.getElementById('phone').value.trim();
//     const RegistrationNumber = document.getElementById('RegistrationNumber').value.trim();
//     const studentid= editstudentid;
//     // Error messages container
//     const editerrorMessages1 = document.getElementById('emsg1');
//     editerrorMessages1.innerHTML = ''; 
//     const editerrorMessages2 = document.getElementById('emsg2');
//     editerrorMessages2.innerHTML = '';
//     const editerrorMessages3 = document.getElementById('emsg3');
//     editerrorMessages3.innerHTML = '';
//     const editerrorMessages4 = document.getElementById('emsg4');
//     editerrorMessages4.innerHTML = '';// Clear previous errors

//     // Validate inputs
//     let edithasError = false;

//     if (!username) {
//         editerrorMessages1.innerHTML += '<p>Username cannot be empty.</p>';
//         edithasError = true;
//     }

//     if (!email) {
//         editerrorMessages2.innerHTML += '<p>Email cannot be empty.</p>';
//         edithasError = true;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         editerrorMessages2.innerHTML += '<p>Invalid email format.</p>';
//         edithasError = true;
//     }

//     if (!phone) {
//         editerrorMessages3.innerHTML += '<p>Phone number cannot be empty.</p>';
//         edithasError = true;
//     }
//     if(!RegistrationNumber)
//     {
//         editerrorMessages4.innerHTML += '<p>Registration Number cannot be empty.</p>';
//         edithasError = true;
//     }

//     // Stop if there are errors
//     if (edithasError) {
//         return;
//     }

//     const formData = new FormData(form);
//             const data = Object.fromEntries(formData.entries());

//             try {
//                 const response = await fetch(`/user/editstudent/${studentid}`, {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(data),
//                 });

//                 if (response.ok) {
//                     const result = await response.json();
//                     alert('edit successful');
//                     console.log(result)
//                     window.location.href = '/user'; // Redirect to dashboard
//                 } else {
//                     const error = await response.text();
//                     alert(error); // Show error message
//                 }
//             } catch (err) 
//             {
//                 console.error('Error:', err);
//                 alert('An error occurred. Please try again later.');
//             }
 
//         });

let editstudentid = null;

// Function to show the edit modal and pre-fill the form
function showeditModal(id, name, email, phone, reg) {
console.log("show edit modal");
const modal = document.getElementById("editmodal");
modal.style.display = "block"; 

// Clear previous errors
document.getElementById('emsg1').innerHTML = '';
document.getElementById('emsg2').innerHTML = '';
document.getElementById('emsg3').innerHTML = '';
document.getElementById('emsg4').innerHTML = '';

// Pre-fill the form fields with student data
document.getElementById('editname').value = name;
document.getElementById('editemail').value = email;
document.getElementById('editphone').value = phone;
document.getElementById('editRegistrationNumber').value = reg;

editstudentid = id;
}

// Function to close the edit modal
function closeeditModal() {
const modal = document.getElementById("editmodal");
modal.style.display = "none";

// Clear previous errors
document.getElementById('emsg1').innerHTML = '';
document.getElementById('emsg2').innerHTML = '';
document.getElementById('emsg3').innerHTML = '';
document.getElementById('emsg4').innerHTML = '';
}

// Handle form submission
const form = document.getElementById('editForm');
form.addEventListener('submit', async (e) => {
e.preventDefault(); // Prevent the default form submission

// Get the input values from the form
const name = document.getElementById('editname').value.trim();
const email = document.getElementById('editemail').value.trim();
const phone = document.getElementById('editphone').value.trim();
const registrationNumber = document.getElementById('editRegistrationNumber').value.trim();
const studentId = editstudentid;

// Error messages container
const errorMessages1 = document.getElementById('emsg1');
errorMessages1.innerHTML = ''; 
const errorMessages2 = document.getElementById('emsg2');
errorMessages2.innerHTML = '';
const errorMessages3 = document.getElementById('emsg3');
errorMessages3.innerHTML = '';
const errorMessages4 = document.getElementById('emsg4');
errorMessages4.innerHTML = ''; // Clear previous errors

// Validate inputs
let hasError = false;

if (!name) {
  errorMessages1.innerHTML += '<p>Username cannot be empty.</p>';
  hasError = true;
}

if (!email) {
  errorMessages2.innerHTML += '<p>Email cannot be empty.</p>';
  hasError = true;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errorMessages2.innerHTML += '<p>Invalid email format.</p>';
  hasError = true;
}

if (!phone) {
  errorMessages3.innerHTML += '<p>Phone number cannot be empty.</p>';
  hasError = true;
}

if (!registrationNumber) {
  errorMessages4.innerHTML += '<p>Registration Number cannot be empty.</p>';
  hasError = true;
}

// Stop if there are errors
if (hasError) {
  return;
}

const data1 = { name, email, phone, registrationNumber };
const formData = new FormData(form);
const data = Object.fromEntries(formData.entries());
try {
  const response = await fetch(`/user/editstudent/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
  });

  if (response.ok) {
      const result = await response.json();
      alert('Edit successful');
      console.log(result);
      window.location.href = '/user'; // Redirect to dashboard
  } else {
      const error = await response.text();
      alert(error); // Show error message
  }
} catch (err) {
  console.error('Error:', err);
  alert('An error occurred. Please try again later.');
}
});