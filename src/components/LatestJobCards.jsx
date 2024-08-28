import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-4 rounded-lg shadow-md bg-white border border-gray-200 cursor-pointer transition-transform transform hover:scale-105'
        >
            <div className='mb-4'>
                <h1 className='text-xl font-semibold text-gray-800'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div className='mb-4'>
                <h2 className='text-lg font-bold text-gray-900'>{job?.title}</h2>
                <p className='text-sm text-gray-700'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-semibold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-semibold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-semibold' variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
