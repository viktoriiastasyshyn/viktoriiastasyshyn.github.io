// --- Змінні для відстеження прогресу ---
let totalWorkouts = 0;
let totalCalories = 0;

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

// Завдання 1. Генеруємо картки через цикл FOR
for (let i = 0; i < trainingsData.length; i++) {
    const training = trainingsData[i];
    
    const cardHTML = `
        <article>
            <h3>${training.title}</h3>
            <a href="${training.infoPage}">
                <img src="${training.image}" alt="${training.title}" class="clickable-image">
            </a>
            <p><b>⏱ Час:</b> ${training.duration} | <b> Калорії:</b> ${training.calories} ккал</p>
            <a href="${training.video}" target="_blank" class="video-link">▶ Дивитися відео на YouTube</a>
            <br>
            <button class="btn-start" onclick="startTraining('${training.title}', '${training.duration}', '${training.calories}', this)">Почати тренування</button>
        </article>
    `;
    
    trainingsContainer.innerHTML += cardHTML;
}
// --- Завдання 2. та 3.
function startTraining(title, duration, calories, buttonElement) {
    if (buttonElement.innerText === "Почати тренування") {
        
        // Змінюємо кнопку
        buttonElement.innerText = "Тренування завершено ✅";
        buttonElement.style.backgroundColor = "#95a5a6"; 
        buttonElement.style.cursor = "default";
        
        // Оновлюємо змінні прогресу
        totalWorkouts++;
        totalCalories += parseInt(calories); // Перетворюємо рядок на число і додаємо
        
        // ОНОВЛЮЄМО HTML (записуємо нові цифри на сторінку)
        document.getElementById('completed-count').innerText = totalWorkouts;
        document.getElementById('calories-count').innerText = totalCalories;

        // Записуємо в Журнал
        const journalList = document.getElementById('journal-list');
        const now = new Date();
        const timeString = now.toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});
        
        const newEntry = `
            <li style="background: #e8f6f3; padding: 10px; border-radius: 5px; margin-bottom: 10px; border-left: 4px solid #1abc9c;">
                <b>Тип:</b> ${title} <br>
                <b>Тривалість:</b> ${duration} <br>
                <b>Час виконання:</b> ${timeString}
            </li>
        `;
        journalList.innerHTML += newEntry;
        
    } else {
        alert("Ви вже виконали це тренування сьогодні! Перевірте свій Журнал.");
    }
}

// --- Обробка форми для власного тренування
const form = document.getElementById('custom-workout-form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняємо перезавантаження сторінки
    
    const nameInput = document.getElementById('workout-name').value;
    const durationInput = document.getElementById('workout-duration').value;
    const errorMsg = document.getElementById('form-error');

    if (nameInput === '' || durationInput === '') {
        errorMsg.style.display = 'block'; 
    } else {
        errorMsg.style.display = 'none'; 
        
        // Оновлюємо прогрес для власного тренування
        totalWorkouts++;
        // Рахуємо приблизні калорії: 5 ккал за 1 хвилину
        const estimatedCalories = parseInt(durationInput) * 5; 
        totalCalories += estimatedCalories;
        
        // Записуємо нові цифри на сторінку
        document.getElementById('completed-count').innerText = totalWorkouts;
        document.getElementById('calories-count').innerText = totalCalories;

        // Додаємо в Журнал
        const journalList = document.getElementById('journal-list');
        const now = new Date();
        const timeString = now.toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});
        
        const newEntry = `
            <li style="background: #eaf2f8; padding: 10px; border-radius: 5px; margin-bottom: 10px; border-left: 4px solid #3498db;">
                <b>Тип:</b> ${nameInput} (Власне) <br>
                <b>Тривалість:</b> ${durationInput} хв <br>
                <b>Спалено:</b> ~${estimatedCalories} ккал <br>
                <b>Час додавання:</b> ${timeString}
            </li>
        `;
        journalList.innerHTML += newEntry;
        
        form.reset();
    }
});