import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const addTokenToHeaders = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('', credentials);
            console.log(response);
            const token = response.data.data.accessToken;
            console.log(token);
            if (token) {
                addTokenToHeaders(token);
                return token;
            } else {
                throw new Error('Token not received');
            }
        } catch (error) {
            console.error('Login error', error);
            throw error;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await handleLogin(credentials);
            console.log('Login successful', token);
            localStorage.setItem('userLogin', credentials.login);
            localStorage.setItem('authToken', token);
            navigate('/profile', { replace: true });
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error', error);
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className={styles['input-box']}>
                        <input type="text" name="login" placeholder="Login" value={credentials.username} onChange={handleChange} />
                    </div>
                    <div className={styles['input-box']}>
                        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
                    </div>
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                    <div className={styles['register-link']}>
                        <p>Do not have an account? <NavLink to="/register">Register</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;