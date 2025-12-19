// ====== Глобальный массив блюд (заполняется через API) ======
let dishes = [];

// ====== Загрузка блюд с сервера ======
async function loadDishes() {
    const API_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Ошибка загрузки данных о блюдах");
        }

        const data = await response.json();

        // сохраняем данные в глобальный массив
        dishes = data;

        // отрисовываем блюда после загрузки
        renderDishes();
    } catch (error) {
        console.error("Ошибка при загрузке блюд:", error);
    }
}

const categoryMap = {
  "soup": "soup",
  "main-course": "main",
  "salad": "salad",
  "drink": "drink",
  "dessert": "dessert"
};


// ====== Отрисовка карточек блюд ======
function renderDishes() {
    const sections = {
        soup: document.querySelector('[data-category="soup"] .products-grid'),
        main: document.querySelector('[data-category="main"] .products-grid'),
        salad: document.querySelector('[data-category="salad"] .products-grid'),
        drink: document.querySelector('[data-category="drink"] .products-grid'),
        dessert: document.querySelector('[data-category="dessert"] .products-grid')
    };

    // очищаем секции перед рендером
    Object.values(sections).forEach(section => {
        if (section) section.innerHTML = "";
    });

    // сортировка по названию
    dishes.sort((a, b) => a.name.localeCompare(b.name, "ru"));

    dishes.forEach(dish => {
        const normalizedCategory = categoryMap[dish.category];
        const section = sections[normalizedCategory];
        if (!section) return;

        const card = document.createElement("div");
        card.className = "product-card";

        // data-атрибуты — используются в order.js и filters.js
        card.dataset.dish = dish.keyword;
        card.dataset.kind = dish.kind ?? "";
        card.dataset.category = normalizedCategory ?? "";


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
}

// ====== Запуск загрузки при старте страницы ======
document.addEventListener("DOMContentLoaded", () => {
    loadDishes();
});
