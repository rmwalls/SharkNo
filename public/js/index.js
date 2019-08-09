//This file holds the javascript for the frontend (web pages)

// Get references to page elements
$("#formReportSection").hide();
$("#formSearchSection").hide();
$("#examplePage").hide();
var $exampleList = $("#example-list");
var $date = $("#date"); //check
var $year = $("#year"); //need to add
var $country = $("#country");//check
var $area = $("#area");//check
var $location = $("#location");//check
var $activity = $("#activity");//check
var $species = $("#species");//check
var $type = $("#type");//check
var $injury = $("#injury");//check
var $pdf = $("#pdf");
var arrayAll = [$date,$year,$country,$area,$location];
var imgSrcArray = ["/img/atlantic-sharpnose-shark.jpg", "/img/great_white.jpeg", "/img/tiger_shark.png"];
var imgSrcIndex = 0;
var yearSearch = $("#yearSearch");
var locationSearch = $("#locationSearch");
var countrySearch = $("#countrySearch");
var areaSearch = $("#areaSearch");

//BELOW IS THE CODE FOR THE SHARK IMAGES FROM THE FOLDER
var sharkPic = $("#sharkPic");
sharkPic.css({"height":"200px","width":"auto"});
var sharkPicInterval;
sharkPic.attr("src", imgSrcArray[imgSrcIndex]);
sharkPicInterval = setInterval(function() {
  switch(imgSrcIndex) {
    case 0:
      imgSrcIndex++;
      sharkPic.attr("src", imgSrcArray[imgSrcIndex]);
      break;
    case 1:
      imgSrcIndex++;
      sharkPic.attr("src", imgSrcArray[imgSrcIndex]);
      break;
    case 2:
      imgSrcIndex = 0;
      sharkPic.attr("src", imgSrcArray[imgSrcIndex]);
      break;
    default:
      break;
  }
}, 1000);
//ABOVE IS THE CODE FOR THE SHARK IMAGES FROM THE FOLDER

//BELOW IS THE CODE FOR THE GIPHY SHARK IMAGE
var sharkGif = $("#sharkGiphy");
sharkGif.css({"height":"200px","width":"auto"});
var sharkGifInterval;
$.ajax({
  url: "https://api.giphy.com/v1/gifs/search?api_key=UXUhR58v2nmQC6jMGg5vr7GbLMDZclbm&q=sharks&limit=25&offset=0&lang=en",
  method: "GET"
}).then(function(response) {
  var gifSrcIndex = 0;
  sharkGifInterval = setInterval(function() {
    switch(gifSrcIndex){
      case 24:
        gifSrcIndex = 0;
        sharkGif.attr("src", response.data[gifSrcIndex].images.original.url);
        break;
      default:
        gifSrcIndex++;
        sharkGif.attr("src", response.data[gifSrcIndex].images.original.url);
        break;
    }
  }, 1000);
});
//ABOVE IS THE CODE FOR THE GIPHY SHARK IMAGE


function searchAttack() {
  var year = yearSearch.val();
  if(year === ""){
    year = "imashark";
  }
  var country = countrySearch.val();
  if(country === ""){
    country = "imashark";
  }
  var area = areaSearch.val();
  if(area === ""){
    area = "imashark";
  }
  var location = locationSearch.val();
  if(location === ""){
    location = "imashark";
  }
  var routeString = "/api/attacks/" + year + "/" + country + "/" + area + "/" + location;
  console.log(routeString);
  $.ajax(routeString, {
    type: "GET",
  }).then(function(results) {
    yearSearch.val("");
    areaSearch.val("");
    countrySearch.val("");
    locationSearch.val("");
    $('#example-list').html(results);
    $("#examplePage").show();
  });
}
function addAttack() {
  if($activity.val()===""){
    $activity.val("No activity recorded.");
  }
  if($species.val()===""){
    $species.val("Species not documented.");
  }
  if($type.val()===""){
    $type.val("Unknown");
  }
  if($injury.val()===""){
    $injury.val("Activity not documented.");
  }
  if($pdf.val()===""){
    $pdf.val("N/A");
  }
  var newAttack = {
    date: $date.val().trim(),
    year: $year.val().trim(),
    type: $type.val().trim(),
    country: $country.val().trim(),
    area: $area.val().trim(),
    location: $location.val().trim(),
    injury: $injury.val().trim(),
    species: $species.val().trim(),
    pdf: $pdf.val().trim()
  };
  $.ajax("/api/attacks", {
    type: "POST",
    data: newAttack
  }).then(function() {
    console.log("attack added! " + newAttack.type);
    $date.val("");
    $year.val("");
    $type.val("");
    $country.val("");
    $area.val("");
    $location.val("");
    $injury.val("");
    $species.val("");
    $pdf.val("");
    location.reload();
  });
}

function startSearchForm() {
  $(function() {
    $("#formSearchSection").dialog({
      width: 1000,
      buttons: [
        {
          text: "OK",
          click: function() {
            $(this).dialog("close");
            searchAttack();
          }
        }
      ]
    })
  })
}

function startSubmitForm() {
  $(function() {
    $("#formReportSection").dialog({
      width: 1000,
      buttons: [
        {
          text: "Submit",
          click: function() {
            $("#noSubmitHeader").remove();
            var noSubmitString = "";
            for(var i = 0;i < arrayAll.length;i++){
              if(arrayAll[i].val()===""){
                noSubmitString += arrayAll[i].attr("id");
                if((i+1) < arrayAll.length){
                  noSubmitString += ", ";
                }
              }
            }
            if(noSubmitString!=""){
              var noSubmitHeader = $("<p style='color:red'>Submission rejected, please enter a value for the following forms: " + noSubmitString + "</p>");
              noSubmitHeader.attr("id", "noSubmitHeader");
              $("#noSubmit").append(noSubmitHeader);
            } else {
              $(this).dialog("close");
              addAttack();
            }
          }
        }
      ]
    })
  })
}

$("#openSubmitForm").on("click", startSubmitForm);
$("#openSearchForm").on("click", startSearchForm);