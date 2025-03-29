import axios from 'axios';
import React from 'react';

const AddCar = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.model.value;
        const rentalPrice = form.rentalPrice.value;
        const availability = form.availability.value;
        const registrationNumber = form.registrationNumber.value;
        const features = form.features.value;
        const description = form.description.value;
        const imageUrl = form.imageUrl.value;
        const location = form.location.value;
        const car = { name, rentalPrice, availability, registrationNumber, features, description, imageUrl, location };
        console.log(car);
        axios.post('http://localhost:5000/addcar', car,{withCredentials:true})
            .then(res => {
                if (res.data.insertedId) {
                    alert('Car Added Successfully')
                    form.reset()
                }
            })
            .catch(err => console.log(err))
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
                        <input name="rentalPrice" placeholder="Daily Rental Price" className="w-full p-2 border rounded" />
                        <label className="fieldset-label">Availability</label>
                        <input name="availability" placeholder="Availability" className="w-full p-2 border rounded" />
                        <label className="fieldset-label">Registration Number</label>
                        <input name="registrationNumber" placeholder="Vehicle Registration Number" className="w-full p-2 border rounded" />
                        <label className="fieldset-label">Features</label>
                        <input name="features" placeholder="Features (e.g., GPS, AC, etc.)" className="w-full p-2 border rounded" />
                        <textarea name="description" placeholder="Description" className="w-full p-2 border rounded"></textarea>
                        <label className="fieldset-label">Image</label>
                        <input name="imageUrl" placeholder="Image URL" className="w-full p-2 border rounded" />
                        <label className="fieldset-label">Location</label>
                        <input name="location" placeholder="Location" className="w-full p-2 border rounded" />
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddCar;