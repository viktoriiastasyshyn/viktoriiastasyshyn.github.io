const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin"); // Підключаємо Firebase Admin 
let serviceAccount;
try {
  serviceAccount = require('/etc/secrets/serviceAccountKey.json');
} catch (error) {
  serviceAccount = require('./serviceAccountKey.json');
}

// Ініціалізуємо Firebase 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); 

const app = express();
app.use(cors());
app.use(express.json());

// 1. Маршрут GET: Отримання тренувань, згрупованих за типом
app.get("/api/workouts", async (req, res) => {
  try {
    const snapshot = await db.collection("active_workouts").get();
    const workouts = [];
    snapshot.forEach(doc => {
      workouts.push({ id: doc.id, ...doc.data() });
    });

    // Групуємо тренування за полем 'type' (Силові, Кардіо, Йога тощо) 
    const groupedWorkouts = workouts.reduce((acc, workout) => {
      const type = workout.type || "Інше";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(workout);
      return acc;
    }, {});

    res.json(groupedWorkouts);
  } catch (error) {
    console.error("Помилка отримання даних:", error);
    res.status(500).json({ error: "Не вдалося отримати тренування" });
  }
});

// 2. Маршрут POST: Збереження нового тренування
app.post("/api/workouts", async (req, res) => {
  try {
    const newWorkout = req.body;
    // Додаємо тренування у колекцію active_workouts
    const docRef = await db.collection("active_workouts").add(newWorkout);
    res.status(201).json({ id: docRef.id, message: "Тренування успішно додано!" });
  } catch (error) {
    console.error("Помилка запису:", error);
    res.status(500).json({ error: "Не вдалося зберегти тренування" });
  }
});

// Запуск сервера 
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер успішно запущено на порту ${PORT}`);
});