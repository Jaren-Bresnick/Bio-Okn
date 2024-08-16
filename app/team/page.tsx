import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';

const virginiaIowaTeam = [
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
    title: "PhD Student",
    school: "University of Virginia",
    image: "",
    link: ""
  },
  {
    name: "Sneha Srinivasan",
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
  }
];

const delawareVATeam = [
  {
    name: "Cathy Wu",
    title: "Co-Principal Investigator",
    school: "University of Delaware",
    image: "",  
    link: ""
  },
  {
    name: "Rahmatollah Beheshti",
    title: "Co-Principal Investigator",
    school: "University of Delaware",
    image: "",  
    link: ""
  },
  {
    name: "Chuming Chen",
    title: "Senior Personnel",
    school: "University of Delaware",
    image: "",  
    link: ""
  },
  {
    name: "Thomas Powers",
    title: "Senior Personnel",
    school: "University of Delaware",
    image: "", 
    link: ""
  },
  {
    name: "Suzanne Milbourne",
    title: "Collaborator",
    school: "Veterans Health Administration",
    image: "",  
    link: ""
  },
  {
    name: "Joshua Rolnick",
    title: "Collaborator",
    school: "Veterans Health Administration",
    image: "",  
    link: ""
  }
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

          {/* University of Virginia/University of Iowa */}
          <h3 className="text-3xl font-bold text-gray-800 mb-8">University of Virginia / University of Iowa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {virginiaIowaTeam.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-64 h-64 mx-auto mb-6 object-cover rounded-lg"
                    style={member.name === "Kishlay Jha" ? { objectPosition: 'top' } : {}}
                  />
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.link ? (
                    <a href={member.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {member.name}
                    </a>
                  ) : (
                    member.name
                  )}
                </h3>
                <p className="text-gray-700 mb-2">{member.title}</p>
                <p className="text-gray-700">{member.school}</p>
              </div>
            ))}
          </div>

          {/* University of Delaware/VA Health */}
          <h3 className="text-3xl font-bold text-gray-800 mb-8">University of Delaware / Veterans Health Administration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {delawareVATeam.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-64 h-64 mx-auto mb-6 object-cover rounded-lg"
                  />
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.link ? (
                    <a href={member.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {member.name}
                    </a>
                  ) : (
                    member.name
                  )}
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
