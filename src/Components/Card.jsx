import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Card = ({cars,daysPassed}) => {
    
    const navigate = useNavigate();
    const handleNavigate =()=>{
        if(cars.Availability !== "Available"){
            return Swal.fire("Car Not Available")
        }else {
        
        navigate(`/details/${cars._id}`);
        }
    }



    
    return (
        <div className="card bg-base-100 w-full h-auto shadow-sm hover:scale-105 transition-all duration-300 ease-in-out">
            <figure>
                <img
                    src={cars.ImageUrl}
                    alt={cars.Model}
                    className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{cars.Model}</h2>
                <h2>${cars.Daily_Price}/day</h2>

                <h2>{cars.Availability}</h2>
                <h2>Booking Count: {cars.Booking_count}</h2>
                <h2>Added {daysPassed} days ago</h2>
                <div className="card-actions justify-end">
                    <button onClick={handleNavigate} className="btn btn-primary">Book Now</button>                                        
                </div>
            </div>
        </div>
    );
};

export default Card;