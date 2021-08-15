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
var statSection = document.getElementById("statSection");
var previewImageSection = document.getElementById("previewImageSection");
var homeBtn = document.getElementById("homeBtn");
var projectNameInputField = document.getElementById("projectNameInputField");
var importedVideosInputField = document.getElementById(
  "importedVideosInputField"
);
//State
var uploadFileDone = false;
var showResultSection = false;
var groupImageId = null;
var projectName = "";
const serverUrl = "https://adobe-premiere-pro-api-project.herokuapp.com";

window.onload = function () {
  getProjectName();
  getImportedVideos();

  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    showMessage("success", `Face Recognition Precess is running...`);
    previewImageSection.style.display = "none";
    showLoadingScreen();

    var formData = new FormData(uploadForm);
    var thumbnails = fetch(serverUrl + "/api/uploadGroupImage/", {
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

  //IMAGE PREVIEW
  imageFirst.onchange = function (evt) {
    var images = imageFirst.files;
    if (images.length == 0) {
      previewImageSection.style.display = "none";
    } else {
      previewImageSection.style.display = "block";
      previewImageSection.innerHTML = "";
      for (var i = 0; i < images.length; i++) {
        var img = document.createElement("img");
        img.src = URL.createObjectURL(images[i]);
        img.className = "previewImg";
        img.classList.add("d-block");
        previewImageSection.appendChild(img);
      }
    }
  };
};
function deleteGroupImage() {
  var deleteTimeline = fetch(
    serverUrl + `/api/deleteGroupImage/${groupImageId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
  var deleteTimelineFunc = async () => {
    try {
      result = await deleteTimeline;
      setThumbnails(result);
    } catch (err) {
      showMessage("danger", `ERROR: ${err.message}`);
    }
  };
  deleteTimelineFunc();
}

function setImportedVideos(array_string) {
  importedVideosInputField.setAttribute("value", array_string);
}
function getImportedVideos() {
  var cs = new CSInterface();
  cs.evalScript("$.runScript.getImportedVideos()", function (returnValue) {
    setImportedVideos(returnValue);
  });
}

function setProjectName(returnValue) {
  projectName = returnValue;
  projectNameInputField.setAttribute("value", projectName);
}
function getProjectName() {
  var cs = new CSInterface();
  cs.evalScript("$.runScript.getProjectName()", function (returnValue) {
    setProjectName(returnValue);
  });
}

function showUploadSection() {
  uploadSection.style.display = "block";
  pageLoading.style.display = "none";
  imgListSection.style.display = "none";
  statSection.style.display = "none";
  homeBtn.style.display = "none";
  var row = statSection.getElementsByClassName("row")[0];
  row.innerHTML = "";
}
function showThumbnails() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "block";
  statSection.style.display = "none";
}
function showLoadingScreen() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "block";
  imgListSection.style.display = "none";
  statSection.style.display = "none";
}
function showApplyMLScreen() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "block";
  statSection.style.display = "none";
  showMessage("success", `Applying Machine Learning...`);
  selectAllBtn.click();
}
function showStatisticsSection() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "none";
  statSection.style.display = "block";
  homeBtn.style.display = "block";
}
function setStatThumbnail(videoTimelineJsonData) {
  var row = statSection.getElementsByClassName("row")[0];
  row.innerHTML = "";

  for (var i = 0; i < videoTimelineJsonData.length; i++) {
    var stats = videoTimelineJsonData[i].stats;
    var videoFileName = videoTimelineJsonData[i].videoFileName;

    for (var j = 0; j < stats.length; j++) {
      var thumbUrl = stats[j].thumb_url;
      var thumbAppeared = stats[j].appeared;
      var thumbTitle = thumbUrl.slice(thumbUrl.lastIndexOf("thumbnails/") + 11, thumbUrl.length);
      var html = `<div class="col"><div class="card" >
      <img class="card-img-top" style="height: auto;width: auto;" src="${thumbUrl}" alt="Thumbnail img">
      <div class="card-body">
      <p class="card-text">Video File:<br>${videoFileName}</p>
      <p class="card-text">Thumb Title:<br>${thumbTitle}</p>
        <p class="card-text">${thumbAppeared} Shots</p>
      </div>
    </div></div>`;
      row.innerHTML += html;
    }
  }
}

function setThumbnails(myThumbnails) {
  if (myThumbnails.length > 0) {
    groupImageId = myThumbnails[0].groupImage;
  }
  thumbnails.innerHTML = "";
  for (var i = 0; i < myThumbnails.length; i++) {
    var li = document.createElement("li");
    var p = document.createElement("p");
    var thumbnailTitle = myThumbnails[i].title;
    li.setAttribute("thumbnailId", myThumbnails[i].id);
    li.setAttribute("thumbnailTitle", thumbnailTitle);
    li.setAttribute("thumbnailUrl", myThumbnails[i].thumbnail);
    var img = document.createElement("img");
    img.src = myThumbnails[i].thumbnail;
    p.innerHTML = thumbnailTitle;
    li.appendChild(img);
    li.appendChild(p);
    thumbnails.appendChild(li);
  }
  setOnClickListener();
}

//MESSAGE
function showMessage(type, msg) {
  messageSection.style.display = "block";
  messageSection.className = `alert alert-${type}`;
  messageSection.innerHTML = msg;
}
function hideMessage() {
  messageSection.style.display = "none";
}

function delay(sec) {
  setTimeout(() => {
    applyMLFunc();
  }, sec * 1000);
}

function applyMLFunc() {
  var cs = new CSInterface();

  var myTimeline = fetch(serverUrl + `/api/videoTimeline/${groupImageId}`)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      showMessage("danger", `ERROR: ${err.message}`);
      showUploadSection();
      return err;
    });

  const generateTimelineInAdobe = async () => {
    result = await myTimeline;

    if (result.length == 0 || result.status == 404) {
      showMessage(
        "success",
        "Video Timelines haven't generated yet. Please keep patience. It'll take a few minutes."
      );
      delay(50);
    } else if (result.status == 405) {
      showMessage(
        "danger",
        "Unfortunately Group image is deleted. Please upload again."
      );
      showUploadSection();
    } else {
      showMessage("success", "Face appearance statistics:");
      showStatisticsSection();
      try {
        // videoTimelineJsonData = result;
        videoTimelineJsonData = JSON.parse(result[0].videoTimeline);
        setStatThumbnail(videoTimelineJsonData);
        deleteGroupImage();
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
        var extensionRoot = cs.getSystemPath(SystemPath.EXTENSION);
        var sender =
          'var jsonData="' +
          newJsonString +
          '"; var extensionRoot="' +
          extensionRoot +
          '";';
        cs.evalScript(sender + "$.runScript.generateTimeline()");
      } catch (err) {
        showUploadSection();
        showMessage("danger", `ERROR: ${err.message}`);
      }
    }
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

    selectedThumbnails.push(singleThumbnail);
  }
  return JSON.stringify(selectedThumbnails);
}

function sendSelectedThumbnails() {
  hideMessage();
  showLoadingScreen();
  var formData = new FormData();
  formData.append("groupImageId", groupImageId);
  formData.append("selectedThumbnails", getSelectedThumbnails());
  var sendThumbnails = fetch(serverUrl + "/api/uploadThumbnails/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      delay(20);
      return result;
    })
    .catch((err) => {
      return err;
    });
  var receiveResponse = async () => {
    try {
      result = await sendThumbnails;
      showMessage("success", `${result.message}`);
    } catch (err) {
      // showUploadSection();
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