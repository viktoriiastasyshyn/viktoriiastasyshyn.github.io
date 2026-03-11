import React from 'react';

function WorkoutCard(props) {
  return (
    <article style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px', backgroundColor: 'white' }}>
      <h3>{props.title}</h3>
      <img src={props.image} alt={props.title} style={{ width: '100%', borderRadius: '10px', maxHeight: '200px', objectFit: 'cover' }} />
      <p><b>⏱ Час:</b> {props.duration} | <b> Калорії:</b> {props.calories} ккал</p>
      
      <a href={props.video} target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '10px', color: '#3498db' }}>
        ▶ Дивитися відео на YouTube
      </a>
      
      <button 
        style={{ width: '100%', padding: '10px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Почати тренування
      </button>
    </article>
  );
}

export default WorkoutCard;