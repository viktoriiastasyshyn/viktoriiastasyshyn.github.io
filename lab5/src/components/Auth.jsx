import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function Auth({ user }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Користувача створено!");
        } catch (error) {
            alert("Помилка реєстрації: " + error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Ви увійшли!");
        } catch (error) {
            alert("Помилка входу: " + error.message);
        }
    };

    const handleLogout = () => signOut(auth);

    if (user) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Ви увійшли як: <b>{user.email}</b></p>
                <button onClick={handleLogout} style={{ backgroundColor: '#e74c3c', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Вийти</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2>Вхід / Реєстрація</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{padding: '8px'}} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} style={{padding: '8px'}} />
            <button onClick={handleLogin} style={{ backgroundColor: '#3498db', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Увійти</button>
            <button onClick={handleSignUp} style={{ backgroundColor: '#2ecc71', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Зареєструватися</button>
        </div>
    );
}

export default Auth;