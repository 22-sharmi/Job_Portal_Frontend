import { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='text-center py-8 px-4 md:py-16 md:px-8 lg:px-16 relative z-0'>
            <div className='flex flex-col gap-6 md:gap-8 mx-auto max-w-3xl'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm md:text-base'>No. 1 Job Hunt Website</span>
                <h1 className='text-3xl md:text-5xl font-bold leading-tight'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className='text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mx-auto'>
                    Explore thousands of job opportunities across various industries. Find the perfect match for your skills, apply with confidence, and take the next step toward your career goals. Your dream job is just a click away!
                </p>
                <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mx-auto'>
                    <div className='flex w-full max-w-lg shadow-lg border border-gray-200 rounded-full'>
                        <input
                            type="text"
                            placeholder='Find your dream jobs'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full px-4 py-2 rounded-l-full'
                        />
                        <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] px-4 py-2">
                            <Search className='h-5 w-5 text-white' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
