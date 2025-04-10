import axios from 'axios';
import React, { use, useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import Swal from 'sweetalert2';

const AddCar = (props) => {
    const { user } = useContext(AuthContext)
    const Email = user?.email;
    const Date_Posted = new Date();   
    const handleSubmit = (e) => {
        e.preventDefault();
        const Form = e.target;
        const Model = Form.model.value;
        const Daily_Price = Form.rentalPrice.value;
        const Availability = Form.availability.value;
        const RegistrationNumber = Form.registrationNumber.value;
        const Features = Form.features.value;
        const Description = Form.description.value;
        const Booking_count = Form.bookingCount.value;
        const ImageUrl = Form.imageUrl.value;
        const Location = Form.location.value;
        const car = { Email,Date_Posted,Booking_count, Model, Daily_Price, Availability, RegistrationNumber, Features, Description, ImageUrl, Location };
        
        axios.post('http://localhost:5000/addcar', car, { withCredentials: true })
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Car added Successfully")
                    Form.reset()
                }
            })
            
    }
    return (
        <div>
            <h1 className='text-center text-4xl font-bold my-4'>Add Car</h1>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md ">
                        <label className="fieldset-label">Model</label>
                        <input name="model" placeholder="Car Model" className="w-full p-2 border rounded" />
                        <label className="fieldset-label">Rental Price</label>
                        <input name="rentalPrice" placeholder="Daily Rental Price" className="w-full p-2 border rounded" required />
                        <label className="fieldset-label">Availability</label>
                        <select name="availability" defaultValue={"select"} className="w-full p-2 border rounded" required>
                            <option value="">Choose One</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Not Available</option>
                        </select>
                        <label className="fieldset-label">Registration Number</label>
                        <input name="registrationNumber" placeholder="Vehicle Registration Number" className="w-full p-2 border rounded"  />
                        <label className="fieldset-label">Booking Count</label>
                        <input name="bookingCount" defaultValue={0} placeholder="booking count" className="w-full p-2 border rounded" />
                        <label className="fieldset-label">Features</label>
                        <input name="features" placeholder="Features (e.g., GPS, AC, etc.)" className="w-full p-2 border rounded" />
                        <textarea name="description" placeholder="Description" className="w-full p-2 border rounded"></textarea>
                        <label className="fieldset-label">Image</label>
                        <input name="imageUrl" placeholder="Image URL" className="w-full p-2 border rounded" required/>
                        <label className="fieldset-label">Location</label>
                        <input name="location" placeholder="Location" className="w-full p-2 border rounded" required/>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddCar;