const express = require("express");
const cors = require("cors");
const path = require("path"); // Підключаємо модуль PATH 
const admin = require("firebase-admin"); // Завдання 2. Підключаємо бібліотеку для роботи з Firebase Cloud

let serviceAccount;
try {
  serviceAccount = require('/etc/secrets/serviceAccountKey.json');
} catch (error) {
  serviceAccount = require('./serviceAccountKey.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); 

const app = express();
app.use(cors());
app.use(express.json());

// Завдання 1. Налаштування хостингу файлів
const buildPath = path.join(__dirname, "build");
const publicPath = path.join(__dirname, "public");

app.use(express.static(buildPath));
app.use(express.static(publicPath));

// Завдання 3. Маршрут GET: Отримання тренувань
app.get("/api/workouts", async (req, res) => {
  try {
    const snapshot = await db.collection("active_workouts").get();
    const workouts = [];
    snapshot.forEach(doc => {
      workouts.push({ id: doc.id, ...doc.data() });
    });

    const groupedWorkouts = workouts.reduce((acc, workout) => {
      const type = workout.type || "Інше";
      if (!acc[type]) acc[type] = [];
      acc[type].push(workout);
      return acc;
    }, {});

    res.json(groupedWorkouts);
  } catch (error) {
    console.error("Помилка отримання даних:", error);
    res.status(500).json({ error: "Не вдалося отримати тренування" });
  }
});

// Завдання 4. Маршрут POST: Збереження тренування
app.post("/api/workouts", async (req, res) => {
  try {
    const newWorkout = req.body;
    const docRef = await db.collection("active_workouts").add(newWorkout);
    res.status(201).json({ id: docRef.id, message: "Тренування успішно додано!" });
  } catch (error) {
    console.error("Помилка запису:", error);
    res.status(500).json({ error: "Не вдалося зберегти тренування" });
  }
});

app.get("*", (req, res) => {
  const indexPath = path.join(buildPath, "index.html");
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.sendFile(path.join(publicPath, "index.html"), (err2) => {
        if (err2) {
          res.status(200).send("HealthTrack API is running perfectly!");
        }
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер успішно запущено на порту ${PORT}`);
});