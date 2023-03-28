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
});

const productsDiv = document.querySelector(".products");
// Capturing vs. Bubbling
productsDiv.addEventListener("click",(event)=>{
    // productsDiv ile parent için yakalama yapınca tıkladığımızı console yazdırıyoruz.
    // console.log(event.target);
    if(event.target.className=="fa-solid fa-minus"){
        //console.log("minus btn is cliked!");
        if(event.target.nextElementSibling.innerText>1){
            event.target.nextElementSibling.innerText--;
            //event.target.parentElement.querySelector(".quantity").innerText--;
            //yukarı kısımda parent üzerinden farklı bir yöntemle quentity'e ulaşabiliriz. 
        }
        else{
            if (confirm("Are you sure product will be removed?")) {
                //remove
                event.target.parentElement.parentElement.parentElement.remove();
                // index.html sayfasında;
                // 1.parent=quantity-controller
                // 2.parent=product-info
                // 3.parent=product
            }
        }
    }
    else if(event.target.className=="fa-solid fa-plus"){
        //console.log("plus btn is cliked!");
        event.target.previousElementSibling.innerText++;
    }
    else if(event.target.className=="remove-product"){
        //console.log("remove btn is cliked!");
        event.target.parentElement.parentElement.parentElement.remove();
    }
    else{
        //console.log("other element is cliked!");
    }
})