document.addEventListener("DOMContentLoaded", () => {
  const sections = {
    soup: document.querySelector('[data-category="soup"] .products-grid'),
    main: document.querySelector('[data-category="main"] .products-grid'),
    salad: document.querySelector('[data-category="salad"] .products-grid'),
    drink: document.querySelector('[data-category="drink"] .products-grid'),
    dessert: document.querySelector('[data-category="dessert"] .products-grid')
  };

  // На всякий случай — очистим гриды (чтобы повторный запуск не дублировал)
  Object.values(sections).forEach(s => {
    if (s) s.innerHTML = '';
  });

  // Сортировка блюд по имени
  dishes.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  dishes.forEach(dish => {
    const section = sections[dish.category];
    if (!section) return;

    const card = document.createElement("div");
    card.className = "product-card";

    // важные data-атрибуты для фильтрации и других сценариев
    card.dataset.dish = dish.keyword;
    card.dataset.kind = dish.kind ?? "";
    card.dataset.category = dish.category ?? "";

    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}">
      <p class="price">${dish.price}₽</p>
      <p class="name">${dish.name}</p>
      <div class="product-bottom">
        <p class="weight">${dish.count}</p>
        <button class="btn">Добавить</button>
      </div>
    `;

    section.appendChild(card);
  });
});
