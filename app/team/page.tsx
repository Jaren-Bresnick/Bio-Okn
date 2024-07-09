import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';

const teamMembers = [
  {
    name: "Aidong Zhang",
    title: "Principal Investigator",
    school: "University of Virginia",
    image: "zhang.jpeg",
    link: "https://engineering.virginia.edu/faculty/aidong-zhang"
  },
  {
    name: "Kishlay Jha",
    title: "Principal Investigator",
    school: "University of Iowa",
    image: "jha.jpeg",
    link: "https://engineering.uiowa.edu/directory/kishlay-jha"
  },
  {
    name: "Amir Shariatmadari ",
    title: "PhD Student",
    school: "University of Virginia",
    image: "",
    link: ""
  },
  {
    name: "Shailesh Dahal",
    title: "PhD Student",
    school: "University of Iowa",
    image: "",
    link: ""
  },
  {
    name: "Lei Gong",
    title: "PhD Student Student",
    school: "University of Virginia",
    image: "",
    link: ""
  },
  {
    name: " Sneha Srinivasan",
    title: "Masters Student",
    school: "University of Virginia",
    image: "",
    link: ""
  },
  {
    name: "Jaren Bresnick",
    title: "Undergraduate Researcher",
    school: "University of Virginia",
    image: "",
    link: ""
  },
  

];

const Team: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Our Team</title>
        <meta name="description" content="Meet our research team." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-64 h-64 mx-auto mb-6 object-cover rounded-lg"
                  style={member.name === "Kishlay Jha" ? { objectPosition: 'top' } : {}}
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  <a href={member.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {member.name}
                  </a>
                </h3>
                <p className="text-gray-700 mb-2">{member.title}</p>
                <p className="text-gray-700">{member.school}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Team;
