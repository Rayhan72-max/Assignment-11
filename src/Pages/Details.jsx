import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../Components/Card'
import Swal from 'sweetalert2';
import axios from 'axios';

const today = new Date();
const Details = (props) => {
    const id = useParams();
    const [car, setCar] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/details/${id.id}`)
            .then(res => res.json())
            .then(data => setCar(data))
    }, [])
    const startDate = new Date(car.Date_Posted);
    const datePassed = today - startDate;
    const daysPassed = Math.floor(datePassed / (1000 * 60 * 60 * 24));
    const handleBooking = () => {
        const name = car.Model;
        Swal.fire({
            title: `Booked ${name}`,
            text: "Are you sure you want to book this car?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
             cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Book it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axios.patch(`http://localhost:5000/bookings/${id.id}`,{car},{ withCredentials: true })
              .then(res => {
                
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Booked!",
                        text: "Your car has been booked.",
                        icon: "success"
                      });
                }
                }
              )
              .catch(err => {
                console.log(err);
            })
              
            }
          });
    }
    //console.log(car.length);
    return (
        <div>
            <div className='flex justify-center my-4'>
                <div className="card bg-base-100 w-full h-screen shadow-sm px-48">
                    <figure>
                        <img
                            src={car.ImageUrl}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{car.Model}</h2>
                        <h2>${car.Daily_Price}/day</h2>
                        <h2>{car.Availability}</h2>
                        <h2>{car.Booking_count}</h2>
                        <h2>Added {daysPassed} days</h2>
                        <div className="card-actions justify-end">
                            <button onClick={handleBooking} className="btn btn-primary">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;