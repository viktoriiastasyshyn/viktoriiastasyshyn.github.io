import React from 'react';

function ProgressChart(props) {
  return (
    <section style={{ backgroundColor: '#f4f7f6', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <h2>Мій прогрес</h2>
      <p>Відстежуйте свої результати та досягайте нових висот.</p>
      <ul style={{ fontSize: '18px', lineHeight: '1.6' }}>
        <li><strong>Пройдені тренування:</strong> {props.completedWorkouts}</li>
        <li><strong>Спалено калорій:</strong> {props.totalCalories} ккал</li>
        <li><strong>Досягнення:</strong> "Марафонець тижня", "Залізна дисципліна"</li>
      </ul>
    </section>
  );
}

export default ProgressChart;