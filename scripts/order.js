document.addEventListener("DOMContentLoaded", () => {
    const selected = {
        soup: null,
        main: null,
        drink: null
    };

    const selectedCards = {
        soup: null,
        main: null,
        drink: null
    };

    const containers = {
        empty: document.getElementById("nothing-selected"),
        soup: document.getElementById("selected-soup"),
        main: document.getElementById("selected-main"),
        drink: document.getElementById("selected-drink"),
        price: document.getElementById("total-price")
    };

    const blocks = {
        soup: containers.soup.querySelector("span"),
        main: containers.main.querySelector("span"),
        drink: containers.drink.querySelector("span")
    };

    const totalEl = document.getElementById("total");

    function updateVisibility() {
        const anySelected = Object.values(selected).some(v => v !== null);

        if (!anySelected) {
            containers.empty.style.display = "block";
            containers.soup.style.display = "none";
            containers.main.style.display = "none";
            containers.drink.style.display = "none";
            containers.price.style.display = "none";
            totalEl.style.display = "none";
        } else {
            containers.empty.style.display = "none";
            containers.soup.style.display = "block";
            containers.main.style.display = "block";
            containers.drink.style.display = "block";
            containers.price.style.display = "block";
            totalEl.style.display = "inline";

            if (!selected.soup) blocks.soup.textContent = "Блюдо не выбрано";
            if (!selected.main) blocks.main.textContent = "Блюдо не выбрано";
            if (!selected.drink) blocks.drink.textContent = "Напиток не выбран";
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
