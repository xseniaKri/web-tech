document.addEventListener("DOMContentLoaded", () => {
    const sections = {
      soup: document.querySelector('.product-section:nth-of-type(1) .products-grid'),
      main: document.querySelector('.product-section:nth-of-type(2) .products-grid'),
      drink: document.querySelector('.product-section:nth-of-type(3) .products-grid')
    };

    dishes.sort((a, b) => a.name.localeCompare(b.name));
  
    dishes.forEach(dish => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute("data-dish", dish.keyword);
  
      card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}₽</p>
        <p class="name">${dish.name}</p>
        <div class="product-bottom">
          <p class="weight">${dish.count}</p>
          <button class="btn">Добавить</button>
        </div>
      `;
  
      sections[dish.category].appendChild(card);
    });
  });
  