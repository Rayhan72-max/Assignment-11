import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Card from '../Components/Card';
import { FaSearch } from "react-icons/fa";
import { AuthContext } from '../Auth/AuthProvider';

const Available = (props) => {
    const {grid,setGrid} = useContext(AuthContext);
    const [swap,setSwap] = useState(true);
    const [newCars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        //
        axios.get(`https://assignment11-server-red.vercel.app/available?search=${searchTerm}`)     
        .then(res => {
            setCars(res.data);
        })
        
    }, [searchTerm]);
    
    
    const handlePress = (e) => {
        if (e.key === 'Enter') {
            setSearchTerm(e.target.value);
        }
    }
    const handleGrid = (e) => {
        setGrid(!grid);
    }
    
     const shortPrice = (e) => {
        setSwap(!swap);
        const value = e.target.value;
        if (value === "lowest price") {
            
          return  setCars(newCars.sort((a, b) => a.Daily_Price - b.Daily_Price));
        } else {
           
           return setCars(newCars.sort((a, b) => b.Daily_Price - a.Daily_Price));
        }
    } 
    
    return (
        <div>
            
            <div className='flex justify-center my-4'>
                <label className="fieldset-label mr-2"><FaSearch /> </label>
                <input name="search" placeholder=" Search by Model" className="p-2 border rounded" onKeyDown={(e)=>handlePress(e)}/>
            </div>
            <div className='flex justify-end items-center my-4'>
            {<select onChange={shortPrice} className="border rounded p-2 mr-2">
                <option value="default">Sort By Price</option>
                <option value="lowest price">Lowest Price</option>
                <option value="highest price">Highest Price</option>                
            </select>}
            <input type="checkbox" onClick={handleGrid} defaultChecked className="toggle" />
            </div>
            <div  className={grid ? `grid grid-cols-3 gap-4` : "flex flex-col gap-4 mx-auto px-48"}>
            {newCars.map((car) => {
            const today = new Date();
            const startDate = new Date(car.Date_Posted);
            const datePassed = today - startDate;
            const daysPass = Math.floor(datePassed / (1000 * 60 * 60 * 24));
            return <Card key={car._id} cars={car} daysPassed={daysPass}></Card>    
            })}
            </div>
          
          
        </div>
    );
};

export default Available;