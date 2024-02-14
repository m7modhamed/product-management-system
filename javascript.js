let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let btnDeleteAll = document.getElementById("deleteAll");
let countSpan = document.getElementById("deleteCount");

let mode = "create";
let temp;
// get total
function getTotal() {
  if (price.value != "") {
    let res = +price.value + +taxes.value + +ads.value - +discount.value;

    total.innerHTML = res;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// create product
let dataPro = [];
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if(title.value != '' && price.value != '' && category.value != ''){
    if (mode == "create") { 
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else if(mode == "update") {
      dataPro[temp] = newPro;
      mode = "create";
    }
    clearData();
}

  localStorage.setItem("product", JSON.stringify(dataPro));
  
  showData();
};

// reset inputs filed

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  total.style.background = "#a00d02";
}

// read data from loacl storge
function showData() {
  let row;
  for (let i = 0; i < dataPro.length; i++) {
    row += `
             <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                </tr>
             `;
  }
  document.getElementById("tb").innerHTML = row;
  submit.innerHTML = "Create";
  showDeleteAllBtn();
  count.style.display = "block";
}

showData();

//delete product
function deleteData(i) {
  dataPro.splice(i, 1);

  localStorage.product = JSON.stringify(dataPro);
  showData();
}

//show deleteAll button
function showDeleteAllBtn() {
  countSpan.innerHTML = ` (${dataPro.length})`;
  if (dataPro.length > 0) {
    btnDeleteAll.classList.remove("hidden");
  } else {
    btnDeleteAll.classList.add("hidden");
  }
}

// delete all
btnDeleteAll.onclick = function () {
  dataPro = [];
  localStorage.removeItem("product");
  showData();
};

//update product

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  total.innerHTML = dataPro[i].total;
  category.value = dataPro[i].category;
  getTotal();
  submit.innerHTML = "Update";
  count.style.display = "none";
  mode = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//serach

let serachMode = "title";

function getSearchMode(id) {
  let serach = document.getElementById("search");
  if (id == "searchTitle") {
    serachMode = "title";
  } else {
    serachMode = "category";
  }
  serach.placeholder = "search by " + serachMode;

  serach.value = "";
  showData();
  serach.focus();
}

function searchData(val) {
  val = val.toLowerCase();
  let row = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (serachMode == "title") {
        if (dataPro[i].title.includes(val)) {
        row += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                </tr>
                `;
        }
    } else {
        if (dataPro[i].category.includes(val)) {
        row += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick='updateData(${i})' id="update">update</button></td>
                <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
            </tr>
            `;
        }
    }
}
    document.getElementById("tb").innerHTML = row;
}


//check of data

