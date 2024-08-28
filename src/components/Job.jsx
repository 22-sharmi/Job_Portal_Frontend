import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className='p-4 sm:p-5 rounded-lg shadow-md bg-white border border-gray-200'>
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-3'>
                <Button className="p-2 sm:p-4" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg sm:text-xl font-medium'>{job?.company?.name}</h1>
                    <p className='text-xs sm:text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='text-lg sm:text-xl font-bold my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-semibold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-semibold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-semibold' variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div className='flex flex-wrap gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className='w-full sm:w-auto'>Details</Button>
                <Button className="bg-[#7209b7] text-white w-full sm:w-auto">Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
