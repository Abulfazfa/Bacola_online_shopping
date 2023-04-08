let table = document.querySelector('.table');
let emtyMessage = document.querySelector('.emptyPage');
let totalPriceArea = document.getElementById('totalPrice');
let top_total_price = document.querySelector('.top-total-price');
let basketCount = document.querySelector('.basketCount');
let total = 0;


if (localStorage.getItem('basket') != null) {
    EmptyBasket(1);
    let arr = JSON.parse(localStorage.getItem('basket'));
    arr.forEach(product => {
        //#region a
        let tr = document.createElement("tr");
        let tdImg = document.createElement('td');
        tdImg.innerHTML = `<img src="${product.imgUrl}" alt="" width="150" height="150" width="150" style = "width: auto">`
        let tdName = document.createElement('td');
        tdName.innerHTML = `${product.name}`
        let tdPrice = document.createElement('td');
        tdPrice.innerHTML = `${product.price}`
        let tdCount = document.createElement('td');
        tdCount.innerHTML = `<i class="fa-solid fa-square-minus"></i> <span>${product.count}</span> <i class="fa-solid fa-square-plus"></i>`
        let tdRemove = document.createElement('td');
        tdRemove.innerHTML = `<i class="fa-solid fa-trash"></i>`
        let productPrice = product.price.slice(1,-1);
        let totalPrice = `Total Price: $${total += (product.count * productPrice)}`;
        tr.append(tdImg,tdName,tdPrice,tdCount,tdRemove);
        table.lastElementChild.appendChild(tr);
        totalPriceArea.innerHTML = totalPrice;
        totalPriceArea.classList.remove('d-none');
        let trash = tr.lastElementChild;
        trash.classList.add("text-danger");
        tr.classList.add("text-center");
        top_total_price.innerHTML = `$${round(total, 2)}`;
        trash.lastElementChild.addEventListener("click", function (e) {
            const i = arr.indexOf(product);
            if (i > -1) {
                arr.splice(i, 1);
            }
            
            table.lastElementChild.removeChild(tr);
            totalPrice = `Total Price: $${total = total - (product.count * productPrice)}`;
            totalPriceArea.innerHTML = totalPrice;
            top_total_price.innerHTML = `${round(total, 2)}`;
            localStorage.setItem('basket',JSON.stringify(arr));
            calcBasketCount();
            removeBasket();
            
  
        })
        
        //#endregion


        tdCount.firstElementChild.style.cursor = "pointer";
        tdCount.lastElementChild.style.cursor = "pointer";
        tdCount.firstElementChild.addEventListener("click", function (e){
            product.count--;

            decraseProduct(product);
            tdCount.firstElementChild.nextElementSibling.innerText = product.count;
            total -= Number(productPrice)
            totalPrice = `Total Price: $${round(total, 2)}`;
            totalPriceArea.innerHTML = totalPrice;
            top_total_price.innerHTML = `$${round(total, 2)}`;
            if (`$${round(total, 2)}` != "$0") {
                top_total_price.innerHTML = `$${round(total, 2)}`;
            }
            else{
                top_total_price.innerHTML = `$0.00`;
            }
            if (product.count == 0) {
                table.lastElementChild.removeChild(tr);
                removeProduct(product);
                calcBasketCount();
                removeBasket();
                
            }
            
        })
        tdCount.lastElementChild.addEventListener("click", function (e){
            product.count++;
            increaseProduct(product);
            tdCount.firstElementChild.nextElementSibling.innerText = product.count;
            total += Number(productPrice)
            totalPrice = `Total Price: $${round(total, 2)}`;
            totalPriceArea.innerHTML = totalPrice;
            top_total_price.innerHTML = `$${round(total, 2)}`;
            
        })

    });
}
calcBasketCount();

function calcBasketCount() {
    if (localStorage.getItem('basket') != null) {
        let arr = JSON.parse(localStorage.getItem('basket'));
        console.log(arr);
        basketCount.innerText = arr.length;
    }
}


function removeProduct(product){
    if(localStorage.getItem('basket') != null){
        let arr = JSON.parse(localStorage.getItem('basket'));
        let clickcedProduct = arr.find(p => p.name == product.name);
        const i = arr.indexOf(clickcedProduct);
        console.log(i);
        if (i > -1) {
            arr.splice(i, 1);
        }
        console.log(arr);
        localStorage.setItem('basket',JSON.stringify(arr));
        
    }
}
function decraseProduct(product){
    if(localStorage.getItem('basket') != null){
        let arr = JSON.parse(localStorage.getItem('basket'));
        console.log(product.id);
        let clickcedProduct = arr.find(p => p.name == product.name);
        
        clickcedProduct.count--;     
        console.log(arr);
        localStorage.setItem('basket',JSON.stringify(arr));
        
    }
}

function increaseProduct(product){
    if(localStorage.getItem('basket') != null){
        let arr = JSON.parse(localStorage.getItem('basket'));
        console.log(product.id);
        let clickcedProduct = arr.find(p => p.name == product.name);        
        clickcedProduct.count++;     
        console.log(arr);
        localStorage.setItem('basket',JSON.stringify(arr));
    }
}

function removeBasket(){
    if (localStorage.getItem('basket') != null) {
        let arr = JSON.parse(localStorage.getItem('basket'));
        console.log(arr.length);
        if (arr.length == 0) {
            localStorage.removeItem('basket');
            EmptyBasket("-1");
        }
        location.reload();
    }
}
function EmptyBasket(number){
    if(number == 1){
        table.classList.remove('d-none');
        emtyMessage.classList.add('d-none');
    }
    else{
        table.classList.add('d-none');
        emtyMessage.classList.remove('d-none');
        totalPriceArea.classList.add('d-none');
    }
    
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
