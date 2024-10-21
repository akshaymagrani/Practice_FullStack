export default function Navigation() {
    return (
        <nav className="w-screen rounded-b-sm">
            <ul className="flex justify-center fixed top-0 bg-white w-full"> 
            {/* Home, About, Services, Contact */}
                <li className="p-3"><a href="#" className="text-black hover:text-black hover:font-bold hover:underline">Home</a></li>
                <li className="p-3"><a href="#" className="text-black hover:text-black hover:font-bold hover:underline">Services</a></li>
                <li className="p-3"><a href="#" className="text-black hover:text-black hover:font-bold hover:underline">About</a></li>
                <li className="p-3"><a href="#" className="text-black hover:text-black hover:font-bold hover:underline">Contact</a></li>
            </ul>
        </nav>
    )
}