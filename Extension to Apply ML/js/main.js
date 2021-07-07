//ELEMENTS
var uploadForm = document.getElementById("uploadForm");
var imageFirst = document.getElementById("image__first");
var uploadSection = document.getElementById("uploadSection");
var imgListSection = document.getElementById("img-list");
var thumbnails= document.getElementById("thumbnails");
var previewImg = document.getElementById("previewImg");
var messageSection = document.getElementById("message");
var selectAllBtn = document.getElementById("select_all_btn");
var pageLoading = document.getElementById("page_loading");
//State
var uploadFileDone = false;
var showResultSection = false;

window.onload = function () {
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showLoadingScreen();
    var formData = new FormData(uploadForm);

    var thumbnails = fetch("http://127.0.0.1:8000/api/groupImageUpload/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        showThumbnails();
        showMessage("success", `All faces are recognized.`);
        return result;
      })
      .catch((err) => {
        return err;
      });

    var receiveThumbnails = async () => {
      try {
        result = await thumbnails;
        setThumbnails(result);
      } catch (err) {
        showMessage("danger", `ERROR: ${err.message}`);
      }
    };
    receiveThumbnails();
  });
};


function showThumbnails(){
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "block";
}
function showLoadingScreen(){
  uploadSection.style.display = "none";
  pageLoading.style.display = "block";
  imgListSection.style.display = "none";
}
function setThumbnails(myThumbnails){
  for(var i=0;i<myThumbnails.length;i++){
    var li=document.createElement("li"); 
    var img = document.createElement("img");
    img.classList.add("thumbnail_img");
    img.src = myThumbnails[i].thumbnail;
    li.appendChild(img)
    thumbnails.appendChild(li)
  }
}

//MESSAGE
function showMessage(type, msg) {
  messageSection.className = `alert alert-${type}`;
  messageSection.innerHTML = msg;
}

//IMAGE PREVIEW
imageFirst.onchange = function (evt) {
  var [file] = imageFirst.files;
  if (file) {
    previewImg.className = "d-block";
    previewImg.src = URL.createObjectURL(file);
  } else {
    previewImg.className = "d-none";
  }
};
var myUsers = fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((result) => {
    return result;
  });
function applyMLFunc() {
  var cs = new CSInterface();

  var sendUsers = async () => {
    result = await myUsers;
    var jsonString = JSON.stringify(result);
    var len = jsonString.length;
    var newJsonString = "";

    for (var i = 0; i < len; i++) {
      if (jsonString[i] == '"') {
        newJsonString = newJsonString + "\\" + jsonString[i];
      } else {
        newJsonString += jsonString[i];
      }
    }
    var sender = 'var jsonData="' + newJsonString + '";';
    cs.evalScript(sender + "$.runScript.test()");
  };
  sendUsers();
}


//IMAGE JQUERY
$("li").click(function (e) {
  $(this).toggleClass("selected");
  if ($("li.selected").length == 0) $(".select").removeClass("selected");
  else $(".select").addClass("selected");
  alert(e.target.src);
  counter();
});

// all item selection
$("#select_all_btn").click(function () {
  if ($("li.selected").length == 0) {
    $("li").addClass("selected");
    $(".select").addClass("selected");
    selectAllBtn.innerHTML = "Deselect All";
  } else {
    $("li").removeClass("selected");
    $(".select").removeClass("selected");

    selectAllBtn.innerHTML = "Select All";
  }
  counter();
});

// number of selected items
function counter() {
  if ($("li.selected").length > 0) $(".send").addClass("selected");
  else $(".send").removeClass("selected");
  $(".send").attr("data-counter", $("li.selected").length);
}