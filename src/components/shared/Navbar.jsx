import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User2, Menu, X, Home, Briefcase, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const NavLinks = () => (
        <ul className="flex flex-col md:flex-row items-center md:gap-5 space-y-4 md:space-y-0">
            {user && user.role === 'recruiter' ? (
                <>
                    <li><Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/admin/companies" onClick={toggleMenu}>Companies</Link></Button></li>
                    <li><Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/admin/jobs" onClick={toggleMenu}>Jobs</Link></Button></li>
                </>
            ) : (
                <>
                    <li><Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/" onClick={toggleMenu}>Home</Link></Button></li>
                    <li><Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/jobs" onClick={toggleMenu}>Jobs</Link></Button></li>
                    <li><Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/browse" onClick={toggleMenu}>Browse</Link></Button></li>
                </>
            )}
        </ul>
    )

    const MobileUserSection = () => (
        <div className="">
            <div className="flex flex-col space-y-4">
                {!user ? <>
                    <div className="flex flex-col items-center space-y-2">
                        <Button variant="link" asChild>
                            <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
                        </Button>
                        <Button variant="link" asChild>
                            <Link to="/login" onClick={toggleMenu}>Log In</Link>
                        </Button>  
                    </div>
                    <NavLinks/>
                    </> : (
                    (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                </Avatar>
                                <div className="flex flex-col">
                                    <h4 className="font-medium text-lg">{user?.fullname}</h4>
                                    <p className="text-sm text-gray-600">{user?.profile?.bio || "No bio available"}</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {user.role === 'student' && (
                                    <Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/profile" onClick={toggleMenu}>View Profile</Link></Button>
                                )}
                                {user && user.role === 'recruiter' ? (
                    <>
                        <Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/admin/companies" onClick={toggleMenu}>Companies</Link></Button>
                        <Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/admin/jobs" onClick={toggleMenu}>Jobs</Link></Button>
                    </>
                ) : (
                    <>
                        <Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/" onClick={toggleMenu}>Home</Link></Button>
                        <Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/jobs" onClick={toggleMenu}>Jobs</Link></Button>
                        <Button variant="link" className="text-gray-800 hover:text-gray-600" asChild><Link to="/browse" onClick={toggleMenu}>Browse</Link></Button>
                    </>
                )}
                                <Button variant="link" className="text-gray-800 hover:text-gray-600" onClick={logoutHandler}>Logout</Button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )

    return (
        <div className='bg-white shadow-md relative z-50'>
            <div className='flex flex-wrap items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <Link to={"/"}>
                        <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                    </Link>
                </div>
                <div className='md:hidden'>
                    <Button onClick={toggleMenu} variant="ghost">
                        {isMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
                <div className={`w-full md:w-auto md:flex md:items-center md:gap-12 ${isMenuOpen ? 'block backdrop-blur-md bg-white/30' : 'hidden'} md:flex`}>
                    <div className="md:hidden my-4">
                        <MobileUserSection />
                    </div>
                    <div className="hidden md:block"><NavLinks /></div>
                    <div className="hidden md:block">
                        {!user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )}
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
