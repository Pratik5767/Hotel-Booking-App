import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <section className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Admin Panel</h2>
                <hr />
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/existing-rooms" className="btn btn-primary btn-lg">
                        Manage Rooms
                    </Link>
                    <Link to="/existing-bookings" className="btn btn-success btn-lg">
                        Manage Bookings
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Admin;
