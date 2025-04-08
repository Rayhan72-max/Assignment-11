import { Link } from 'react-router-dom';
import banner from '../assets/Banner.jpg'

const Banner = (props) => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:`url(${banner})`,
                    backgroundSize:'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="text-center max-w-md">                        
                        <h1 className="mb-5 text-4xl font-bold text-shadow-lg text-shadow-white">Drive Your Dreams Today!</h1>
                        <p>Experience the thrill of the open road with our latest collection of high-performance cars. Luxury, speed, and innovation—crafted for you.</p>
                        <Link to={"/available"}><button className="btn btn-primary mt-5 shadow-sm shadow-white">Available Cars</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;