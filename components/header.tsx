'use client';

import { BellIcon, CodeIcon, PlusCircleIcon, SearchIcon, UserIcon } from 'lucide-react'
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { ModalContext } from './snippet-modal-wrapper';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { handleSignOut } from '@/app/actions/auth-actions';

interface HeaderProps {
    initialUser?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
}

const Header = ({ initialUser }: HeaderProps) => {
    const user = initialUser;
    const { openModal } = useContext(ModalContext);

    const handleNewSnippet = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openModal();
    };

    return (
        <header className="bg-gray-800 border-b border-gray-700 z-10 relative">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                <Link href='/'>
                    <div className="flex items-center space-x-2">
                        <CodeIcon className="w-6 h-6 text-white" />
                        <h1 className='text-white text-xl font-bold'>snipX</h1>
                    </div>
                    </Link>
                    <div className="hidden md:flex items-center bg-gray-700 rounded-full px-4 py-2 flex-1 maxwmd\ mx-6">
                        <SearchIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <input type="text" placeholder="Search" className="bg-transparent text-white outline-none flex-1" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={handleNewSnippet}
                            className='flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300'
                        >
                            <PlusCircleIcon className="w-4 h-4 mr-2" />
                            <span className='hidden md:block'>New Snippet</span>
                        </Button>
                        <Button className='relative'>
                            <BellIcon className='w-4 h-4 text-white' />
                            <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full'></span>
                        </Button>
                        
                        {user ? (
                            // <div className="relative group">
                            //     <Button className='flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300'>
                            //         {user.image && (
                            //             <div className="relative w-6 h-6 mr-2">
                            //                 <Image 
                            //                     src={user.image} 
                            //                     alt={user.name || "User"} 
                            //                     className="rounded-full"
                            //                     fill
                            //                     sizes="24px"
                            //                 />
                            //             </div>
                            //         )}
                            //         {!user.image && <UserIcon className='w-4 h-4 mr-2' />}
                            //         <span className='hidden md:block'>{user.name || "User"}</span>
                            //     </Button>
                            //     <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            //         <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                            //             Profile
                            //         </Link>
                            //         <Link href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                            //             Settings
                            //         </Link>
                            //         <form action={handleSignOut}>
                            //             <button type="submit" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                            //                 Sign out
                            //             </button>
                            //         </form>
                            //     </div>
                            // </div>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className='flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300'>
                                        {user.image && (
                                        <div className="relative w-6 h-6 mr-2">
                                            <Image 
                                                src={user.image} 
                                                alt={user.name || "User"} 
                                                className="rounded-full"
                                                fill
                                                sizes="24px"
                                            />
                                        </div>
                                    )}
                                    {!user.image && <UserIcon className='w-4 h-4 mr-2' />}
                                    <span className='hidden md:block'>{user.name || "User"}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Link href="/profile">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/settings">Settings</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <form action={handleSignOut}>
                                                <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                                    Sign out
                                                </button>
                                            </form>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button className='flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300'>
                                    <UserIcon className='w-4 h-4 mr-2' />
                                    <span className='hidden md:block'>Sign In</span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
 
export default Header;