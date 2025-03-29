import React from 'react';

const Card = ({cars}) => {
    
    
    return (
        <div className='grid grid-cols-3 gap-4'>
            {cars.map((car)=>{
            return <div className="card bg-base-100 w-full h-screen shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{car.Model}</h2>
                    <h2>{car.Daily_Price}</h2>
                    <h2>{car.Availability}</h2>
                    <h2>{car.Booking_count}</h2>
                    <h2>{car.Date_Posted}</h2>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
                    </div>}
            )}
        </div>
    );
};

export default Card;