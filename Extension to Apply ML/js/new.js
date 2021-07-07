//import axios from "axios";

//ELEMENTS


//State


//FORM SUBMIT
// uploadForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   var formData = new FormData();
//   formData.append("image", imageFirst.files[0]);
//   fetch("http://127.0.0.1:8000/api/testUpload/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
//     },
//     body: formData,
//   })
//     .then(function (res) {
//       res.json();
//     })
//     .then((data) => {
//       uploadFileDone = true;
//       uploadSection.style.display = "none";
//       imgListSection.style.display = "block";
//       showMessage("success", `File Uploaded `);
//     })
//     .catch(function (err) {
//       uploadFileDone = true;
//       showMessage("danger", `ERROR: ${err.message}`);
//     });
// });



//FETCH IMAGES

