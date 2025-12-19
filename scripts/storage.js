
const STORAGE_KEY = "order";

// Глобальные функции для работы с заказом в localStorage
function getOrderFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data
        ? JSON.parse(data)
        : {
            soup: null,
            "main-course": null,
            salad: null,
            drink: null,
            dessert: null
        };
}

function saveOrderToStorage(order) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

function clearOrderStorage() {
    localStorage.removeItem(STORAGE_KEY);
}

// Делаем функции глобально доступными
window.getOrderFromStorage = getOrderFromStorage;
window.saveOrderToStorage = saveOrderToStorage;
window.clearOrderStorage = clearOrderStorage;
