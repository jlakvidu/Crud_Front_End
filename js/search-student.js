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
