import axios from 'axios';
import React, { use, useContext, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { NavLink, useHref, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import moment from 'moment';

import { reload } from 'firebase/auth';

const MyCar = (props) => {
    const location = useLocation();
    const params = useParams();
    const [updateCar,setUpdateCar] = useState({})
    const [cars, setCar] = useState([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        axios.get(`https://assignment11-server-red.vercel.app/mycar/${params.email}`, { withCredentials: true })
            .then(res => {
                if (res.data.length === 0) {
                    const dialogue = document.getElementById('my_dialog');
                   return dialogue.showModal();
                }
                setCar(res.data);
            
            })
            
    }, [reload])    

    const handleUpdate = (car) => {
        location.state = { id: car._id };
        axios.get(`https://assignment11-server-red.vercel.app/details/${location.state.id}`,{withCredentials:true})
        .then(res=>setUpdateCar(res.data))
        const dialog = document.querySelector('dialog');
        dialog.showModal();

    }
    const handleClose = () => {
        const dialog = document.querySelector("dialog");
        dialog.close();
    }
    const handleClose1 = () => {
        const dialog = document.getElementById("my_dialog")
        dialog.close();
    }

    const handleDelete = (c) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed){
            axios.delete(`https://assignment11-server-red.vercel.app/deletecar/${c._id}`, { withCredentials: true })
            .then(res => {
                if (res.data.deletedCount > 0) {

                    const remaining = cars.filter(ca => ca._id !== c._id);

                            setCar(remaining);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });

                }
            })
          
    }

    const handleSubmit = (e) => {
        const id = location.state.id;
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
               
                axios.patch(`https://assignment11-server-red.vercel.app/updatecar/${id}`, car, { withCredentials: true })
                    .then(res => {
                     
                        if (res.data.modifiedCount > 0) {
                            form.reset();
                            setReload(!reload);
                        }
                    })
                    


                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "price") {
            shortPrice();
        }
        else if (value === "date") {
            shortDate();
        }
    }
    const shortPrice = () => {
        const sortedCars = [...cars].sort((a, b) => a.rentalPrice - b.rentalPrice);
        setCar(sortedCars);
    }
    const shortDate = () => {
        const sortedCars = [...cars].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        setCar(sortedCars);
    }

    return (
        <div>
            <ToastContainer />
            <div className="overflow-x-auto">

                <div className='flex justify-end'>
                    <select name="filter" onChange={handleChange} id="">
                        <option value="filter">Filter</option>
                        <option value="price" onClick={shortPrice}>By Price</option>
                        <option value="date" onClick={shortDate}>By Date</option>
                    </select>
                </div>
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
                            cars.map(car => <tr>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={car.ImageUrl}
                                                    alt={car.Model} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{car.Model}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {car.Daily_Price}
                                </td>
                                <td>{car.Booking_count}</td>
                                <td>
                                    {car.Availability}
                                </td>
                                <td>{moment(car.Date_Posted).format("YYYY/MM/DD HH/ss")}</td>
                                <td>
                                    <button onClick={() => handleUpdate(car)}><MdOutlineSystemUpdateAlt /></button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(car)}><MdDelete /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <dialog className='modal'>

                    <div className="card bg-base-100 w-full modal-box max-w-sm shrink-0 shadow-2xl mx-auto">
                        <button onClick={handleClose} className='btn btn-ghost w-fit font-bold relative bottom-8 right-8'>X</button>
                        <h1 className='text-center text-4xl font-bold my-4'>Update</h1>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md ">
                                <label className="fieldset-label">Model</label>
                                <input name="model" defaultValue={updateCar.Model} className="w-full p-2 border rounded" />
                                <label className="fieldset-label">Rental Price</label>
                                <input name="rentalPrice" defaultValue={updateCar.Daily_Price} className="w-full p-2 border rounded" />
                                <label className="fieldset-label">Availability</label>
                                <select name="availability" defaultValue={"select"} className="w-full p-2 border rounded" required>
                                    <option value="">Choose One</option>
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Not Available</option>
                                </select>
                                <label className="fieldset-label">Registration Number</label>
                                <input name="registrationNumber" placeholder="Vehicle Registration Number" className="w-full p-2 border rounded" />
                                <label className="fieldset-label">Booking Count</label>
                                <input name="bookingCount" defaultValue={updateCar.Booking_count} className="w-full p-2 border rounded" />
                                <label className="fieldset-label">Features</label>
                                <input name="features" defaultValue={updateCar.Features} className="w-full p-2 border rounded" />
                                <textarea name="description" placeholder="Description" className="w-full p-2 border rounded"></textarea>
                                <label className="fieldset-label">Image</label>
                                <input name="imageUrl" defaultValue={updateCar.ImageUrl} className="w-full p-2 border rounded" />
                                <label className="fieldset-label">Location</label>
                                <input name="location" defaultValue={updateCar.Location} className="w-full p-2 border rounded" />
                                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div>
                <dialog id='my_dialog' className='mx-auto modal p-4'>
                
                    <div className='card modal-box bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto'>
                    <button onClick={handleClose1} className='btn btn-ghost w-fit font-bold relative bottom-8 right-8'>X</button>
                        <h1>Please Add Car!</h1>
                        <NavLink to={"/addcar"}><button className='btn bg-blue-300 font-bold text-black mt-2 animate-bounce'>Add Car</button></NavLink>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyCar;