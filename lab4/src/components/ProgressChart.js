import React from 'react';

function ProgressChart({ completedWorkouts, totalCalories, history = [] }) {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Мій прогрес</h2>
            <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Результати завантажені з Firebase Firestore</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: '#27ae60' }}>{completedWorkouts}</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Тренувань</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: '#e67e22' }}>{totalCalories}</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Ккал спалено</p>
                </div>
            </div>

            <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>📜 Журнал активності</h3>
            
            {history.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#95a5a6' }}>Ви ще не розпочали жодного тренування. Натисніть "Почати" у списку тренувань!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {history.map((log, index) => (
                        <li key={index} style={{ 
                            backgroundColor: 'white', 
                            marginBottom: '10px', 
                            padding: '15px', 
                            borderRadius: '8px', 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            borderLeft: '5px solid #2ecc71'
                        }}>
                            <div>
                                <strong style={{ fontSize: '16px' }}>{log.title}</strong>
                                <div style={{ fontSize: '12px', color: '#95a5a6' }}>{log.date}</div>
                            </div>
                            <div style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                                +{log.calories} ккал
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProgressChart;