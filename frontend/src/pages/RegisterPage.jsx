/**
 * =============================================
 * COMPONENTE: RegisterPage
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Página de registro que permite a nuevos usuarios crear una cuenta
 * en la plataforma. Incluye validación de campos y feedback auditivo.
 * 
 * CARACTERÍSTICAS PRINCIPALES:
 * - Formulario de registro con 4 campos obligatorios
 * - Validación de correo electrónico
 * - Manejo de errores con feedback visual y auditivo
 * - Redirección automática tras registro exitoso
 * - Efectos de sonido en interacciones
 */ 

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import './RegisterPage.css';

export default function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);

        try {
            const { token } = await register(nombre, apellido, email, pwd);
            if (token) {
                localStorage.setItem('token', token);
                navigate('/login');
            }
        } catch (err) {
            let mensajeError = err.message || 'Error al registrar';

            // 🧹 Modificar mensaje genérico del backend
            if (mensajeError === 'One or more validation errors occurred.') {
                mensajeError = 'Correo electrónico inválido.';

                // 📢 Reproducir audio solo en este caso
                const correoAudio = new Audio('/Sonidos/VozErrorCorreoInvalido.mp3');
                correoAudio.play().catch(error => {
                    console.error("No se pudo reproducir el sonido de error de correo:", error);
                });
            }

            setError(mensajeError);

            // 🔐 Reproducir audio de contraseña solo si aplica
            if (mensajeError.toLowerCase().includes('contraseña')) {
                const audioPath = mensajeError.toLowerCase().includes('al menos 8 caracteres')
                    ? '/Sonidos/VozErrorCaracteres.mp3'
                    : '/Sonidos/VozErrorContrasenia.mp3';

                const errorAudio = new Audio(audioPath);
                errorAudio.play().catch(error => {
                    console.error("No se pudo reproducir el sonido de error de contraseña:", error);
                });
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card" role="main" aria-labelledby="register-title">
                <h2 id="register-title">Registro</h2>
                <form onSubmit={handleSubmit} className="register-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            id="apellido"
                            type="text"
                            placeholder="Ingresa tu apellido"
                            value={apellido}
                            onChange={e => setApellido(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pwd">Contraseña</label>
                        <input
                            id="pwd"
                            type="password"
                            placeholder="Crea una contraseña"
                            value={pwd}
                            onChange={e => setPwd(e.target.value)}
                            required
                            aria-required="true"
                        />
                    </div>

                    {error && (
                        <div className="error" role="alert" aria-live="assertive">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn"
                        onClick={() => {
                            const audio = new Audio('/Sonidos/click.mp3');
                            audio.play().catch(error => {
                                console.error("No se pudo reproducir el sonido:", error);
                            });
                        }}
                    >
                        Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    );
}