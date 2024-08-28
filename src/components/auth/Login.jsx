import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
// import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center min-h-screen mx-auto p-4'>
                <form
                    onSubmit={submitHandler}
                    className='w-full max-w-md border border-gray-200 rounded-md p-6 bg-white shadow-md'
                >
                    <h1 className='font-bold text-2xl mb-5'>Login</h1>
                    <div className='my-4'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Email"
                            className='mt-1'
                        />
                    </div>

                    <div className='my-4'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className='mt-1'
                        />
                    </div>
                    <div className='my-4'>
                        <Label className='block mb-2'>Role</Label>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    id="role-student"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="role-student" className="cursor-pointer">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    id="role-recruiter"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="role-recruiter" className="cursor-pointer">Recruiter</Label>
                            </div>
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className="w-full my-4 flex items-center justify-center" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Login</Button>
                        )
                    }
                    <span className='text-sm'>
                        Don't have an account? <Link to="/signup" className='text-blue-600 hover:underline'>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
