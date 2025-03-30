import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import Swal from 'sweetalert2'

const MyCar = (props) => {
    const [car, setCar] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/mycar')
            .then(res => {
                setCar(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    console.log(car.id);


    const handleUpdate = (car) => {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const dialog = document.querySelector('dialog');
        dialog.close();
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const form = e.target;
                const name = form.model.value;
                const rentalPrice = form.rentalPrice.value;
                const availability = form.availability.value;
                const registrationNumber = form.registrationNumber.value;
                const features = form.features.value;
                const description = form.description.value;
                const bookingCount = form.bookingCount.value;
                const imageUrl = form.imageUrl.value;
                const location = form.location.value;
                const car = { bookingCount, name, rentalPrice, availability, registrationNumber, features, description, imageUrl, location };
                
                axios.put(`http://localhost:5000/updatecar/${car._id}`, car, { withCredentials: true })
                    .then(res => {
                        if (res.data.insertedId) {
                            alert('Car Added Successfully')
                            form.reset()
                        }
                    })
                    .catch(err => console.log(err))


                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });


    }


    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Rental Price</th>
                            <th>Booing Count</th>
                            <th>Availability</th>
                            <th>Date Added</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            car.map(car => <tr>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={car.imageUrl}
                                                    alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{car.name}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {car.rentalPrice}
                                </td>
                                <td>{car.bookingCount}</td>
                                <td>
                                    {car.availability}
                                </td>
                                <td></td>
                                <td>
                                    <button onClick={() => handleUpdate(car)}><MdOutlineSystemUpdateAlt /></button>
                                </td>
                                <td>
                                    <button><MdDelete /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <dialog className='mx-auto'>
                    <h1 className='text-center text-4xl font-bold my-4'>Update</h1>
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
                                <label className="fieldset-label">Booking Count</label>
                                <input name="bookingCount" placeholder="booking count" className="w-full p-2 border rounded" />
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
                </dialog>
            </div>
        </div>
    );
};

export default MyCar;