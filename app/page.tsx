import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from './components/navbar';
import Footer from './components/footer'; // Import the Footer component

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Head>
        <title>Research Project</title>
        <meta name="description" content="Research Project Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        <section id="hero" className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
          <div className="flex items-center justify-center h-full bg-gray-800 bg-opacity-50">
            <div className="text-center px-6">
              <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
                A Dynamically-Updated Open Knowledge Network for Health
              </h1>
              <p className="text-2xl font-light mb-6 text-white">
                Integrating Biomedical Insights With Social Determinants of Health
              </p>
              <a href="/about" className="bg-blue-500 text-white py-3 px-8 rounded-full font-semibold transition duration-300 hover:bg-blue-400">
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
