const listCategory = document.querySelector('.category-list')
const urlCategory = "https://books-backend.p.goit.global/books/category-list"
fetch(urlCategory)
  .then(response => response.json())
  .then(data => {
    const array = data;
    const markupCategories = array.map(category =>
      `<li class="item" data-name="${category.list_name}">${category.list_name}</li>`
    ).join('');
    listCategory.insertAdjacentHTML('beforeend', markupCategories);
  })
  .catch(error => console.log(error));