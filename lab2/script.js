// 1. Створюємо масив з даними про всі тренування (додали реальні YouTube-відео)
const trainingsData = [
    {
        title: 'Ранкова йога',
        image: 'imgg/yoga.jpg',
        duration: '20 хв',
        calories: '120 ккал',
        infoPage: 'yoga-info.html',
        video: 'https://www.youtube.com/watch?v=sTANio_2E0Q' // Yoga with Adriene
    },
    {
        title: 'Інтенсивне кардіо',
        image: 'imgg/cardio.jpg',
        duration: '30 хв',
        calories: '350 ккал',
        infoPage: 'cardio-info.html',
        video: 'https://www.youtube.com/watch?v=ml6cT4AZdqI' // MadFit
    },
    {
        title: 'Силове тренування',
        image: 'imgg/strength.jpg',
        duration: '45 хв',
        calories: '400 ккал',
        infoPage: 'strength-info.html',
        video: 'https://www.youtube.com/watch?v=xSrw3TZiTt4' // HASfit
    },
    {
        title: 'Пілатес для початківців',
        image: 'imgg/pilates.jpg',
        duration: '25 хв',
        calories: '150 ккал',
        infoPage: 'pilates-info.html',
        video: 'https://www.youtube.com/watch?v=1-ckXRmjDUk' // Move With Nicole
    },
    {
        title: 'HIIT (Жироспалювання)',
        image: 'imgg/hiit.jpg',
        duration: '20 хв',
        calories: '450 ккал',
        infoPage: 'hiit-info.html',
        video: 'https://www.youtube.com/watch?v=M0uO8X3_tEA' // Natacha Océane
    },
    {
        title: 'Стретчинг (Гнучкість)',
        image: 'imgg/stretching.jpg',
        duration: '15 хв',
        calories: '80 ккал',
        infoPage: 'stretching-info.html',
        video: 'https://www.youtube.com/watch?v=fjfThtANcEE' // MadFit
    }
];

// 2. Знаходимо контейнер на сторінці
const trainingsContainer = document.getElementById('trainings-container');

// 3. Генеруємо картки через цикл FOR
for (let i = 0; i < trainingsData.length; i++) {
    const training = trainingsData[i];
    
    const cardHTML = `
        <article>
            <h3>${training.title}</h3>
            <a href="${training.infoPage}">
                <img src="${training.image}" alt="${training.title}" class="clickable-image">
            </a>
            <p><b>⏱ Час:</b> ${training.duration} | <b> Калорії:</b> ${training.calories}</p>
            
            <a href="${training.video}" target="_blank" class="video-link">▶ Дивитися відео на YouTube</a>
            <br>
            
            <button class="btn-start" onclick="startTraining('${training.title}', '${training.duration}', this)">Почати тренування</button>
        </article>
    `;
    
    trainingsContainer.innerHTML += cardHTML;
}

// Функція, яка запускається при натисканні на кнопку "Почати тренування"
function startTraining(title, duration, buttonElement) {
    
    // Завдання 2: Змінюємо статус тренування (кнопки)
    // Перевіряємо за допомогою умовного оператора if, чи тренування ще не пройдене
    if (buttonElement.innerText === "Почати тренування") {
        
        // Змінюємо текст та колір кнопки
        buttonElement.innerText = "Тренування завершено ✅";
        buttonElement.style.backgroundColor = "#95a5a6"; // Робимо кнопку сірою
        buttonElement.style.cursor = "default";
        
        // Завдання 3: Оновлюємо Журнал тренувань
        // Знаходимо список журналу в HTML за його ID
        const journalList = document.getElementById('journal-list');
        
        // Отримуємо поточний час (щоб було як у справжньому додатку)
        const now = new Date();
        const timeString = now.toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});
        
        // Створюємо новий запис для журналу (Тип тренування та час)
        const newEntry = `
            <li style="background: #e8f6f3; padding: 10px; border-radius: 5px; margin-bottom: 10px; border-left: 4px solid #1abc9c;">
                <b>Тип:</b> ${title} <br>
                <b>Тривалість:</b> ${duration} <br>
                <b>Час виконання:</b> ${timeString}
            </li>
        `;
        
        // Додаємо цей запис у наш HTML-список журналу
        journalList.innerHTML += newEntry;
        
        // Оновлюємо прогрес (Завдання 2) - візуальне сповіщення
        alert("Вітаємо! Ви успішно завершили тренування: " + title + ". Запис додано до Журналу!");
        
    } else {
        // Якщо користувач натискає на вже пройдене тренування
        alert("Ви вже виконали це тренування сьогодні! Перевірте свій Журнал.");
    }
}

// --- Завдання 3: Обробка форми ---
const form = document.getElementById('custom-workout-form');

form.addEventListener('submit', function(event) {
    // Зупиняємо стандартне перезавантаження сторінки при відправці форми
    event.preventDefault(); 
    
    // Отримуємо значення, які ввів користувач
    const nameInput = document.getElementById('workout-name').value;
    const durationInput = document.getElementById('workout-duration').value;
    const errorMsg = document.getElementById('form-error');

    // Перевіряємо (валідуємо), чи поля не порожні
    if (nameInput === '' || durationInput === '') {
        errorMsg.style.display = 'block'; // Показуємо повідомлення про помилку
    } else {
        errorMsg.style.display = 'none'; // Ховаємо помилку
        
        // Знаходимо журнал і додаємо туди новий запис
        const journalList = document.getElementById('journal-list');
        const now = new Date();
        const timeString = now.toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});
        
        const newEntry = `
            <li style="background: #eaf2f8; padding: 10px; border-radius: 5px; margin-bottom: 10px; border-left: 4px solid #3498db;">
                <b>Тип:</b> ${nameInput} (Власне) <br>
                <b>Тривалість:</b> ${durationInput} хв <br>
                <b>Час додавання:</b> ${timeString}
            </li>
        `;
        
        journalList.innerHTML += newEntry;
        
        // Очищаємо поля форми після успішного додавання
        form.reset();
    }
});