function loadTable() {
    let tblStudent = document.getElementById("tblStudent").getElementsByTagName('tbody')[0];
    tblStudent.innerHTML = ''; 
    fetch("http://localhost:8080/student/get-student")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                
                let row = tblStudent.insertRow();

               
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);

                
                cell1.innerHTML = element.studentName;
                cell2.innerHTML = element.studentAge;
                cell3.innerHTML = element.guardianAddress;

            
                if (element.studentImage) {
                    let img = document.createElement('img');
                    img.src = `data:image/png;base64,${element.studentImage}`;
                    img.alt = "Student Image";
                    img.style.maxWidth = "100px"; 
                    cell4.appendChild(img);
                } else {
                    cell4.innerHTML = "No Image";
                }
            });
        })
        .catch(error => console.error('Error loading students:', error));
}
