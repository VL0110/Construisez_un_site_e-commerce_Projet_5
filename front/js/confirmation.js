
function commandConfirmed() {
    const idOrder = document.getElementById("orderId");
    idOrder.innerText = localStorage.getItem("orderId");
    localStorage.clear();
    let orderNum = new URLSearchParams(document.location.search).get("order");
    document.querySelector("#orderId").innerHTML = `<br>${orderNum}<br>Merci pour votre achat`;
    orderNum = undefined;
}
