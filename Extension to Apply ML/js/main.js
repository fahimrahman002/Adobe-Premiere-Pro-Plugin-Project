//ELEMENTS
var uploadForm = document.getElementById("uploadForm");
var imageFirst = document.getElementById("image__first");
var uploadSection = document.getElementById("uploadSection");
var imgListSection = document.getElementById("img-list");
var thumbnails = document.getElementById("thumbnails");
var previewImg = document.getElementById("previewImg");
var messageSection = document.getElementById("message");
var selectAllBtn = document.getElementById("select_all_btn");
var pageLoading = document.getElementById("page_loading");
var alertClass = document.getElementsByClassName("alert");
//State
var uploadFileDone = false;
var showResultSection = false;
var groupImageId = null;
// const serverUrl="https://adobe-premiere-pro-api-project.herokuapp.com"
const serverUrl="http://127.0.0.1:8000"
window.onload = function () {
  
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showLoadingScreen();
    var formData = new FormData(uploadForm);
    var thumbnails = fetch(serverUrl+"/api/uploadGroupImage/", {
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

function showThumbnails() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "block";
}
function showLoadingScreen() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "block";
  imgListSection.style.display = "none";
}
function showApplyMLScreen() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "block";
  showMessage("success", `Applying Machine Learning...`);
  selectAllBtn.click();
}
function setThumbnails(myThumbnails) {
  if (myThumbnails.length > 0) {
    groupImageId = myThumbnails[0].groupImage;
  }
  for (var i = 0; i < myThumbnails.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("thumbnailId", myThumbnails[i].id);
    li.setAttribute("thumbnailTitle", myThumbnails[i].title);
    li.setAttribute("thumbnailUrl", myThumbnails[i].thumbnail);
    var img = document.createElement("img");
    img.src = myThumbnails[i].thumbnail;
    li.appendChild(img);
    thumbnails.appendChild(li);
  }
  setOnClickListener();
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


function applyMLFunc() {
  getSelectedThumbnails()
  var cs = new CSInterface();
  
  var myTimeline = fetch(serverUrl+"/api/videoTimeline")
  .then((response) => response.json())
  .then((result) => {
    return result;
  });
  
  const generateTimelineInAdobe = async () => {
    result = await myTimeline;
    if(result.length==0){
      alert("Video Timelines haven't generated yet. Please keep patience.")
      return
    }
    // console.log(result)
    videoTimelineJsonData=JSON.parse(result[0].videoTimeline);
    var jsonString = JSON.stringify(videoTimelineJsonData);
    var len = jsonString.length;
    var newJsonString = "";

    for (var i = 0; i < len; i++) {
      if (jsonString[i] == '"') {
        newJsonString = newJsonString + "\\" + jsonString[i];
      } else {
        newJsonString += jsonString[i];
      }
    }
    var sender = 'var jsonData="' + newJsonString + '"; var videoFileName="'+result[0].videoFileName+'";';
    cs.evalScript(sender + "$.runScript.generateTimeline()");
  };
  generateTimelineInAdobe();
}


function getSelectedThumbnails() {
  var selectedThumbnails = [];
  var selectedClass = document.getElementsByClassName("selected");
  for (var i = 0; i < selectedClass.length; i++) {
    var singleThumbnail = {
      thumbnailId: selectedClass[i].getAttribute("thumbnailId"),
      thumbnailTitle: selectedClass[i].getAttribute("thumbnailTitle"),
      thumbnailUrl: selectedClass[i].getAttribute("thumbnailUrl"),
    };
    console.log(singleThumbnail)
    selectedThumbnails.push(singleThumbnail);
  }
  return selectedThumbnails;
}

function sendSelectedThumbnails() {
  getSelectedThumbnails()
  var formData = new FormData();
  formData.append("groupImageId", groupImageId);
  formData.append("selectedThumbnails", getSelectedThumbnails());
  var sendThumbnails = fetch(serverUrl+"/api/uploadThumbnails/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      showApplyMLScreen();
      return result;
    })
    .catch((err) => {
      return err;
    });
  var receiveResponse = async () => {
    try {
      result = await sendThumbnails;
      alert(result.message);
    } catch (err) {
      showMessage("danger", `ERROR: ${err.message}`);
    }
  };
  receiveResponse();
}

function setOnClickListener() {
  //IMAGE JQUERY
  $("li").click(function (e) {
    $(this).toggleClass("selected");
    if ($("li.selected").length == 0) $(".select").removeClass("selected");
    else $(".select").addClass("selected");
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
}
