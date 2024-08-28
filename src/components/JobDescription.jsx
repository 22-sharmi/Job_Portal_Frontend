import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col sm:flex-row items-start justify-between gap-4'>
                <Button onClick={() => navigate(-1)} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                    <ArrowLeft />
                    <span>Back</span>
                </Button>
                <div className='flex flex-col items-start'>
                    <h1 className='font-bold text-xl sm:text-2xl'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'} w-full sm:w-auto`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4 text-lg sm:text-xl'>Job Description</h1>
            <div className='my-4 space-y-2'>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <h1 className='font-bold flex-shrink-0 w-32'>Role:</h1>
                    <span className='text-gray-800'>{singleJob?.title}</span>
                </div>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <h1 className='font-bold flex-shrink-0 w-32'>Location:</h1>
                    <span className='text-gray-800'>{singleJob?.location}</span>
                </div>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <h1 className='font-bold flex-shrink-0 w-32'>Description:</h1>
                    <span className='text-gray-800'>{singleJob?.description}</span>
                </div>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <h1 className='font-bold flex-shrink-0 w-32'>Experience:</h1>
                    <span className='text-gray-800'>{singleJob?.experience} yrs</span>
                </div>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <h1 className='font-bold flex-shrink-0 w-32'>Salary:</h1>
                    <span className='text-gray-800'>{singleJob?.salary} LPA</span>
                </div>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <h1 className='font-bold flex-shrink-0 w-32'>Total Applicants:</h1>
                    <span className='text-gray-800'>{singleJob?.applications?.length}</span>
                </div>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <h1 className='font-bold flex-shrink-0 w-32'>Posted Date:</h1>
                    <span className='text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span>
                </div>
            </div>
        </div>
    );
}

export default JobDescription;
