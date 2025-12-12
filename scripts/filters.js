document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".product-section");
  
    sections.forEach(section => {
      const filterButtons = section.querySelectorAll(".filter-btn");
      const grid = section.querySelector(".products-grid");
      const category = section.dataset.category;
  
      if (!filterButtons.length) return;
  
      filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const selectedKind = btn.dataset.kind;
  
          // Если нажали повторно — сброс фильтра
          if (btn.classList.contains("active")) {
            btn.classList.remove("active");
            showAll();
            return;
          }
  
          // Удаляем active со всех
          filterButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
  
          // Фильтрация
          filterByKind(selectedKind);
        });
      });
  
      function filterByKind(kind) {
        const cards = grid.querySelectorAll(".product-card");
  
        cards.forEach(card => {
          const dish = card.dataset.kind;
  
          if (dish === kind || kind === "all") {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      }
  
      function showAll() {
        const cards = grid.querySelectorAll(".product-card");
        cards.forEach(card => (card.style.display = ""));
      }
    });
  });
  