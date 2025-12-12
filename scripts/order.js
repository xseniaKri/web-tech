document.addEventListener("DOMContentLoaded", () => {

    const categories = ["soup", "main", "salad", "drink", "dessert"];

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

    function updateVisibility() {
        const anySelected = Object.values(selected).some(v => v !== null);

        if (!anySelected) {
            containers.empty.style.display = "block";
            categories.forEach(cat => {
                containers[cat].style.display = "none";
            });
            containers.price.style.display = "none";
            totalEl.style.display = "none";
        } else {
            containers.empty.style.display = "none";
            categories.forEach(cat => {
                containers[cat].style.display = "block";
                if (!selected[cat]) {
                    if (cat === "drink") blocks[cat].textContent = "Напиток не выбран";
                    else if (cat === "soup") blocks[cat].textContent = "Суп не выбран";
                    else if (cat === "salad") blocks[cat].textContent = "Салат не выбран";
                    else if (cat === "dessert") blocks[cat].textContent = "Десерт не выбран";
                    else blocks[cat].textContent = "Блюдо не выбрано";
                }
            });
            containers.price.style.display = "block";
            totalEl.style.display = "inline";
        }
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

        if (!categories.includes(category)) return; // защита

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

    updateVisibility();
});
