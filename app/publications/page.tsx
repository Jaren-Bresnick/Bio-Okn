import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';

const publications = [
  {
    title: "Biomedical Knowledge Graphs and Social Determinants of Health",
    authors: "A. Name, B. Name, C. Name",
    journal: "Journal of Biomedical Informatics",
    year: 2024,
    link: "https://example.com/publication1",  // Add the actual link to the publication
  },
  {
    title: "Continual Learning for Biomedical Knowledge Graphs",
    authors: "D. Name, E. Name",
    journal: "IEEE Transactions on Biomedical Engineering",
    year: 2023,
    link: "https://example.com/publication2",  // Add the actual link to the publication
  },
  // Add more publications here
];

const Publications: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Publications</title>
        <meta name="description" content="Browse our research publications." />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="flex-1">
        <section id="publications" className="text-center py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Publications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {publications.map((pub, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {pub.title}
                    </a>
                  </h3>
                  <p className="text-gray-700 mb-2"><strong>Authors:</strong> {pub.authors}</p>
                  <p className="text-gray-700 mb-2"><strong>Journal:</strong> {pub.journal}</p>
                  <p className="text-gray-700"><strong>Year:</strong> {pub.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Publications;
