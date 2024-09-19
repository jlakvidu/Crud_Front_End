function searchStudent() {
    let studentId = document.getElementById("txtId").value;

    if (!studentId) {
        console.error("Student ID is required.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`http://localhost:8080/student/find-by-id/${studentId}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            console.log(result);


            document.getElementById('txtStdName').value = result.studentName || '';
            document.getElementById('txtStdAge').value = result.studentAge || '';
            document.getElementById('txtStdContact').value = result.studentContactNumber || '';
            document.getElementById('txtGuardianName').value = result.guardianName || '';
            document.getElementById('txtGuardianAddress').value = result.guardianAddress || '';
            document.getElementById('txtGuardianContact').value = result.guardianContactNumber || '';

            if (result.studentImage) {
                const imgElement = document.getElementById('studentImage');
                imgElement.src = `data:image/png;base64,${result.studentImage}`;
                imgElement.style.display = 'block';
            } else {
                console.log("No image available for this student.");
                document.getElementById('studentImage').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function updateStudent() {
    console.log("Helloo");

    let studentId =  document.getElementById("txtId").value;
    let studentName = document.getElementById('txtStdName').value;
    let studentAge = document.getElementById('txtStdAge').value;
    let studentContact = document.getElementById('txtStdContact').value;
    let guardianName = document.getElementById('txtGuardianName').value;
    let guardianAddress = document.getElementById('txtGuardianAddress').value;
    let guardianContact = document.getElementById('txtGuardianContact').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "studentId" : studentId,
        "studentName": studentName,
        "studentAge": studentAge,
        "studentContactNumber": studentContact,
        "guardianName": guardianName,
        "guardianAddress": guardianAddress,
        "guardianContactNumber": guardianContact
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/student/update-student", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}