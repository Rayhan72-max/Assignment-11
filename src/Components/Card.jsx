import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { Link } from 'react-router-dom';



const Card = ({cars,daysPassed}) => {


    /* const datePassed = today - cars.Date_Posted;
    console.log(cars.Date_Posted)
    const daysPassed = Math.floor(datePassed / (1000 * 60 * 60 * 24));
    const localDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }); */
    //const startDate = new Date(cars.Date_Posted);
    //const datePassed = today - startDate;

    //const daysPassed = Math.floor(datePassed / (1000 * 60 * 60 * 24));
    return (
        <div className="card bg-base-100 w-full h-screen shadow-sm hover:scale-105 transition-all duration-300 ease-in-out">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{cars.Model}</h2>
                <h2>${cars.Daily_Price}/day</h2>

                <h2>{cars.Availability}</h2>
                <h2>{cars.Booking_count}</h2>
                <h2>Added {daysPassed} days ago</h2>
                <div className="card-actions justify-end">
                    <Link to={`/details/${cars._id}`}><button className="btn btn-primary">Book Now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Card;