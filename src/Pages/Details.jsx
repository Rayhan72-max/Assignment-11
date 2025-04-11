import React, { use, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Card from '../Components/Card'
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthProvider';

const today = new Date();
const Details = (props) => {
    const [bookedCars,setBookedCars] = useState([])
    const [features,setFeatures] = useState([])
    const [handle,setHandle] = useState([]);
    const navigate = useNavigate();
    const BookingDate = new Date();
    const bookingStatus = {Status:"Confirmed"}; 
    const user = useContext(AuthContext);
    const email = user.user.email;
    
    const id = useParams();
    const [car, setCar] = useState({});
    useEffect(() => {
        fetch(`https://assignment11-server-red.vercel.app/details/${id.id}`)
            .then(res => res.json())
            .then(data => {
                setCar(data)
                setFeatures(data.Features)
            })
    }, [])
    
    useEffect(()=>{
        axios.get(`https://assignment11-server-red.vercel.app/bookings/${email}`)
       .then(res=>setBookedCars(res.data)) 
   },[handle])
    
        
    
    
    
    const startDate = new Date(car.Date_Posted);
    
    const datePassed = today - startDate;
    const daysPassed = Math.floor(datePassed / (1000 * 60 * 60 * 24));
    const handleBooking = () => {
        const name = car.Model;
        const {_id,...newCar} = car;

        if(!email){
           return navigate("/login")
        }

        
        setHandle(!handle)
        const exist = bookedCars.find(booked=>booked.Model === car.Model)
        if(exist){
            return Swal.fire({
                title:"Booked Already",
                icon: "info"
            })
        }

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
              axios.post(`https://assignment11-server-red.vercel.app/bookings`,{...newCar,email,BookingDate,bookingStatus},{ withCredentials: true })
                .then(
                    axios.patch(`https://assignment11-server-red.vercel.app/bookings/${id.id}`,{car},{withCredentials:true}) )
                    .then(res => {
                        
                        if (res.data.acknowledged === true) {
               
                            Swal.fire({
                                title: "Booked!",
                                text: "Your car has been booked.",
                                icon: "success"
                              });
                            navigate(`/mybookings/${email}`)
                        }})                    
                }
          })
          
    }
    
    return (
        <div>
            <div className='flex justify-center my-4'>
                <div className="card bg-base-100 w-full h-screen shadow-sm px-48">
                    <figure>
                        <img
                            src={car.ImageUrl}
                            alt={car.Model} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-xl">{car.Model}</h2>
                        
                        <div className='flex gap-2'>
                        {features.map(f=><h1 className="tab-active bg-blue-500 text-white rounded-lg p-1">{f}</h1>)}  
                        </div>
                        <h2 className='font-bold'>{car.Description}</h2>
                        <h2>${car.Daily_Price}/day</h2>
                        <h2>{car.Availability}</h2>
                        <h2>Booking Count : {car.Booking_count}</h2>
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