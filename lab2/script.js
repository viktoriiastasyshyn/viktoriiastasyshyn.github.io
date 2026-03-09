// 1. Створюємо масив з даними про всі тренування
const trainingsData = [
    {
        title: 'Ранкова йога',
        image: 'imgg/yoga.jpg',
        duration: '20 хв',
        calories: '120 ккал',
        link: 'yoga-info.html'
    },
    {
        title: 'Інтенсивне кардіо',
        image: 'imgg/cardio.jpg',
        duration: '30 хв',
        calories: '350 ккал',
        link: 'cardio-info.html'
    },
    {
        title: 'Силове тренування',
        image: 'imgg/strength.jpg',
        duration: '45 хв',
        calories: '400 ккал',
        link: 'strength-info.html'
    },
    {
        title: 'Пілатес для початківців',
        image: 'imgg/pilates.jpg',
        duration: '25 хв',
        calories: '150 ккал',
        link: 'pilates-info.html'
    },
    {
        title: 'HIIT (Жироспалювання)',
        image: 'imgg/hiit.jpg',
        duration: '20 хв',
        calories: '450 ккал',
        link: 'hiit-info.html'
    },
    {
        title: 'Стретчинг (Гнучкість)',
        image: 'imgg/stretching.jpg',
        duration: '15 хв',
        calories: '80 ккал',
        link: 'stretching-info.html'
    }
];

// 2. Знаходимо контейнер на сторінці, куди будемо вставляти картки
const trainingsContainer = document.getElementById('trainings-container');

// 3. Використовуємо цикл FOR для генерації карток (Завдання 1)
for (let i = 0; i < trainingsData.length; i++) {
    const training = trainingsData[i];
    
    // Створюємо HTML-код для однієї картки
    const cardHTML = `
        <article>
            <h3>${training.title}</h3>
            <a href="${training.link}">
                <img src="${training.image}" alt="${training.title}" class="clickable-image">
            </a>
            <p><b>⏱ Час:</b> ${training.duration} | <b>Калорії:</b> ${training.calories}</p>
            <a href="video.html" class="video-link">Дивитися відео</a>
            <br>
            <button class="btn-start" onclick="startTraining('${training.title}', '${training.duration}', this)">Почати тренування</button>
        </article>
    `;
    
    // Додаємо створену картку всередину контейнера
    trainingsContainer.innerHTML += cardHTML;
}

// Функція-заглушка для наступного завдання (щоб кнопка поки не видавала помилку)
function startTraining(title, duration, buttonElement) {
    alert("Ви натиснули почати: " + title);
}