import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [dispatch, selectedValue]);

    return (
        <div className='w-full bg-white p-4 rounded-md shadow-md'>
            <h1 className='font-bold text-lg mb-4'>Filter Jobs</h1>
            {
                filterData.map((data, index) => (
                    <div key={`filter-${index}`} className='mb-4'>
                        <h2 className="font-bold text-md mb-2">{data.filterType}</h2>
                        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={`item-${itemId}`} className="flex items-center space-x-2 mb-2">
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    );
                                })
                            }
                        </RadioGroup>
                    </div>
                ))
            }
        </div>
    );
};

export default FilterCard;
