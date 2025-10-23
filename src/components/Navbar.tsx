import Link from "next/link";

export default function Navbar() {
    return (
        <nav className=" text-neutral-900 shadow-sm">
            <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                <Link
                    className="text-2xl font-semibold"
                    href="/">BlogCMS</Link>
                <div className="flex gap-6">
                    <Link href="/dashboard" className="hover:text-gray-500">Dashboard</Link>
                    <Link href="/posts" className="hover:text-gray-500">Posts</Link>
                    <Link href="/categories" className="hover:text-gray-500">Categories</Link>
                    {/* <Link href="/dashboard" className="hover:text-gray-500">Dashboard</Link> */}
                </div>
            </div>
        </nav>
    )
}