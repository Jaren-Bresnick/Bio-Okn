import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer'; // Import the Footer component

const About: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>About Us</title>
        <meta name="description" content="About Our Research Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Our Research Project</h2>
          
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            The true nature of health and disease involves complex interactions between biological, environmental, and social factors. Traditional biomedical knowledge graphs focus primarily on clinical and molecular data, often neglecting the critical influence of social determinants of health (SDoH) such as socioeconomic status, education, and employment. This research aims to bridge this gap by creating a comprehensive knowledge graph that integrates biomedical data with SDoH information, providing a more holistic view of health.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Integrating Biomedical and SDoH Knowledge</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              By incorporating SDoH data, we can uncover how non-clinical factors contribute to health outcomes. This integrated approach allows for the exploration of multifaceted pathways in human health, where &quot;nodes&quot; represent elements like genes, proteins, environmental factors, and social conditions, and &quot;edges&quot; illustrate the relationships among them. This enriched knowledge graph will enable researchers to identify novel interactions and mechanisms, offering deeper insights into diseases such as suicidality and PTSD.
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mb-4">Knowledge Graph Construction</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The knowledge graph is constructed using two primary datasets: MIMIC-3 medical records and PubMed abstracts.
            </p>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">PubMed Dataset</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              PubMed/PubMedCentral is a vast collection of abstracts and full-text articles encompassing the fields of life sciences and biomedicine. With a staggering count of 32 million documents, the dataset encompasses a diverse range of study types:
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 mb-4">
              <li>27.54% case reports</li>
              <li>23.61% series of randomized clinical trials (RCTs)</li>
              <li>21.05% cohort studies</li>
              <li>17.49% cross-sectional studies</li>
              <li>9.15% case-control studies</li>
              <li>1.01% non-RCTs</li>
              <li>0.15% pragmatic clinical trials (PCTs)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each article entry in PubMed includes essential data elements such as the title, abstract, author names, affiliations, publication date, journal information, and citation details.
            </p>

            <h4 className="text-2xl font-bold text-gray-800 mb-2">MIMIC Dataset</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              MIMIC (Medical Information Mart for Intensive Care) is a comprehensive and widely-used publicly available dataset that has significantly contributed to advancements in healthcare research and innovation. The MIMIC dataset comprises de-identified EHRs of patients admitted to critical care units, providing a rich and diverse collection of clinical data. This includes:
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 mb-4">
              <li>Vital signs</li>
              <li>Laboratory measurements</li>
              <li>Medications</li>
              <li>Procedures</li>
              <li>Clinical notes</li>
              <li>Demographic information</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              The MIMIC dataset has fostered numerous studies and advancements in critical care, clinical decision support systems, machine learning, and artificial intelligence in healthcare.
            </p>
          </div>

          <h3 className="text-3xl font-bold text-gray-800 mb-4">Use Cases of the Knowledge Graph</h3>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Here are some specific use cases demonstrating how our knowledge graph can be utilized in the field of healthcare. These use cases are crucial as they provide a comprehensive understanding of various interventions and their relationships, allowing healthcare professionals to make informed decisions and improve patient outcomes.
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex flex-col items-center w-1/2">
              <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                Subgraph Representing Methods of Suicide Prevention
              </p>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <img src="suicide2.png" alt="Knowledge Graph" className="w-full object-cover" style={{ height: "500px" }} />
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2">
              <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                Subgraph Representing PTSD Prevention
              </p>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <img src="ptsd.png" alt="PTSD Graph" className="w-full object-cover" style={{ height: "500px" }} />
              </div>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-gray-800 mb-4">Continual Learning</h3>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Continual learning is an essential aspect of our research project. By continuously updating the knowledge graph with new data from sources such as PubMed and MIMIC-3, we ensure that our insights remain current and relevant. This ongoing process enables our system to adapt to new discoveries and emerging trends in healthcare, ultimately leading to better patient care and more effective interventions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
