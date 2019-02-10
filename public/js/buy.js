const $buysubmit = $("#buysubmit");

var API = {
  updateBuy: toys => {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "/api/toys",
      data: toys
    });
  }
};

const buySubmit = () => {
  const toyID = $buysubmit.attr("data");
  const newBuyStatus = {
    id: toyID,
    buystatus: true
  };
  
  console.log(`ToyID to update: ${toyID}`)
  event.preventDefault();
  API.updateBuy(newBuyStatus).then(() => {
    alert(`${toyID} updated to true`);
  });
};

$buysubmit.on("click", buySubmit);
