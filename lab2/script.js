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
        title: 'Пілатес для початковців',
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

// Функція-заглушка для кнопки
function startTraining(title, duration, buttonElement) {
    alert("Ви натиснули почати: " + title);
}