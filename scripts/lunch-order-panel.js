document.addEventListener("DOMContentLoaded", () => {
    const categories = ["soup", "main-course", "salad", "drink", "dessert"];

    // Создаем панель перехода к заказу
    const goToOrderPanel = document.createElement("div");
    goToOrderPanel.className = "go-to-order-panel";
    goToOrderPanel.innerHTML = `
        <span>Итого: <strong id="panel-total">0</strong> ₽</span>
        <a href="order.html" class="btn-go-to-order disabled" aria-disabled="true">Перейти к оформлению</a>
    `;
    document.body.appendChild(goToOrderPanel);

    const panelTotalEl = goToOrderPanel.querySelector("#panel-total");
    const goBtn = goToOrderPanel.querySelector(".btn-go-to-order");



    // Проверка готовности данных
    function updatePanelIfReady() {
        // Всегда проверяем с небольшой задержкой
        setTimeout(() => {
            updatePanel();
        }, 200);
    }

    // Проверка, соответствует ли заказ одному из комбо (без десерта)
    function isValidCombo(order) {
        const hasSoup = !!order.soup;
        const hasMain = !!order["main-course"];
        const hasSalad = !!order.salad;
        const hasDrink = !!order.drink;

        // Обязательное условие: должен быть напиток
        if (!hasDrink) return false;

        // Допустимые комбинации согласно заданию
        if (hasSoup && hasMain && hasSalad && hasDrink) return true; // Полный комбо
        if (hasSoup && hasMain && hasDrink) return true; // Суп + главное + напиток
        if (hasSoup && hasSalad && hasDrink) return true; // Суп + салат + напиток  
        if (hasMain && hasSalad && hasDrink) return true; // Главное + салат + напиток
        if (hasMain && hasDrink) return true; // Только главное + напиток

        return false;
    }

    // Обновление панели (сумма, отображение, доступность кнопки)
    function updatePanel() {
        if (!window.dishes || !window.dishes.length) {
            return;
        }

        const order = window.getOrderFromStorage();
        let total = 0;
        let hasAnyDish = false;

        categories.forEach(cat => {
            const id = order[cat];
            if (!id) return;
            const dish = window.dishes.find(d => d.id === id);
            if (dish) {
                total += dish.price;
                hasAnyDish = true;
            }
        });

        panelTotalEl.textContent = total;
        goToOrderPanel.style.display = hasAnyDish ? "flex" : "none";

        if (isValidCombo(order)) {
            goBtn.classList.remove("disabled");
            goBtn.removeAttribute("aria-disabled");
        } else {
            goBtn.classList.add("disabled");
            goBtn.setAttribute("aria-disabled", "true");
        }
    }

    // Подписка на клик по кнопкам "Добавить" в карточках
    document.body.addEventListener("click", (e) => {
        if (!e.target.classList.contains("btn")) return;

        const card = e.target.closest(".product-card");
        if (!card) return;

        const dish = window.dishes.find(d => d.keyword === card.dataset.dish);
        if (!dish) return;

        // Сохраняем выбор через функцию из storage.js
        const currentOrder = window.getOrderFromStorage();
        currentOrder[dish.category] = dish.id;
        window.saveOrderToStorage(currentOrder);

        // Снимаем выделение в категории
        document.querySelectorAll(`.product-card[data-category="${dish.category}"]`).forEach(c => {
            c.classList.remove("selected");
            c.querySelector(".btn").textContent = "Добавить";
        });

        // Выделяем текущую карточку
        card.classList.add("selected");
        card.querySelector(".btn").textContent = "Выбрано";

        updatePanel();
    });

    // Подписываемся на событие загрузки блюд
    document.addEventListener("dishesLoaded", () => {
        updatePanel();
    });

    // Инициализируем панель
    updatePanelIfReady();

    // Отслеживаем изменения localStorage (например, при удалении на странице заказа)
    window.addEventListener('storage', () => {
        updatePanel();
    });
});
