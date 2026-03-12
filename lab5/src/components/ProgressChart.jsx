import React from 'react';

function ProgressChart({ history = {} }) {
    const types = Object.keys(history);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Мій прогрес</h2>
            <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Дані завантажено з власного Node.js сервера (згруповано за типом)</p>
            
            {types.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#95a5a6' }}>Ви ще не розпочали жодного тренування.</p>
            ) : (
                types.map((type) => (
                    <div key={type} style={{ marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#2980b9', borderBottom: '2px solid #ecf0f1', paddingBottom: '5px' }}>
                            {type}
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {history[type].map((log, index) => (
                                <li key={index} style={{ 
                                    marginBottom: '8px', 
                                    padding: '10px', 
                                    backgroundColor: '#f8f9fa', 
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <span><strong>{log.title}</strong> <span style={{fontSize: '12px', color: '#7f8c8d'}}>({log.date})</span></span>
                                    <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>{log.calories} ккал</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProgressChart;