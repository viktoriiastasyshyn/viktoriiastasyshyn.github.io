import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { auth, db } from './firebase'; 
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

import Auth from './components/Auth';
import WorkoutCard from './components/WorkoutCard';
import ProgressChart from './components/ProgressChart';
import NutritionPlan from './components/NutritionPlan';

function TrainingsPage({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "workouts"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWorkouts(data);
        setLoading(false);
      } catch (err) {
        console.error("Помилка Firestore:", err);
      }
    };
    if (user) fetchFromFirestore();
  }, [user]);

  if (!user) return <Navigate to="/auth" />;
  if (loading) return <h2 style={{textAlign: 'center'}}>Завантаження тренувань із хмари...</h2>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {workouts.map(t => <WorkoutCard key={t.id} {...t} />)}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [workoutLogs, setWorkoutLogs] = useState([]); 

  // Функція для завантаження логів з бази 
  const fetchUserLogs = async (uid) => {
    try {
      const q = query(collection(db, "logs"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const logs = querySnapshot.docs.map(doc => doc.data());
      setWorkoutLogs(logs); // Оновлюємо масив у стані
    } catch (e) {
      console.error("Помилка завантаження логів:", e);
    }
  };

  // Функція запису нового тренування 
  const handleStartWorkout = async (workout) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "logs"), {
        userId: user.uid,
        title: workout.title,
        calories: parseInt(workout.calories),
        date: new Date().toLocaleString('uk-UA')
      });

      await fetchUserLogs(user.uid); 
      alert(`Тренування "${workout.title}" додано в журнал!`);
    } catch (e) {
      alert("Помилка бази даних");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserLogs(currentUser.uid); // Завантажуємо дані при вході
      } else {
        setWorkoutLogs([]); // Очищуємо при виході
      }
    });
    return () => unsubscribe();
  }, []);

  const totalBurned = workoutLogs.reduce((sum, log) => sum + (log.calories || 0), 0);
  const totalCount = workoutLogs.length;

  return (
    <Router>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1>HealthTrack Pro</h1>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '15px', background: '#f4f7f6', borderRadius: '10px' }}>
            <Link to="/">🏋️ Тренування</Link>
            <Link to="/progress">📈 Прогрес</Link>
            <Link to="/nutrition">🥗 Харчування</Link>
            <Link to="/auth">{user ? '👤 Профіль' : '🔑 Увійти'}</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<TrainingsPage user={user} onStart={handleStartWorkout} />} />
          <Route path="/progress" element={
            user ? <ProgressChart 
                      completedWorkouts={totalCount} 
                      totalCalories={totalBurned} 
                      history={workoutLogs} 
                   /> : <Navigate to="/auth" />
          } />
          <Route path="/nutrition" element={<NutritionPlan />} />
          <Route path="/auth" element={<Auth user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;