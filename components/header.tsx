import { BellIcon, CodeIcon, PlusCircleIcon, SearchIcon, UserIcon } from 'lucide-react'
import { Button } from './ui/button';

const Header = () => {
    return <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <CodeIcon className="w-6 h-6 text-white" />
                    <h1 className='text-white text-xl font-bold'>snipX</h1>
                </div>
                <div className="hidden md:flex items-center bg-gray-700 rounded-full px-4 py-2 flex-1 maxwmd\ mx-6">
                    <SearchIcon className="w-4 h-4 text-gray-400 mr-2" />
                    <input type="text" placeholder="Search" className="bg-transparent text-white outline-none flex-1" />
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                    className='flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300'
                    >
                        <PlusCircleIcon className="w-4 h-4 mr-2" />
                        <span className='hidden md:block'>New Snippet</span>
                    </Button>
                    <Button className='relative'>
                        <BellIcon className='w-4 h-4 text-white' />
                        <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full'></span>
                    </Button>
                    <Button className='flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300'>
                        <UserIcon className='w-4 h-4 mr-2' />
                        <span className='hidden md:block'>John Doe</span>
                    </Button>
                </div>
            </div>
        </div>

    </header>;
}
 
export default Header;