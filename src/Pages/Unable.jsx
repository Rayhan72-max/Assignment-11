
import { Link } from 'react-router-dom';

const Unable = (props) => {
    return (
        <div>
        <h1 className='font-bold text-4xl'>404 Page Not Found</h1>
        <Link to={"/"} className='btn btn-outline mt-4'>Go Home</Link>
        </div>
    );
};

export default Unable;