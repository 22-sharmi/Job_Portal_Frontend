import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className='relative overflow-x-auto'>
            {/* For desktop view */}
            <div className='hidden md:block'>
                <table className='min-w-full bg-white border border-gray-200 md:border-none'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b text-left'>Date</th>
                            <th className='py-2 px-4 border-b text-left'>Job Role</th>
                            <th className='py-2 px-4 border-b text-left'>Company</th>
                            <th className='py-2 px-4 border-b text-right'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allAppliedJobs.length <= 0 
                            ? <tr><td colSpan={4} className="text-center py-4">You haven't applied to any job yet.</td></tr> 
                            : allAppliedJobs.map((appliedJob) => (
                                <tr key={appliedJob._id}>
                                    <td className='py-2 px-4 border-b'>{appliedJob?.createdAt?.split("T")[0]}</td>
                                    <td className='py-2 px-4 border-b'>{appliedJob.job?.title}</td>
                                    <td className='py-2 px-4 border-b'>{appliedJob.job?.company?.name}</td>
                                    <td className='py-2 px-4 border-b text-right'>
                                        <Badge className={`text-white ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* For mobile view */}
            <div className='block md:hidden'>
                {
                    allAppliedJobs.length <= 0 
                    ? <div className="text-center py-4">You haven't  applied to any job yet.</div> 
                    : allAppliedJobs.map((appliedJob) => (
                        <div key={appliedJob._id} className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow">
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <span className='font-semibold'>Date:</span>
                                    <span>{appliedJob?.createdAt?.split("T")[0]}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-semibold'>Job Role:</span>
                                    <span>{appliedJob.job?.title}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-semibold'>Company:</span>
                                    <span>{appliedJob.job?.company?.name}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-semibold'>Status:</span>
                                    <Badge className={`text-white ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AppliedJobTable;
