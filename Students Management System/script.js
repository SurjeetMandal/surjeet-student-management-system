//This is the array of object which holds the dummy data of students.

//This is the code to fetch Data of json using fetch api.
function fetchData() {
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let reqData1 = data;
      tableRender(reqData1);
    });
}

// Here I Have written Logic to render the table according to my HTML and CSS code also the provided array.
let table_body = document.getElementById("table_body");

function tableRender(commingData) {
  document.getElementById("table2").style.display = "none";

  table_body.innerHTML = ` `;

  commingData.forEach((item) => {
    let passingStuden = item.passing === false ? "Failed" : "Passed";

    table_body.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td class="student_name"><img src=${item.img_src}>${item.first_name} ${item.last_name}</td>
                <td>${item.gender}</td>
                <td>${item.class}</td>
                <td>${item.marks}</td>
                <td>${passingStuden}</td>
                <td>${item.email}</td>
                <td>${item.city}</td>
            </tr>
        `;
  });
}

//this is the logic to sort array in A to Z order with changing there ID.
function AtoZ() {
  document.getElementById("table2").style.display = "none";

  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let reqData = data.sort((a, b) => {
        let nameA = a.first_name.toUpperCase();
        let nameB = b.first_name.toUpperCase();
        if (nameA > nameB) {
          return 1;
        } else if (nameA < nameB) {
          return -1;
        } else {
          return 0;
        }
      });
      tableRender(reqData);
    });
}

//This is the logic to sort array in Z to A with Changing there ID.
function ZtoA() {
  document.getElementById("table2").style.display = "none";

  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let reqData2 = data.sort((a, b) => {
        let NameA = a.first_name;
        let NameB = b.first_name;

        if (NameA < NameB) {
          return 1;
        } else if (NameA > NameB) {
          return -1;
        } else {
          return 0;
        }
      });
      tableRender(reqData2);
    });
}

//This is the logic to sort marks in ascending order.
function marksSort() {
  document.getElementById("table2").style.display = "none";

  fetch('data.json')
  .then(response => {
    return response.json();
  }).then(data => {
    let reqdata3 = data.sort((a,b) => {
        let MarkA = a.marks;
        let MarkB = b.marks;

        return MarkA - MarkB;
    })
    tableRender(reqdata3);
  })
}

//This is the logic to sort class in ascending order.
function classSort() {
  document.getElementById("table2").style.display = "none";

  fetch('data.json')
  .then(response => {
    return response.json();
  }).then(data => {
    let reqData4 = data.sort((a,b) => {
        let classA = a.class;
    let classB = b.class;

    return classA - classB;
    })
    tableRender(reqData4);
  })
}

//This is the logic which sort table according to passing student and only render the passing student in table.
function passingSort() {
  document.getElementById("table2").style.display = "none";

    fetch('data.json')
    .then(response => {
        return response.json();
    }).then(data => {
        let reqData5 = data.filter((passed) => {
            return passed.passing === true;
        });
        
    tableRender(reqData5);
    })
}

//This is the logic to render two different table one for MALE gender and another one for FEMALE.
function genderSort() {

    fetch('data.json')
    .then(response => {
        return response.json();
    }).then(data => {
        let reqData6 = data.filter((GenderMale) => {
            return GenderMale.gender === "Male";
        });
        let reqData7 = data.filter((GenderFemale) => {
            return GenderFemale.gender === "Female";
        });

        table_body.innerHTML =` `;

        reqData6.forEach((item) => {
            let passingStuden = item.passing === false ? "Failed" : "Passed";
        
            table_body.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td class="student_name"><img src=${item.img_src}>${item.first_name} ${item.last_name}</td>
                        <td>${item.gender}</td>
                        <td>${item.class}</td>
                        <td>${item.marks}</td>
                        <td>${passingStuden}</td>
                        <td>${item.email}</td>
                        <td>${item.city}</td>
                    </tr>
                `;
          });

        let table2 = document.getElementById('table2')
        let table_body2 = document.getElementById('table2_body');
        table2.style.display = 'block';

        table_body2.innerHTML = ` `

        reqData7.forEach((item) => {
            let passingStuden = item.passing === false ? "Failed" : "Passed";
        
            table_body2.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td class="student_name"><img src=${item.img_src}>${item.first_name} ${item.last_name}</td>
                        <td>${item.gender}</td>
                        <td>${item.class}</td>
                        <td>${item.marks}</td>
                        <td>${passingStuden}</td>
                        <td>${item.email}</td>
                        <td>${item.city}</td>
                    </tr>
                `;
          });
    })
}

//This is the logic to search through Name and EmailID
function search(searchTerm) {
  fetch('data.json')
  .then(response => {
    return response.json();
  }).then(data => {
    const filterData = data.filter(items => {
      return items.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             items.email.toLowerCase().includes(searchTerm.toLowerCase());
    })
    // Clear the table body
    table_body.innerHTML = '';

    tableRender(filterData);
  })
}

document.getElementById('search_bar').addEventListener('keyup', function(event) {
  const searchTerm = event.target.value;
  search(searchTerm);
});


//Function Call Done Here.
fetchData();
tableRender();