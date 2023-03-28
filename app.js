//-----------------------------------------------------------------------------
//?                               CHECKOUT PAGE
//-----------------------------------------------------------------------------
//---------------
//------------
//---------
//------
//---
//
// Constant Variables:
const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

// When the page loads:
window.addEventListener("load", () => {
    //Set item to LocalStorage
    localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);
    localStorage.setItem("shippingFreePrice", shippingFreePrice);
    //-----------------------------------------------------------
    //Set item to SessionStorage
    sessionStorage.setItem("taxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);
    sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
    //-----------------------------------------------------------
    //
    calculateCartPrice();
});

const productsDiv = document.querySelector(".products");
// Capturing vs. Bubbling
productsDiv.addEventListener("click", (event) => {
    // productsDiv ile parent için yakalama yapınca tıkladığımızı console yazdırıyoruz.
    // console.log(event.target);
    if (event.target.className == "fa-solid fa-minus") {
        //console.log("minus btn is cliked!");
        if (event.target.nextElementSibling.innerText > 1) {
            event.target.nextElementSibling.innerText--;
            //event.target.parentElement.querySelector(".quantity").innerText--;
            //yukarı kısımda parent üzerinden farklı bir yöntemle quentity'e ulaşabiliriz.

            //Product
            calculateProductPrice(event.target);
            //Cart
            calculateCartPrice();
        } else {
            if (confirm("Are you sure product will be removed?")) {
                //remove
                event.target.parentElement.parentElement.parentElement.remove();
                // index.html sayfasında;
                // 1.parent=quantity-controller
                // 2.parent=product-info
                // 3.parent=product

                //Cart
                calculateCartPrice();
            }
        }
    } else if (event.target.className == "fa-solid fa-plus") {
        //console.log("plus btn is cliked!");
        event.target.previousElementSibling.innerText++;

        //Product
        calculateProductPrice(event.target);

        //Cart
        calculateCartPrice();
    } else if (event.target.className == "remove-product") {
        //console.log("remove btn is cliked!");
        event.target.parentElement.parentElement.parentElement.remove();

        //Cart
        calculateCartPrice();
    } else {
        //console.log("other element is cliked!");
    }
})

const calculateProductPrice = (clickedBtn) => {
    //console.log(clickedBtn);
    const productInfoDiv = clickedBtn.parentElement.parentElement;
    //console.log(productInfoDiv);
    const price = productInfoDiv.querySelector(".product-price strong").innerText;
    //console.log(price);
    //alert(price);
    const quantity = productInfoDiv.querySelector(".quantity").innerText;
    //console.log(quantity);
    //alert(quantity);
    const productTotal = productInfoDiv.querySelector(".product-line-price");
    //console.log(productTotal);
    //alert(productTotal);
    productTotal.innerText = (price * quantity).toFixed(2);
    //console.log(productTotal.innetText = price * quantity)

}

const calculateCartPrice = () => {
    const productsTotalPices = document.querySelectorAll(".product-line-price")
    //forEach ==> NodeList, Array
    //const productsTotalPrices=[...document.getElementsByClassName("product-line-price")];
    let subtotal = 0;
    //
    productsTotalPices.forEach((div) => {
        subtotal += parseFloat(div.innerText);
    });
    //console.log(subtotal);

    const taxPrice = subtotal * localStorage.getItem("taxRate");
    //
    const shippingPrice = parseFloat((subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice") ?
        localStorage.getItem("shippingPrice") :
        0
    ))
    //console.log(shippingPrice) ; 
    document.querySelector("#cart-subtotal").lastElementChild.innerText=subtotal.toFixed(2);
    //----
    document.querySelector("#cart-tax p:nth-child(2)").innerText=taxPrice.toFixed(2);
    //----
    document.querySelector("#cart-shipping").children[1].innerText=shippingPrice.toFixed(2);
    //----
    document.querySelector("#cart-total").lastElementChild.innerText=(subtotal+taxPrice+shippingPrice).toFixed(2);
    

}