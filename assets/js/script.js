///////////basket////////////////
let addBaskets = document.querySelectorAll('.btn-add-to-cart');
let basketCount = document.querySelector('.basketCount');
addBaskets.forEach(addBasket => {  
    
    addBasket.addEventListener('click', function(event){
        event.preventDefault();
        let id = addBasket.parentNode.parentNode.getAttribute("data-id");
        let img = addBasket.parentNode.parentNode.firstElementChild.firstElementChild.getAttribute('src');
        let name = addBasket.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.innerText;
        let price = addBasket.previousElementSibling.firstElementChild.innerText;
        if(localStorage.getItem('basket') == null){
           localStorage.setItem('basket',JSON.stringify([]));
        }
        let arr = JSON.parse(localStorage.getItem('basket'));
        let existProduct = arr.find(p => p.id == id);
        if(existProduct == undefined){
            arr.push({
                id: id,
                imgUrl: img,
                name: name,
                price: price,
                count: 1
            });
        }
        else{
            existProduct.count++;
        }
        
        localStorage.setItem('basket',JSON.stringify(arr));
        calcBasketCount();
    })
})

///////////counter////////////
$(document).ready(function(){

    var countDownDate = new Date("Apr 30, 2023 15:37:25").getTime();
    
    var x = setInterval(function() {
    
      var now = new Date().getTime();

      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days < 10) {
        days = "0" + days;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      $(".days").text(days);
      $(".hours").text(hours);
      $(".minutes").text(minutes);
      $(".second").text(seconds);
        
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
 
  
});
////hover////////
let homeHover = document.getElementById("homeHover"); 
let shopHover = document.getElementById("shopHover");
let sub_menu_top = document.querySelector(".sub-menu-top");
let sub_menu_home = document.querySelector(".sub-menu-home");
shopHover.addEventListener("mouseover", function(e) {
  console.log(sub_menu_top);
  sub_menu_top.classList.add("visibility");
})
shopHover.addEventListener("mouseleave", function(e) {
  console.log(sub_menu_top);
  sub_menu_top.classList.remove("visibility");
})
homeHover.addEventListener("mouseover", function(e) {
  console.log(sub_menu_home);
  sub_menu_home.classList.add("visibility");
})
homeHover.addEventListener("mouseleave", function(e) {
  console.log(sub_menu_home);
  sub_menu_home.classList.remove("visibility");
})














calcBasketCount();
function calcBasketCount() {
    if (localStorage.getItem('basket') != null) {
        let arr = JSON.parse(localStorage.getItem('basket'));
        basketCount.innerText = arr.length;
    }
}