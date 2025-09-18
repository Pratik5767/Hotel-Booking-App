import { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUser(register);
            setSuccessMessage(response);
            setErrorMessage("");
            setRegister({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            })
            navigate("/login");
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(`Registration error: ${error.message}`);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 4000)
    }

    return (
        <section className="container col-6 mt-5 mb-5 p-4 shadow-lg rounded bg-light">
            {
                errorMessage && (
                    <div className="alert alert-danger text-center fw-bold">{errorMessage}</div>
                )
            }

            {
                successMessage && (
                    <div className="alert alert-success text-center fw-bold">{successMessage}</div>
                )
            }

            <h2 className="text-center mb-4 text-success">📝 Create Your Account</h2>

            <form onSubmit={handleRegistration}>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label fw-semibold">
                        First Name
                    </label>
                    <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your first name"
                        value={register.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label fw-semibold">
                        Last Name
                    </label>
                    <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your last name"
                        value={register.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

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
                        value={register.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Create a password"
                        value={register.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success btn-lg shadow-sm">
                        ✅ Register
                    </button>
                </div>

                <div className="text-center mt-3">
                    <span className="text-muted">
                        Already have an account?{" "}
                        <Link to="/login" className="fw-semibold text-decoration-none">
                            Login here
                        </Link>
                    </span>
                </div>
            </form>
        </section>

    )
}

export default Registration