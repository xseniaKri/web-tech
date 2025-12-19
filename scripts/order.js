document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api";
    const API_KEY = "b634db2f-f767-4d3e-a0c0-341ca2959925";

    const categories = ["soup", "main-course", "salad", "drink", "dessert"];

    let order = loadOrder();
    let dishes = [];

    // Элементы DOM
    const emptyContainer = document.getElementById("order-empty");
    const itemsContainer = document.getElementById("order-items");
    const totalElement = document.getElementById("total");
    const form = document.querySelector(".order-form");

    // Загрузка данных
    try {
        const res = await fetch(`${API_URL}/dishes?api_key=${API_KEY}`);
        if (!res.ok) throw new Error("Ошибка загрузки блюд");
        dishes = await res.json();
    } catch (error) {
        console.error("Ошибка при загрузке блюд:", error);
        alert("Ошибка загрузки данных. Попробуйте обновить страницу.");
        return;
    }

    renderOrder();
    updateTotal();

    // Отрисовка заказа
    function renderOrder() {
        itemsContainer.innerHTML = "";

        const selectedIds = Object.values(order).filter(Boolean);

        if (selectedIds.length === 0) {
            emptyContainer.style.display = "block";
            return;
        }

        emptyContainer.style.display = "none";

        categories.forEach(category => {
            const dishId = order[category];

            if (!dishId) {
                itemsContainer.insertAdjacentHTML("beforeend", `
                    <div class="order-item empty">
                        ${getEmptyText(category)}
                    </div>
                `);
                return;
            }

            const dish = dishes.find(d => d.id === dishId);
            if (!dish) return;

            itemsContainer.insertAdjacentHTML("beforeend", `
                <div class="product-card" data-category="${category}">
                    <img src="${dish.image}" alt="${dish.name}" class="dish-image">
                    <h3>${dish.name}</h3>
                    <p class="price">${dish.price} ₽</p>
                    <button class="remove-btn" data-category="${category}">Удалить</button>
                </div>
            `);
        });
    }

    // Удаление блюда
    document.body.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-btn")) return;

        const category = e.target.dataset.category;
        order[category] = null;

        saveOrder();
        renderOrder();
        updateTotal();
        updateFormDisplay();
    });

    // Пересчёт итоговой стоимости
    function updateTotal() {
        const sum = categories.reduce((acc, cat) => {
            const id = order[cat];
            if (!id) return acc;
            const dish = dishes.find(d => d.id === id);
            return acc + (dish ? dish.price : 0);
        }, 0);

        totalElement.textContent = sum;
    }



    // Проверка валидности комбо (без десерта)
        function isValidCombo() {
            // Получаем текущий заказ без десерта
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
    
        // Обновление отображения формы (левая колонка)
        function updateFormDisplay() {
            categories.forEach(category => {
                const dishId = order[category];
                const container = document.getElementById(`selected-${category}`);
                
                if (!dishId) {
                    container.querySelector("span").textContent = 
                        category === "main-course" ? "Не выбрано" : "Не выбран";
                    return;
                }
    
                const dish = dishes.find(d => d.id === dishId);
                if (dish) {
                    container.querySelector("span").textContent = `${dish.name} — ${dish.price} ₽`;
                }
            });
        }
    

        // Отправка заказа
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            if (!isValidCombo()) {
                alert("Состав заказа не соответствует доступным комбо. Проверьте, что у вас есть напиток и хотя бы одно основное блюдо или комбинация супа/салата.");
                return;
            }
    


            // Создаем объект с данными заказа
            const orderData = {
                full_name: form.full_name.value,
                email: form.email.value,
                phone: form.phone.value,
                delivery_address: form.delivery_address.value,
                delivery_type: form.delivery_type.value,
                delivery_time: form.delivery_time.value,
                comment: form.comment.value,
                subscribe: form.subscribe.checked ? 1 : 0
            };

            // Добавляем только выбранные блюда с правильными названиями полей
            if (order.soup) orderData.soup_id = order.soup;
            if (order["main-course"]) orderData.main_course_id = order["main-course"];
            if (order.salad) orderData.salad_id = order.salad;
            if (order.drink) orderData.drink_id = order.drink;
            if (order.dessert) orderData.dessert_id = order.dessert;
    


            console.log('Sending order data:', orderData);
    
            try {
                const res = await fetch(`${API_URL}/orders?api_key=${API_KEY}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });
    
                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('Server response:', errorText);
                    console.error('Request data:', orderData);
                    throw new Error(`Ошибка сервера: ${res.status} - ${errorText}`);
                }
    
                const result = await res.json();
                console.log("Заказ отправлен:", result);
    
                clearOrder();
                alert("Заказ успешно оформлен!");
                location.reload();
    
            } catch (error) {
                console.error("Ошибка отправки заказа:", error);
                alert(`Ошибка оформления заказа: ${error.message || "Неизвестная ошибка"}`);
            }
        });
    
        // Работа с localStorage
        function loadOrder() {
            return JSON.parse(localStorage.getItem("order")) || {
                soup: null,
                main: null,
                salad: null,
                drink: null,
                dessert: null
            };
        }
    
        function saveOrder() {
            localStorage.setItem("order", JSON.stringify(order));
        }
    
        function clearOrder() {
            localStorage.removeItem("order");
        }
    
        function getEmptyText(category) {
            switch (category) {
                case "main-course":
                    return "Главное блюдо не выбрано";
                case "soup":
                    return "Суп не выбран";
                case "salad":
                    return "Салат не выбран";
                case "drink":
                    return "Напиток не выбран";
                case "dessert":
                    return "Десерт не выбран";
                default:
                    return "Не выбрано";
            }
        }
    });
    