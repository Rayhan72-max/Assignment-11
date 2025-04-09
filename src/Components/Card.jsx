import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Card = ({cars,daysPassed}) => {
    const navigate = useNavigate();
    const handleNavigate =()=>{
        if(cars.Availability !== "Available"){
            return Swal.fire("Car Not Available")
        }else if(cars.Status ==="Confirmed"){
            return Swal.fire("Car is Booked Already")
        }else {
        navigate(`/details/${cars._id}`)
        }
    }
    
    return (
        <div className="card bg-base-100 w-full h-screen shadow-sm hover:scale-105 transition-all duration-300 ease-in-out">
            <figure>
                <img
                    src={cars.ImageUrl}
                    alt={cars.Model} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{cars.Model}</h2>
                <h2>${cars.Daily_Price}/day</h2>

                <h2>{cars.Availability}</h2>
                <h2>{cars.Booking_count}</h2>
                <h2>Added {daysPassed} days ago</h2>
                <div className="card-actions justify-end">
                    <button onClick={handleNavigate} className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Card;