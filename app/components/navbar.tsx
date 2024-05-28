import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white w-full py-6 shadow-md">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-3xl font-bold">
          <Link href="/">Bio-Health OKN</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/team" className="hover:underline">Team</Link>
          <Link href="/publications" className="hover:underline">Publications</Link>
          <Link href="/cypher-tool" className="hover:underline">Tool</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
