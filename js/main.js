
var sumbtn = document.getElementById("sumbtn");
var inputname = document.getElementById("inputname");
var inputurl = document.getElementById("inputurl");
var tbody = document.getElementById("tbody");
var deletebtn = document.getElementById("delete");
var visitbtn = document.getElementById("visit");

var overlay = document.querySelector(".overlay");
var closebtn = document.querySelector(".close-icon");

var allproduct = [];


if (localStorage.getItem("allproducts") != null) {
    allproduct = JSON.parse(localStorage.getItem("allproducts"));
    dispaly();
}


sumbtn.addEventListener("click", add);

function add() {
    
    if (Vaild() && vaildmail()) {
        var product = {
            name: inputname.value,
            url: inputurl.value,
        };

        allproduct.push(product);
        localStorage.setItem("allproducts", JSON.stringify(allproduct));
        dispaly();
        inputname.value = "";
        inputurl.value = "";
    } else {
        
        inputname.style.color = "red";
        inputurl.style.color = "red";
        inputname.style.borderColor = "red";
        inputname.style.borderWidth = "2px";
        inputurl.style.borderColor = "red";
        inputurl.style.borderWidth = "2px";

        overlay.classList.add("appear");
    }
}

function clear() {
    inputname.value = "";
    inputurl.value = "";
}

function dispaly() {
    var box = '';

    
    for (var i = 0; i < allproduct.length; i++) {
        box += `
            <tr>
                <th>${i + 1}</th>
                <th>${allproduct[i].name}</th>
                <th><button type="button" class="btn btn-success" onclick="visititem(${i})">
                    <i class="fa-solid fa-eye"></i> Visit
                </button></th>
                <th><button type="button" class="btn btn-danger" onclick="deleteitem(${i})">
                    <i class="fa-solid fa-trash"></i> Delete
                </button></th>
            </tr>
        `;
    }

    tbody.innerHTML = box;
}

function deleteitem(index) {
    
    allproduct.splice(index, 1);
    localStorage.setItem("allproducts", JSON.stringify(allproduct));
    dispaly();
    clear();
}

function visititem(index) {
   
    window.open(allproduct[index].url);
}

function Vaild() {
    
    var nameregex = /^[A-Z][a-z]{1,9}$/;
    var testing = nameregex.test(inputname.value);
    if (testing === true) {
        inputname.style.color = "green";
        inputname.style.borderColor = "green";
        inputname.style.borderWidth = "2px";
        return true;
    } else {
        return false;
    }
}

function vaildmail() {
   
    var urlregex = /^(http(s)?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)$/;
    var test = urlregex.test(inputurl.value);
    if (test === true) {
        inputurl.style.color = "green";
        inputurl.style.borderColor = "green";
        inputurl.style.borderWidth = "2px";
        return true;
    } else {
        return false;
    }
}

function checking() {
   
    overlay.classList.remove("appear");
    overlay.classList.add("clear");
}

closebtn.addEventListener("click", checking);
