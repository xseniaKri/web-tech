document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://edu.std-900.ist.mospolytech.ru/labs/api";
    const API_KEY = "b634db2f-f767-4d3e-a0c0-341ca2959925";

    // Элементы DOM
    const ordersContainer = document.getElementById("orders-container");
    const viewModal = document.getElementById("viewModal");
    const editModal = document.getElementById("editModal");
    const deleteModal = document.getElementById("deleteModal");
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");

    // Состояние
    let orders = [];
    let dishes = [];
    let currentEditOrderId = null;
    let currentDeleteOrderId = null;

    // Загрузка данных
    try {
        // Загружаем список блюд для отображения названий
        const dishesRes = await fetch(`${API_URL}/dishes?api_key=${API_KEY}`);
        if (dishesRes.ok) {
            dishes = await dishesRes.json();
        }

        // Загружаем заказы
        await loadOrders();
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        showError("Ошибка загрузки данных. Попробуйте обновить страницу.");
    }


    // Загрузка заказов
    async function loadOrders() {
        try {
            showLoading();
            
            const response = await fetch(`${API_URL}/orders?api_key=${API_KEY}`);
            
            if (!response.ok) {
                let errorMessage = `Ошибка сервера: ${response.status}`;
                
                if (response.status === 401) {
                    errorMessage = "Необходима авторизация для доступа к заказам";
                } else {
                    // Пытаемся извлечь сообщение об ошибке из JSON
                    try {
                        const errorText = await response.text();
                        if (errorText.includes('{') && errorText.includes('}')) {
                            const startIndex = errorText.indexOf('{');
                            const endIndex = errorText.lastIndexOf('}') + 1;
                            const jsonPart = errorText.substring(startIndex, endIndex);
                            const errorData = JSON.parse(jsonPart);
                            if (errorData.error) {
                                errorMessage = errorData.error;
                            }
                        }
                    } catch (parseError) {
                        console.log('Не удалось распарсить ошибку сервера:', parseError);
                    }
                }
                
                throw new Error(errorMessage);
            }

            orders = await response.json();
            
            // Сортировка по убыванию даты создания
            orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            
            renderOrders();
        } catch (error) {
            console.error("Ошибка при загрузке заказов:", error);
            showError("Ошибка загрузки заказов: " + error.message);
        }
    }

    // Отображение заказов
    function renderOrders() {
        if (orders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="empty-orders">
                    <p>У вас пока нет заказов.</p>
                    <a href="order.html" class="btn btn-primary">Оформить первый заказ</a>
                </div>
            `;
            return;
        }

        ordersContainer.innerHTML = orders.map((order, index) => {
            const orderItems = getOrderItemsText(order);
            const deliveryTime = getDeliveryTimeText(order);
            const totalCost = calculateOrderCost(order);

            return `
                <div class="order-card" data-order-id="${order.id}">
                    <div class="order-header">
                        <span class="order-number">Заказ №${index + 1}</span>
                        <span class="order-date">${formatDate(order.created_at)}</span>
                    </div>
                    <div class="order-details">
                        <div class="order-items">
                            <strong>Состав:</strong> ${orderItems}
                        </div>
                        <div class="order-cost">
                            ${totalCost} ₽
                        </div>
                        <div class="order-delivery-time">
                            ${deliveryTime}
                        </div>
                        <div class="order-actions">
                            <button class="btn-icon btn-info" onclick="showOrderDetails(${order.id})" title="Подробнее">
                                <i class="bi bi-eye"></i> Подробнее
                            </button>
                            <button class="btn-icon btn-edit" onclick="editOrder(${order.id})" title="Редактировать">
                                <i class="bi bi-pencil"></i> Редактирование
                            </button>
                            <button class="btn-icon btn-delete" onclick="deleteOrder(${order.id})" title="Удалить">
                                <i class="bi bi-trash"></i> Удаление
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Получение текста состава заказа
    function getOrderItemsText(order) {
        const items = [];
        
        if (order.soup_id) {
            const soup = dishes.find(d => d.id === order.soup_id);
            if (soup) items.push(soup.name);
        }
        
        if (order.main_course_id) {
            const main = dishes.find(d => d.id === order.main_course_id);
            if (main) items.push(main.name);
        }
        
        if (order.salad_id) {
            const salad = dishes.find(d => d.id === order.salad_id);
            if (salad) items.push(salad.name);
        }
        
        if (order.drink_id) {
            const drink = dishes.find(d => d.id === order.drink_id);
            if (drink) items.push(drink.name);
        }
        
        if (order.dessert_id) {
            const dessert = dishes.find(d => d.id === order.dessert_id);
            if (dessert) items.push(dessert.name);
        }
        
        return items.length > 0 ? items.join(', ') : 'Не указан';
    }

    // Расчет стоимости заказа
    function calculateOrderCost(order) {
        let total = 0;
        
        if (order.soup_id) {
            const soup = dishes.find(d => d.id === order.soup_id);
            if (soup) total += soup.price;
        }
        
        if (order.main_course_id) {
            const main = dishes.find(d => d.id === order.main_course_id);
            if (main) total += main.price;
        }
        
        if (order.salad_id) {
            const salad = dishes.find(d => d.id === order.salad_id);
            if (salad) total += salad.price;
        }
        
        if (order.drink_id) {
            const drink = dishes.find(d => d.id === order.drink_id);
            if (drink) total += drink.price;
        }
        
        if (order.dessert_id) {
            const dessert = dishes.find(d => d.id === order.dessert_id);
            if (dessert) total += dessert.price;
        }
        
        return total;
    }

    // Форматирование времени доставки
    function getDeliveryTimeText(order) {
        if (order.delivery_type === 'by_time' && order.delivery_time) {
            return order.delivery_time;
        }
        return "Как можно скорее (с 7:00 до 23:00)";
    }

    // Форматирование даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Показать детали заказа
    window.showOrderDetails = async function(orderId) {
        try {
            const response = await fetch(`${API_URL}/orders/${orderId}?api_key=${API_KEY}`);
            
            if (!response.ok) {
                throw new Error(`Ошибка загрузки заказа: ${response.status}`);
            }

            const order = await response.json();
            const orderItems = getOrderItemsText(order);
            const totalCost = calculateOrderCost(order);

            const modalBody = document.getElementById("viewModalBody");
            modalBody.innerHTML = `
                <div class="order-detail-item">
                    <span class="detail-label">Номер заказа:</span>
                    <span class="detail-value">${order.id}</span>
                </div>
                <div class="order-detail-item">
                    <span class="detail-label">Дата создания:</span>
                    <span class="detail-value">${formatDate(order.created_at)}</span>
                </div>
                <div class="order-detail-item">
                    <span class="detail-label">Имя:</span>
                    <span class="detail-value">${order.full_name}</span>
                </div>
                <div class="order-detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${order.email}</span>
                </div>
                <div class="order-detail-item">
                    <span class="detail-label">Телефон:</span>
                    <span class="detail-value">${order.phone}</span>
                </div>
                <div class="order-detail-item">
                    <span class="detail-label">Адрес доставки:</span>
                    <span class="detail-value">${order.delivery_address}</span>
                </div>
                <div class="order-detail-item">
                    <span class="detail-label">Состав заказа:</span>
                    <span class="detail-value">${orderItems}</span>
                </div>
                <div class="order-detail-item">
                    <span class="detail-label">Стоимость:</span>
                    <span class="detail-value">${totalCost} ₽</span>
                </div>
                <div class="order-detail-item">
                    <span class="detail-label">Время доставки:</span>
                    <span class="detail-value">${getDeliveryTimeText(order)}</span>
                </div>
                ${order.comment ? `
                    <div class="order-detail-item">
                        <span class="detail-label">Комментарий:</span>
                        <span class="detail-value">${order.comment}</span>
                    </div>
                ` : ''}
                ${order.subscribe ? `
                    <div class="order-detail-item">
                        <span class="detail-label">Подписка:</span>
                        <span class="detail-value">Подписан на новости</span>
                    </div>
                ` : ''}
            `;

            showModal('viewModal');
        } catch (error) {
            console.error("Ошибка при загрузке деталей заказа:", error);
            showError("Ошибка загрузки деталей заказа: " + error.message);
        }
    };


    // Редактирование заказа
    window.editOrder = async function(orderId) {
        try {
            const response = await fetch(`${API_URL}/orders/${orderId}?api_key=${API_KEY}`);
            
            if (!response.ok) {
                throw new Error(`Ошибка загрузки заказа: ${response.status}`);
            }

            const order = await response.json();
            currentEditOrderId = orderId;

            // Заполнение информации о заказе (только для просмотра)
            const orderItems = getOrderItemsText(order);
            const totalCost = calculateOrderCost(order);
            document.getElementById('edit_order_items').textContent = orderItems;
            document.getElementById('edit_order_cost').textContent = totalCost + ' ₽';

            // Заполнение формы редактирования
            document.getElementById('edit_full_name').value = order.full_name || '';
            document.getElementById('edit_email').value = order.email || '';
            document.getElementById('edit_phone').value = order.phone || '';
            document.getElementById('edit_delivery_address').value = order.delivery_address || '';
            document.getElementById('edit_comment').value = order.comment || '';
            
            // Установка типа доставки
            const deliveryTypeRadios = document.querySelectorAll('input[name="edit_delivery_type"]');
            deliveryTypeRadios.forEach(radio => {
                radio.checked = radio.value === order.delivery_type;
            });
            
            // Установка времени доставки
            document.getElementById('edit_delivery_time').value = order.delivery_time || '';

            showModal('editModal');
        } catch (error) {
            console.error("Ошибка при загрузке заказа для редактирования:", error);
            showError("Ошибка загрузки заказа: " + error.message);
        }
    };

    // Удаление заказа
    window.deleteOrder = function(orderId) {
        currentDeleteOrderId = orderId;
        showModal('deleteModal');
    };


    // Сохранение изменений заказа
    document.getElementById('saveEditBtn').addEventListener('click', async () => {
        if (!currentEditOrderId) return;

        const formData = {
            full_name: document.getElementById('edit_full_name').value,
            email: document.getElementById('edit_email').value,
            phone: document.getElementById('edit_phone').value,
            delivery_address: document.getElementById('edit_delivery_address').value,
            delivery_type: document.querySelector('input[name="edit_delivery_type"]:checked')?.value,
            delivery_time: document.getElementById('edit_delivery_time').value,
            comment: document.getElementById('edit_comment').value
        };

        try {
            const response = await fetch(`${API_URL}/orders/${currentEditOrderId}?api_key=${API_KEY}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Ошибка сервера: ${response.status}`;
                
                // Пытаемся извлечь сообщение об ошибке из JSON
                try {
                    if (errorText.includes('{') && errorText.includes('}')) {
                        const startIndex = errorText.indexOf('{');
                        const endIndex = errorText.lastIndexOf('}') + 1;
                        const jsonPart = errorText.substring(startIndex, endIndex);
                        const errorData = JSON.parse(jsonPart);
                        if (errorData.error) {
                            errorMessage = errorData.error;
                        }
                    } else {
                        errorMessage = errorText;
                    }
                } catch (parseError) {
                    console.log('Не удалось распарсить ошибку сервера:', parseError);
                    errorMessage = errorText;
                }
                
                throw new Error(errorMessage);
            }

            const updatedOrder = await response.json();
            
            // Обновляем заказ в локальном списке
            const orderIndex = orders.findIndex(o => o.id === currentEditOrderId);
            if (orderIndex !== -1) {
                orders[orderIndex] = { ...orders[orderIndex], ...updatedOrder };
            }

            hideModal('editModal');
            showSuccess("Заказ успешно изменён");
            renderOrders();
            
        } catch (error) {
            console.error("Ошибка при обновлении заказа:", error);
            showError("Ошибка при изменении заказа: " + error.message);
        }
    });


    // Подтверждение удаления
    document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
        if (!currentDeleteOrderId) return;

        try {
            const response = await fetch(`${API_URL}/orders/${currentDeleteOrderId}?api_key=${API_KEY}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Ошибка сервера: ${response.status}`;
                
                // Пытаемся извлечь сообщение об ошибке из JSON
                try {
                    if (errorText.includes('{') && errorText.includes('}')) {
                        const startIndex = errorText.indexOf('{');
                        const endIndex = errorText.lastIndexOf('}') + 1;
                        const jsonPart = errorText.substring(startIndex, endIndex);
                        const errorData = JSON.parse(jsonPart);
                        if (errorData.error) {
                            errorMessage = errorData.error;
                        }
                    } else {
                        errorMessage = errorText;
                    }
                } catch (parseError) {
                    console.log('Не удалось распарсить ошибку сервера:', parseError);
                    errorMessage = errorText;
                }
                
                throw new Error(errorMessage);
            }

            // Удаляем заказ из локального списка
            orders = orders.filter(o => o.id !== currentDeleteOrderId);
            
            hideModal('deleteModal');
            showSuccess("Заказ успешно удалён");
            renderOrders();
            
        } catch (error) {
            console.error("Ошибка при удалении заказа:", error);
            showError("Ошибка при удалении заказа: " + error.message);
        }
    });

    // Вспомогательные функции для модальных окон
    function showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    function hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }


    // Обработчики закрытия модальных окон
    document.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-modal')) {
            hideModal(e.target.getAttribute('data-modal'));
        }
        
        // Проверяем клик по кнопке закрытия или любому её дочернему элементу
        if (e.target.classList.contains('close-btn')) {
            const modalId = e.target.getAttribute('data-modal');
            if (modalId) hideModal(modalId);
        } else if (e.target.closest('.close-btn')) {
            const closeBtn = e.target.closest('.close-btn');
            const modalId = closeBtn.getAttribute('data-modal');
            if (modalId) hideModal(modalId);
        }
        
        // Закрытие при клике на фон модального окна
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Обработчики ESC для закрытия модальных окон
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });


    // Уведомления
    function showSuccess(message) {
        notificationText.textContent = message;
        notification.className = 'notification show';
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    function showError(message) {
        // Для критических ошибок показываем модальное окно
        if (message.includes('422') || message.includes('401') || message.includes('403') || message.includes('500')) {
            showErrorModal(message);
        } else {
            // Для остальных ошибок используем обычное уведомление
            notificationText.textContent = message;
            notification.className = 'notification error show';
            setTimeout(() => {
                notification.classList.remove('show');
            }, 7000);
        }
    }

    function showErrorModal(message) {
        // Парсим JSON ответ если нужно
        try {
            if (message.includes('{') && message.includes('}')) {
                const startIndex = message.indexOf('{');
                const endIndex = message.lastIndexOf('}') + 1;
                const jsonPart = message.substring(startIndex, endIndex);
                const errorData = JSON.parse(jsonPart);
                if (errorData.error) {
                    message = errorData.error;
                }
            }
        } catch (e) {
            console.log('Не удалось распарсить JSON ошибку:', e);
        }

        // Показываем модальное окно с ошибкой
        const errorModalText = document.getElementById('errorModalText');
        errorModalText.textContent = message;
        showModal('errorModal');
    }

    // Закрытие уведомления
    document.getElementById('notificationClose').addEventListener('click', () => {
        notification.classList.remove('show');
    });

    // Показать загрузку
    function showLoading() {
        ordersContainer.innerHTML = '<div class="loading">Загрузка заказов...</div>';
    }
});
