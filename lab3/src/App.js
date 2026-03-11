import React, { useState } from 'react';
// 1. Імпортуємо інструменти для маршрутизації згідно з методичкою
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import WorkoutCard from './components/WorkoutCard';
import ProgressChart from './components/ProgressChart';
import NutritionPlan from './components/NutritionPlan';

// Наш масив з тренуваннями
const trainingsData = [
  { id: 1, type: 'Йога', title: 'Ранкова йога', image: '/imgg/yoga.jpg', duration: '20 хв', calories: '120', video: 'https://youtube.com/watch?v=sTANio_2E0Q' },
  { id: 2, type: 'Кардіо', title: 'Інтенсивне кардіо', image: '/imgg/cardio.jpg', duration: '30 хв', calories: '350', video: 'https://youtube.com/watch?v=ml6cT4AZdqI' },
  { id: 3, type: 'Силові', title: 'Силове тренування', image: '/imgg/strength.jpg', duration: '45 хв', calories: '400', video: 'https://youtube.com/watch?v=xSrw3TZiTt4' },
  { id: 4, type: 'Йога', title: 'Пілатес для початковців', image: '/imgg/pilates.jpg', duration: '25 хв', calories: '150', video: 'https://youtube.com/watch?v=1-ckXRmjDUk' },
  { id: 5, type: 'Кардіо', title: 'HIIT (Жироспалювання)', image: '/imgg/hiit.jpg', duration: '20 хв', calories: '450', video: 'https://youtube.com/watch?v=M0uO8X3_tEA' },
  { id: 6, type: 'Йога', title: 'Стретчинг (Гнучкість)', image: '/imgg/stretching.jpg', duration: '15 хв', calories: '80', video: 'https://youtube.com/watch?v=fjfThtANcEE' }
];

// Створюємо окремий компонент "Сторінка тренувань"
function TrainingsPage() {
  const [activeFilter, setActiveFilter] = useState('Всі');
  const filteredTrainings = activeFilter === 'Всі' 
    ? trainingsData 
    : trainingsData.filter(training => training.type === activeFilter);

  return (
    <div>
      <h2>Тренування</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveFilter('Всі')} style={buttonStyle(activeFilter === 'Всі')}>Всі</button>
        <button onClick={() => setActiveFilter('Кардіо')} style={buttonStyle(activeFilter === 'Кардіо')}>Кардіо</button>
        <button onClick={() => setActiveFilter('Силові')} style={buttonStyle(activeFilter === 'Силові')}>Силові</button>
        <button onClick={() => setActiveFilter('Йога')} style={buttonStyle(activeFilter === 'Йога')}>Йога та Гнучкість</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredTrainings.map(training => (
          <WorkoutCard 
            key={training.id} title={training.title} image={training.image} 
            duration={training.duration} calories={training.calories} video={training.video} 
          />
        ))}
      </div>
    </div>
  );
}

// ГОЛОВНИЙ КОМПОНЕНТ ДОДАТКУ (з Маршрутизацією)
function App() {
  return (
    // Обгортаємо весь додаток у Router
    <Router>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1>HealthTrack - React Версія</h1>
          
          {/* 2. Навігаційне меню (Завдання 3) */}
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', padding: '15px', backgroundColor: '#f4f7f6', borderRadius: '10px' }}>
            <Link to="/" style={linkStyle}>🏋️ Тренування</Link>
            <Link to="/progress" style={linkStyle}>📈 Мій прогрес</Link>
            <Link to="/nutrition" style={linkStyle}>🥗 План харчування</Link>
          </nav>
        </header>

        {/* 3. Зона, де будуть миттєво змінюватися сторінки */}
        <Routes>
          <Route path="/" element={<TrainingsPage />} />
          <Route path="/progress" element={<ProgressChart completedWorkouts={15} totalCalories={3200} />} />
          <Route path="/nutrition" element={<NutritionPlan />} />
        </Routes>
        
      </div>
    </Router>
  );
}

// Стилі для кнопок та посилань
function buttonStyle(isActive) {
  return {
    padding: '10px 15px', backgroundColor: isActive ? '#3498db' : '#ecf0f1',
    color: isActive ? 'white' : 'black', border: 'none', borderRadius: '5px',
    cursor: 'pointer', fontWeight: isActive ? 'bold' : 'normal'
  };
}

const linkStyle = {
  textDecoration: 'none', color: '#2c3e50', fontSize: '18px', fontWeight: 'bold'
};

export default App;