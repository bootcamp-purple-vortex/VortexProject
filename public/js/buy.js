const $buysubmit = $("#buysubmit");

updateBuy = toys => {
  $.ajax({
    method: "PUT",
    url: "/api/toys",
    data: toys
  }).then(() => {
    $("#buyModal").modal("show");
  });
};

const buySubmit = () => {
  const toyID = $buysubmit.attr("data");
  const newBuyStatus = {
    id: toyID,
    buystatus: true
  };

  console.log(`ToyID to update: ${toyID}`)
  event.preventDefault();
  
  updateBuy(newBuyStatus);
};

$buysubmit.on("click", buySubmit);
