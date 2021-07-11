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
var homeBtn = document.getElementById("homeBtn");
//State
var uploadFileDone = false;
var showResultSection = false;
var groupImageId = null;
const serverUrl = "https://adobe-premiere-pro-api-project.herokuapp.com";
// const serverUrl = "http://127.0.0.1:8000";

var dummyThumbnails = [
  {
    id: 56,
    title: "thumb_0",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_0.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 57,
    title: "thumb_1",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_1.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 58,
    title: "thumb_2",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_2.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 59,
    title: "thumb_3",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_3.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 60,
    title: "thumb_4",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_4.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 61,
    title: "thumb_5",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_5.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 62,
    title: "thumb_6",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_6.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 63,
    title: "thumb_7",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_7.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 64,
    title: "thumb_8",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_8.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 65,
    title: "thumb_9",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_9.jpg",
    selected: false,
    groupImage: 8,
  },
  {
    id: 66,
    title: "thumb_10",
    thumbnail:
      "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_10.jpg",
    selected: false,
    groupImage: 8,
  },
];
var dummyStat = {
  timelines: [
    {
      name: "thumb_0",
      cut: [
        {
          inPoint: 1350,
          outPoint: 1355,
        },
      ],
    },
    {
      name: "thumb_1",
      cut: [],
    },
    {
      name: "thumb_10",
      cut: [],
    },
    {
      name: "thumb_2",
      cut: [
        {
          inPoint: 450,
          outPoint: 455,
        },
        {
          inPoint: 600,
          outPoint: 605,
        },
        {
          inPoint: 2550,
          outPoint: 2555,
        },
      ],
    },
    {
      name: "thumb_3",
      cut: [],
    },
    {
      name: "thumb_4",
      cut: [],
    },
    {
      name: "thumb_5",
      cut: [
        {
          inPoint: 1650,
          outPoint: 1655,
        },
        {
          inPoint: 1800,
          outPoint: 1805,
        },
      ],
    },
    {
      name: "thumb_6",
      cut: [],
    },
    {
      name: "thumb_7",
      cut: [],
    },
    {
      name: "thumb_8",
      cut: [
        {
          inPoint: 1050,
          outPoint: 1055,
        },
        {
          inPoint: 1500,
          outPoint: 1505,
        },
      ],
    },
    {
      name: "thumb_9",
      cut: [],
    },
    {
      name: "chronological",
      cut: [
        {
          inPoint: 16,
          outPoint: 18,
        },
        {
          inPoint: 21,
          outPoint: 23,
        },
        {
          inPoint: 36,
          outPoint: 38,
        },
        {
          inPoint: 46,
          outPoint: 48,
        },
        {
          inPoint: 51,
          outPoint: 53,
        },
        {
          inPoint: 56,
          outPoint: 58,
        },
        {
          inPoint: 61,
          outPoint: 63,
        },
        {
          inPoint: 86,
          outPoint: 88,
        },
      ],
    },
  ],
  stats: [
    {
      thumb_url:
        "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_5.jpg",
      appeared: 150,
    },
    {
      thumb_url:
        "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_6.jpg",
      appeared: 0,
    },
    {
      thumb_url:
        "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_5.jpg",
      appeared: 450,
    },
    {
      thumb_url:
        "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_5.jpg",
      appeared: 0,
    },
    {
      thumb_url:
        "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_5.jpg",
      appeared: 0,
    },
    {
      thumb_url:
        "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_5.jpg",
      appeared: 300,
    },
    {
      thumb_url:
        "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_5.jpg",
      appeared: 150,
    },
    {
      thumb_url:
        "https://adobe-premiere-pro-project-files.s3.us-east-2.amazonaws.com/thumbnails/target_image/thumb_5.jpg",
      appeared: 150,
    },
  ],
};

window.onload = function () {
  // showStatistics();

  // showThumbnails();
  // var receiveThumbnails = async () => {
  //   try {
  //     result = await dummyThumbnails;
  //     setThumbnails(result);
  //   } catch (err) {
  //     showMessage("danger", `ERROR: ${err.message}`);
  //   }
  // };
  // receiveThumbnails();

  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
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
};
function deleteGeneratedTimeline(videoName){
 
  var deleteTimeline = fetch(serverUrl + `/api/deleteGeneratedTimeline/${videoName}`, {
    method: "DELETE",
  })
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
function showUploadSection() {
  uploadSection.style.display = "block";
  pageLoading.style.display = "none";
  imgListSection.style.display = "none";
  statSection.style.display="none";
  homeBtn.style.display="none"
  var row = statSection.getElementsByClassName("row")[0];
  row.innerHTML=""
}
function showThumbnails() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "block";
  statSection.style.display="none";
}
function showLoadingScreen() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "block";
  imgListSection.style.display = "none";
  statSection.style.display="none";
}
function showApplyMLScreen() {
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "block";
  statSection.style.display="none";
  showMessage("success", `Applying Machine Learning...`);
  selectAllBtn.click();
}
function showStatistics(stats) {
  uploadSection.style.display = "none";
  pageLoading.style.display = "none";
  imgListSection.style.display = "none";
  statSection.style.display = "block";
  homeBtn.style.display="block"
  setStatThumbnail(stats);
}
function setStatThumbnail(stats) {
  var row = statSection.getElementsByClassName("row")[0];
  for (var i = 0; i < stats.length; i++) {
    var thumUrl = stats[i].thumb_url;
    var thumAppeared = stats[i].appeared;
    var html = `<div class="col"><div class="card" >
    <img class="card-img-top" style="height: 200px;width: 200px;" src="${thumUrl}" alt="Thumbnail img">
    <div class="card-body">
      <p class="card-text">${thumAppeared} Times</p>
    </div>
  </div></div>`;
    row.innerHTML += html;
  }
}

function setThumbnails(myThumbnails) {
  if (myThumbnails.length > 0) {
    groupImageId = myThumbnails[0].groupImage;
  }
  thumbnails.innerHTML="";
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
function hideMessage(){
  messageSection.style.display="none"
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

function delay(sec) {
  setTimeout(() => {
    applyMLFunc();
  }, sec * 1000);
}

function applyMLFunc() {
  var cs = new CSInterface();

  var myTimeline = fetch(serverUrl + "/api/videoTimeline")
    .then((response) => response.json())
    .then((result) => {
      return result;
    });

  const generateTimelineInAdobe = async () => {
    result = await myTimeline;
    if (result.length == 0) {
      showMessage(
        "success",
        "Video Timelines haven't generated yet. Please keep patience."
      );
      delay(20);
    } else {
      showMessage(
        "success",
        "Face appearance statistics:"
      );
      deleteGeneratedTimeline(result[0].videoFileName);
      // console.log(result)
      videoTimelineJsonData = JSON.parse(result[0].videoTimeline);
      showStatistics(videoTimelineJsonData.stats);

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
      var sender =
        'var jsonData="' +
        newJsonString +
        '"; var videoFileName="' +
        result[0].videoFileName +
        '";';
      cs.evalScript(sender + "$.runScript.generateTimeline()");
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
  // console.log(getSelectedThumbnails());
  var formData = new FormData();
  formData.append("groupImageId", groupImageId);
  formData.append("selectedThumbnails", getSelectedThumbnails());
  var sendThumbnails = fetch(serverUrl + "/api/uploadThumbnails/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      showApplyMLScreen();
      showLoadingScreen();
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
