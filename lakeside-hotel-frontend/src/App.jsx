import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import ExistingRooms from './components/room/ExistingRooms.jsx'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import EditRoom from './components/room/EditRoom.jsx'
import AddRoom from './components/room/AddRoom.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import RoomListing from './components/room/RoomListing.jsx'
import Admin from './components/admin/Admin.jsx'
import CheckOut from './components/bookings/CheckOut.jsx'
import BookingSuccess from './components/bookings/BookingSuccess.jsx'
import Bookings from './components/bookings/Bookings.jsx'
import FindBooking from './components/bookings/FindBooking.jsx'

const App = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/edit-room/:roomId' element={<EditRoom />} />
                <Route path='/existing-rooms' element={<ExistingRooms />} />
                <Route path='/add-room' element={<AddRoom />} />
                <Route path='/book-room/:roomId' element={<CheckOut />} />
                <Route path='/browse-all-rooms' element={<RoomListing />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/booking-success' element={<BookingSuccess />} />
                <Route path='/existing-bookings' element={<Bookings />} />
                <Route path='/find-bookings' element={<FindBooking />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App