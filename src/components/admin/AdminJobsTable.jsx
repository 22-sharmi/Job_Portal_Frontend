import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden md:table-cell">Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell className="hidden md:table-cell">{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal className="h-5 w-5 inline-block" /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-full cursor-pointer hover:bg-gray-100 p-2 rounded'>
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-full gap-2 cursor-pointer mt-2 hover:bg-gray-100 p-2 rounded'>
                                            <Eye className='w-4'/>
                                            <span>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable