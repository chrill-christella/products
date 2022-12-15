const products = [
  {
    title: "Jordans",
    description: "Some descriptions about this product",
    date: "2022-11-07",
    price: 100,
    category: "Clothes",
    picture:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    availability: 12,
  },
];

let imageUrl = "";

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    title: e.target.elements["title"].value,
    description: e.target.elements["description"].value,
    date: e.target.elements["date"].value,
    price: e.target.elements["price"].value,
    category: e.target.elements["category"].value,
    picture: imageUrl,
    availability: e.target.elements["availability"].value,
  };
  products.push(product);
  renderProducts(products);
  e.target.elements["title"].value = "";
  e.target.elements["description"].value = "";
  e.target.elements["date"].value = "";
  e.target.elements["price"].value = "";
  e.target.elements["category"].value = "";
  e.target.elements["availability"].value = "";
});

document.querySelector("#picture").addEventListener("change", function () {
  const reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.addEventListener("load", () => {
    imageUrl = reader.result;
  });
});

const renderProducts = (data) => {
  const productsList = document.querySelector(".product-list");
  productsList.innerHTML = "";
  data.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.setAttribute("class", "product");
    const productImage = document.createElement("div");
    productImage.setAttribute("class", "product-image");
    const image = document.createElement("img");
    image.setAttribute("class", "picture");
    image.setAttribute("src", product.picture);
    productImage.appendChild(image);
    const productInfo = document.createElement("div");
    productInfo.setAttribute("class", "product-info");
    const title = document.createElement("h2");
    title.textContent = product.title;
    const p = document.createElement("p");
    const category = document.createElement("span");
    category.setAttribute("class", "category");
    category.textContent = product.category;
    p.appendChild(category);
    const productDate = document.createElement("span");
    productDate.setAttribute("class", "product-date");
    productDate.textContent = product.date;
    const availability = document.createElement("span");
    availability.setAttribute("class", "product-availability");
    availability.textContent = `${product.availability} in stock`;
    const viewButton = document.createElement("button");
    viewButton.setAttribute("class", "view");
    viewButton.textContent = "View";
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.setAttribute("value", index);
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (e) => {
      console.log("Pre", products);
      products.splice(parseInt(e.target.value), 1);
      console.log("Post", products);
      renderProducts(products);
    });
    const description = document.createElement("div");
    description.setAttribute("class", "product-description hide");
    description.textContent = product.description;
    productInfo.appendChild(title);
    productInfo.appendChild(p);
    productInfo.appendChild(productDate);
    productInfo.appendChild(availability);
    viewButton.addEventListener("click", (e) => {
      description.classList.toggle("hide");
    });
    productInfo.appendChild(viewButton);
    productInfo.appendChild(deleteButton);
    productInfo.appendChild(description);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productInfo);
    productsList.appendChild(productDiv);
  });
};

renderProducts(products);
