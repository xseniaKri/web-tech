document.addEventListener("DOMContentLoaded", () => {

    const categories = ["soup", "main", "salad", "drink", "dessert"];

    // 🔥 ВАЖНО: теперь selected доступен в submit
    const selected = {
        soup: null,
        main: null,
        salad: null,
        drink: null,
        dessert: null
    };

    const selectedCards = {
        soup: null,
        main: null,
        salad: null,
        drink: null,
        dessert: null
    };

    const containers = {
        empty: document.getElementById("nothing-selected"),
        soup: document.getElementById("selected-soup"),
        main: document.getElementById("selected-main"),
        salad: document.getElementById("selected-salad"),
        drink: document.getElementById("selected-drink"),
        dessert: document.getElementById("selected-dessert"),
        price: document.getElementById("total-price")
    };

    const blocks = {
        soup: containers.soup.querySelector("span"),
        main: containers.main.querySelector("span"),
        salad: containers.salad.querySelector("span"),
        drink: containers.drink.querySelector("span"),
        dessert: containers.dessert.querySelector("span")
    };

    const totalEl = document.getElementById("total");
    const form = document.querySelector(".order-form");

    function updateVisibility() {
        const anySelected = Object.values(selected).some(v => v !== null);

        if (!anySelected) {
            containers.empty.style.display = "block";
            categories.forEach(cat => containers[cat].style.display = "none");
            containers.price.style.display = "none";
            return;
        }

        containers.empty.style.display = "none";
        categories.forEach(cat => {
            containers[cat].style.display = "block";
            if (!selected[cat]) {
                blocks[cat].textContent =
                    cat === "soup" ? "Суп не выбран" :
                    cat === "main" ? "Блюдо не выбрано" :
                    cat === "salad" ? "Салат не выбран" :
                    cat === "drink" ? "Напиток не выбран" :
                    "Десерт не выбран";
            }
        });

        containers.price.style.display = "block";
    }

    function updateTotal() {
        const sum = Object.values(selected)
            .filter(Boolean)
            .reduce((acc, dish) => acc + dish.price, 0);
        totalEl.textContent = sum;
    }

    document.body.addEventListener("click", (e) => {
        if (!e.target.classList.contains("btn")) return;

        const card = e.target.closest(".product-card");
        const keyword = card.dataset.dish;
        const dish = dishes.find(d => d.keyword === keyword);
        const category = dish.category;

        if (selectedCards[category]) {
            selectedCards[category].classList.remove("selected");
        }

        card.classList.add("selected");
        selectedCards[category] = card;
        selected[category] = dish;

        blocks[category].textContent = `${dish.name} — ${dish.price}₽`;

        updateVisibility();
        updateTotal();
    });

    // ✅ ПРОВЕРКА КОМБО
    form.addEventListener("submit", (event) => {

        const hasSoup = !!selected.soup;
        const hasMain = !!selected.main;
        const hasSalad = !!selected.salad;
        const hasDrink = !!selected.drink;
        const hasDessert = !!selected.dessert;

        if (!hasSoup && !hasMain && !hasSalad && !hasDrink && !hasDessert) {
            event.preventDefault();
            showNotification("Ничего не выбрано. Выберите блюда для заказа", "nothing");
            return;
        }

        if (!hasMain && (hasDrink || hasDessert)) {
            event.preventDefault();
            showNotification("Выберите главное блюдо", "main");
            return;
        }

        if (hasSoup && !hasMain && !hasSalad) {
            event.preventDefault();
            showNotification("Выберите главное блюдо/салат/стартер", "main-salad");
            return;
        }

        if (hasSalad && !hasSoup && !hasMain) {
            event.preventDefault();
            showNotification("Выберите суп или главное блюдо", "soup-main");
            return;
        }

        if ((hasSoup || hasMain) && !hasDrink) {
            event.preventDefault();
            showNotification("Выберите напиток", "drink");
            return;
        }
    });

    updateVisibility();
});


function showNotification(text, type) {
    const old = document.querySelector(".notification-overlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.className = "notification-overlay";

    const modal = document.createElement("div");
    modal.className = "notification";

    const p = document.createElement("p");
    p.textContent = text;

    const btn = document.createElement("button");
    btn.textContent = "Окей";
    btn.onclick = () => overlay.remove();

    modal.append(p, btn);
    overlay.append(modal);
    document.body.append(overlay);
}
