import { useContext, useState } from 'react'
import { loginUser } from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);

    const handleInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(login);
        if (success) {
            const token = success.token;
            handleLogin(token)
            navigate("/")
        } else {
            setErrorMessage("Invalid username or password, Please try again.");
        }
        setTimeout(() => {
            setErrorMessage("");
        }, 4000)
    }

    return (
        <section className="container col-6 mt-5 mb-5 p-4 shadow-lg rounded bg-light">
            {errorMessage && (
                <div className="alert alert-danger text-center fw-bold">{errorMessage}</div>
            )}

            <h2 className="text-center mb-4 text-primary">🔑 Login to Your Account</h2>

            <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Enter your email"
                        value={login.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        value={login.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg shadow-sm"
                    >
                        🔐 Login
                    </button>
                </div>

                {/* Register Link */}
                <div className="text-center mt-3">
                    <span className="text-muted">
                        Don't have an account?{" "}
                        <Link to="/register" className="fw-semibold text-decoration-none">
                            Register here
                        </Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

export default Login;