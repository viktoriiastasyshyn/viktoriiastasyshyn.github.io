import React from 'react';

function NutritionPlan() {
  return (
    <section style={{ marginTop: '30px' }}>
      <h2>План харчування</h2>
      <p>Плануйте своє щоденне меню залежно від ваших цілей:</p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <article style={{ flex: '1', minWidth: '250px', border: '1px solid #3498db', padding: '15px', borderRadius: '8px' }}>
          <h3 style={{ color: '#3498db' }}>Збалансований (1800 ккал)</h3>
          <ul>
            <li><b>Сніданок:</b> Вівсянка з горіхами</li>
            <li><b>Обід:</b> Салат з куркою та кіноа</li>
            <li><b>Вечеря:</b> Запечена риба з броколі</li>
          </ul>
        </article>

        <article style={{ flex: '1', minWidth: '250px', border: '1px solid #e74c3c', padding: '15px', borderRadius: '8px' }}>
          <h3 style={{ color: '#e74c3c' }}>Для схуднення (1400 ккал)</h3>
          <ul>
            <li><b>Сніданок:</b> Сирники без цукру</li>
            <li><b>Обід:</b> Овочевий крем-суп</li>
            <li><b>Вечеря:</b> Відварена телятина з овочами</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default NutritionPlan;