
// ====== Глобальный массив блюд ======
let dishes = [];
window.dishes = dishes;

// ====== Конфигурация ======
const API_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";
const API_KEY = "b634db2f-f767-4d3e-a0c0-341ca2959925";



const categories = ["soup", "main-course", "salad", "drink", "dessert"];


// ====== Работа с localStorage ======
// Функции getOrderFromStorage и saveOrderToStorage определены в storage.js


// ====== Загрузка блюд ======
async function loadDishes() {
    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Ошибка загрузки блюд");


        dishes = await response.json();
        window.dishes = dishes; // Обновляем глобальную переменную
        renderDishes();

    } catch (error) {
        console.error("Ошибка при загрузке блюд:", error);
    }
}

// ====== Отрисовка карточек ======
function renderDishes() {
    const sections = {
        soup: document.querySelector('[data-category="soup"] .products-grid'),
        "main-course": document.querySelector('[data-category="main-course"] .products-grid'),
        salad: document.querySelector('[data-category="salad"] .products-grid'),
        drink: document.querySelector('[data-category="drink"] .products-grid'),
        dessert: document.querySelector('[data-category="dessert"] .products-grid')
    };

    Object.values(sections).forEach(section => {
        if (section) section.innerHTML = "";
    });


    const order = window.getOrderFromStorage();

    dishes
        .sort((a, b) => a.name.localeCompare(b.name, "ru"))
        .forEach(dish => {

            const normalizedCategory = dish.category;
            const section = sections[normalizedCategory];
            if (!section) return;


            const card = document.createElement("div");
            card.className = "product-card";
            card.dataset.dish = dish.keyword;
            card.dataset.category = normalizedCategory;
            card.dataset.kind = dish.kind;

            const isSelected = order[normalizedCategory] === dish.id;

            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <p class="price">${dish.price}₽</p>
                <p class="name">${dish.name}</p>
                <div class="product-bottom">
                    <p class="weight">${dish.count}</p>
                    <button class="btn">
                        ${isSelected ? "Выбрано" : "Добавить"}
                    </button>
                </div>
            `;

            if (isSelected) {
                card.classList.add("selected");
            }

            section.appendChild(card);
        });
}

// ====== Обработка выбора блюда ======
document.body.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) return;

    const card = e.target.closest(".product-card");
    const category = card.dataset.category;
    const dish = dishes.find(d => d.keyword === card.dataset.dish);
    if (!dish) return;


    const order = window.getOrderFromStorage();

    // снимаем выделение в текущей категории
    document
        .querySelectorAll(`.product-card[data-category="${category}"]`)
        .forEach(c => {
            c.classList.remove("selected");
            c.querySelector(".btn").textContent = "Добавить";
        });

    // сохраняем выбор
    order[category] = dish.id;
    window.saveOrderToStorage(order);

    // выделяем текущую карточку
    card.classList.add("selected");
    card.querySelector(".btn").textContent = "Выбрано";
});

// ====== Инициализация ======
document.addEventListener("DOMContentLoaded", () => {
    loadDishes();
    document.dispatchEvent(new CustomEvent("dishesLoaded"));

});
