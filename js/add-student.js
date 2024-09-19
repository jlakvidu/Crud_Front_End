function addStudentWithImage() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const studentName = document.getElementById("txtStdName").value;
    const studentAge = document.getElementById("txtStdAge").value;
    const studentContact = document.getElementById("txtStdContact").value;
    const guardianName = document.getElementById("txtGuardianName").value;
    const guardianAddress = document.getElementById("txtGuardianAddress").value;
    const guardianContact = document.getElementById("txtGuardianContact").value;

    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result.split(',')[1];

            const student = {
                "studentName": studentName,
                "studentAge": studentAge,
                "studentContactNumber": studentContact,
                "guardianName": guardianName,
                "guardianAddress": guardianAddress,
                "guardianContactNumber": guardianContact,
                "studentImage": base64Image
            };

            fetch("http://localhost:8080/student/add-student-with-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
            })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                document.getElementById("imagePreview").src = `data:image/png;base64,${base64Image}`;
            })
            .catch(error => console.error('Error:', error));
        };
        reader.readAsDataURL(file);
    } else {
        console.error('No file selected');
    }
}
