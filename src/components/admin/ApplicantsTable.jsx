import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden md:table-cell">FullName</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants?.applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className="font-medium md:hidden" colSpan={2}>
                                {item?.applicant?.fullname}
                                <br />
                                <span className="text-sm text-gray-500">{item?.applicant?.email}</span>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="hidden md:table-cell">{item?.applicant?.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="h-5 w-5" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {shortlistingStatus.map((status, index) => (
                                            <div key={index} onClick={() => statusHandler(status, item?._id)} className="flex w-full items-center my-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                                                <span>{status}</span>
                                            </div>
                                        ))}
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

export default ApplicantsTable