import React, { useState } from 'react';

function WorkoutCard({ title, type, duration, calories, image, video, onStart }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleStart = () => {
    window.open(video, '_blank');
    if (typeof onStart === 'function') {
        onStart({ title, calories });
    }
    alert(`Тренування "${title}" розпочато!`);
};

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', textAlign: 'center', background: 'white' }}>
      <img 
        src={image} 
        alt={title} 
        onClick={() => setShowDetails(!showDetails)} 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
      <h3>{title}</h3>
      <p><b>Тип:</b> {type}</p>
      
      {showDetails && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px', fontSize: '14px' }}>
          <p>⏱ Тривалість: {duration}</p>
          <p>🔥 Калорії: {calories} ккал</p>
          <p><i>Натисніть "Почати", щоб відкрити відеоінструкцію</i></p>
        </div>
      )}

      <button 
        onClick={handleStart}
        style={{ marginTop: '10px', padding: '10px 20px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Почати тренування
      </button>
    </div>
  );
}

export default WorkoutCard;