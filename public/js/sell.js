// Get references to sell page elements
var $username = $("#username");
var $toysname = $("#toyname");
var $price = $("#price");
var $location = $("#location");
var $description = $("#description");

var $sellsubmit = $("#sellsubmit");
var $sellList = $("#sell-list");

var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dgxlfualn/upload";
var UPLOAD_PRESET = "ymyi8ysv";
var upload_file = document.getElementById("file-upload");
var image = "";

// upload image 
upload_file.addEventListener("change", function(event){
  console.log(event);
  var file = event.target.files[0];
  console.log(file);
  var formdata = new FormData();
  formdata.append('file', file);
  formdata.append('upload_preset', UPLOAD_PRESET);
 
  axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formdata
  })
  .then(function(res){
      // console.log(res);
      console.log(res.data.secure_url);
      image = res.data.secure_url;
  }).catch(function(err){
      console.error(err);
  });
});

// The API object contains methods for each kind of request we'll make
var API = {
   
  saveSell: function (toys) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/sell",
      data: JSON.stringify(toys)
    });
  },
  getSell: function () {
    return $.ajax({
      url: "/api/sell",
      type: "GET"
    });
  }
};
// refreshSell gets new toys from the db and repopulates the list
var refreshSell = function() {
    API.getSell().then(function (data) {
      var $sells = data.map(function (sell) {
        var $a = $("<a>")
          .text("User Name : "+sell.username + "Toys Name : "+sell.toysname+"Price : "+sell.price)
          .attr("href", "/sell/" + sell.id);
  
        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": sell.id
          })
          .append($a);
  
        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");
  
        $li.append($button);
  
        return $li;
      });
  
      $sellList.empty();
      $sellList.append($sells);
    });
  };
  // handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handlesellFormSubmit = function (event) {
    event.preventDefault();
    // console.log(image);
    var toys = {
      username: $username.val().trim(),
      toysname: $toysname.val().trim(),
      price: $price.val().trim(),
      location: $location.val().trim(),
      description: $description.val().trim(),
      image : image
    };
    
    if (!(toys.username && toys.toysname && toys.price && toys.location && toys.description)) {
      alert("Please complete form young Jedi");
      return;
    }
    // Validtion through bootstrap rendered this code useless
    // if (isNaN(toys.price)) {
    //   alert("There is no try, there is only do (ENTER A VALID PRICE");
  
    API.saveSell(toys).then(function () {
      refreshSell();
    });
  
    $username.val("");
    $toysname.val("");
    $price.val("");
    $location.val("");
    $description.val("");
  
  };

$sellsubmit.on("click", handlesellFormSubmit);
