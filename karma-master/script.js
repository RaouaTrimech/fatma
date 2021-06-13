function singup() {
    // Recupération des valeurs ecrites par l'itilsateur
    var firstName = document.getElementById("firstName").value;
    var verifFirstName = verifLength(firstName,5);
    if (verifFirstName) {
        document.getElementById("firstNameError").innerHTML = "";
        
    } else {
        document.getElementById("firstNameError").innerHTML = "First Name must have at least 5 characters";

        document.getElementById("firstNameError").style.color = "red";
    }
    var lastName = document.getElementById("lastName").value;
    var verifLastName = verifLength(lastName,4);
    if (verifLastName) {
        document.getElementById("lastNameError").innerHTML = "";
        
    } else {
        document.getElementById("lastNameError").innerHTML = "Last Name must have at least 4 characters";

        document.getElementById("lastNameError").style.color = "red";
    }

    var email = document.getElementById("email").value;
    var verifEmail = validateEmail(email);
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";
        
    } else {
        document.getElementById("emailError").innerHTML = "Invalid Email";

        document.getElementById("emailError").style.color = "red";
    }

    var pwd = document.getElementById("pwd").value;
    var verifpwd = verifLength(pwd,8);
    if (verifpwd) {
        document.getElementById("pwdError").innerHTML = "";
        
    } else {
        document.getElementById("pwdError").innerHTML = "Email must have at least 8 characters";

        document.getElementById("pwdError").style.color = "red";
    }

    var confirmPwd = document.getElementById("confirmPwd").value;
    if (confirmPwd == pwd) {
        document.getElementById("confirmPwdError").innerHTML = "";
        
    } else {
        document.getElementById("confirmPwdError").innerHTML = "Invalid confirm Password";

        document.getElementById("confirmPwdError").style.color = "red";
    }
    var tel = document.getElementById("tel").value;

    var verifTel = tel.length == 8 ;
    if (verifTel) {
        document.getElementById("telError").innerHTML = "";
        
    } else {
        document.getElementById("telError").innerHTML = "Invalid Tel";

        document.getElementById("telError").style.color = "red";
    }
   
    if (verifFirstName && verifLastName && verifEmail && verifpwd && (confirmPwd == pwd) && verifTel) {
      
        var idUser = JSON.parse(localStorage.getItem("idUser") || "1");
    // regroupement des valeurs dans un objet user
    var user = {
        id : idUser,
        firstName : firstName,
        lastName : lastName,
        email : email,
        pwd : pwd,
        confirmPwd : confirmPwd,
        tel : tel,
        role : "user"
    };

    // Recuperation des anciens objet dans local 
    // JSON.parse permet de convertir une chaine vers un objet
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    // ajout de l'objet user dans le tableau users 
    users.push(user);

    // stockage du tableau 
    // JSON.stringify permet de convertir un objet vers une chaine de caractère
    localStorage.setItem("users",JSON.stringify(users));


    localStorage.setItem("idUser",idUser + 1);

    location.replace("login.html");
    }

    


}

//declaration d'une fonction
function verifLength(chaine,nb) {
    return chaine.length>= nb ;
}

function validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

function addProduct() {

    //la récupération des valeurs dans les inputs

    var productName = document.getElementById("productName").value;
    var verifProductName = verifLength(productName,4);
    if (verifProductName) {
        document.getElementById("productNameError").innerHTML = "";
    }
    else{
        document.getElementById("productNameError").innerHTML = "Product Name must have at least 4 carachters";
        document.getElementById("productNameError").style.color = "red";
    }
    var price = document.getElementById("price").value; 
    if (price>0) {
        document.getElementById("priceError").innerHTML = "";
    }
    else{
        document.getElementById("priceError").innerHTML = "Invalid price";
        document.getElementById("priceError").style.color = "red";
    }
    var stock = document.getElementById("stock").value;
    if (stock>10) {
        document.getElementById("stockError").innerHTML = "";
    }
    else{
        document.getElementById("stockError").innerHTML = "Invalid stock";
        document.getElementById("stockError").style.color = "red";
    }
    var category = document.getElementById("category").value;
    if (category.length>0) {
        document.getElementById("categoryError").innerHTML = "";
    }
    else{
        document.getElementById("categoryError").innerHTML = "Category is required";
        document.getElementById("categoryError").style.color = "red";
    }

    if (verifProductName && (price>0) && (stock>10) && (category.length>0)) {
        var products = JSON.parse(localStorage.getItem("products") || "[]");
    var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");

    var product = {
        id : idProduct,
        productName : productName,
        price : price,
        stock : stock,
        category : category
    };

    products.push(product);

    localStorage.setItem("products",JSON.stringify(products));
    localStorage.setItem("idProduct", idProduct + 1);
    }
    

}


function displayProducts() {
    var products = JSON.parse(localStorage.getItem("products") || "[]");

    var prTable = `
    <table class="table table-hover">
    <tr>
        <th>Product Name </th>
        <th>Price </th>
        <th>Stock </th>
        <th>Category </th>
        <th>Actions </th>
        
    </tr>
    `;

    for (let i = 0; i < products.length; i++) {
       
        prTable = prTable + `
        <tr>
            <td>${products[i].productName}</td>
            <td>${products[i].price}</td>
            <td>${products[i].stock}</td>
            <td>${products[i].category}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="displayProduct(${products[i].id})">Display</button>
            <button type="button" class="btn btn-warning" onclick="editProduct(${products[i].id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteObject(${i},'products')">Delete</button>

            </td>
        </tr>
        `;
        
    }

    prTable = prTable + `
    </table>
    `;

    document.getElementById("prTable").innerHTML = prTable;
    
    
}

function deleteObject(pos,clé){
    var objects = JSON.parse(localStorage.getItem(clé)||"[]");
    objects.splice(pos,1);
    localStorage.setItem(clé,JSON.stringify(objects));
    location.reload();//rafraichir la page 
}

function displayProduct(id){
    localStorage.setItem("idPr",id);
    location.replace("displayProduct.html");//thizni min page el o5ra
}

function displaySearchedProduct() {
    var idPr = localStorage.getItem("idPr");
    var searchedPr=SearchById(idPr,"products");
    document.getElementById("prName").innerHTML=searchedPr.productName;
    document.getElementById("prPrice").innerHTML=searchedPr.price+"DT";
    document.getElementById("prStock").innerHTML=searchedPr.stock+"pieces";
    document.getElementById("prCategory").innerHTML=searchedPr.category;
}

function SearchById(id,clé) {
    var objects =JSON.parse(localStorage.getItem(clé)||"[]");
    var obj;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id==id) {
            obj=objects[i];
        }        
    }
    return obj;
}

function editProduct(id) {
    var searchedPr =SearchById(id,"products");
    var editForm=`
    <div class="col-md-12 form-group">
        <input type="number" class="form-control" id="price" name="name" placeholder="Price" value="${searchedPr.price}">
        <span id="priceError"></span>
    </div>
    <div class="col-md-12 form-group">
        <input type="number" class="form-control" id="stock" name="name" placeholder="Stock"  value="${searchedPr.stock}">
        <span id="stockError"></span>
    </div>
   
    <div class="col-md-12 form-group">
        <button type="submit" value="submit" class="primary-btn" onclick="ValidateEditProduct(${searchedPr.id})" >Edit product</button>
        
    </div>
    `;
    document.getElementById("editForm").innerHTML=editForm;
}