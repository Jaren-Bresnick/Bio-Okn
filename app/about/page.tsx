import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

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
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Our Research</h2>
          
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Our research explores the intricate interplay between biological, environmental, and social factors in determining health outcomes. We aim to bridge gaps in traditional biomedical research by integrating clinical, molecular, and social determinants of health (SDoH) data into comprehensive knowledge graphs. These efforts span multiple projects, each focused on addressing specific challenges within the healthcare domain, with the overarching goal of improving both individual and population-level health outcomes.
          </p>

          {/* Integrating Biomedical and SDoH Knowledge */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Integrating Biomedical and SDoH Knowledge</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our primary research initiative focuses on creating a holistic view of health by integrating biomedical data with social determinants of health (SDoH) information. Traditional biomedical knowledge graphs often neglect the critical influence of factors such as socioeconomic status, education, and employment. By incorporating these elements, we aim to uncover novel interactions and mechanisms underlying diseases, particularly those with complex etiologies like suicidality and PTSD.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This project leverages extensive datasets, including MIMIC-3 medical records and PubMed abstracts, to construct knowledge graphs that represent the multifaceted pathways in human health. These graphs provide researchers and healthcare professionals with deeper insights into how various factors interact to influence health outcomes.
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

          {/* Collaboration with Veterans Health Administration (VHA) */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Collaboration with Veterans Health Administration (VHA)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In collaboration with the Veterans Health Administration (VHA), our research delves into how social determinants of health (SDoH) influence mental health outcomes, particularly the risks of suicide and PTSD among veterans. Utilizing Veterans Health Administration (VHA) Electronic Health Records (EHR), we develop knowledge graphs that elucidate the contributions of SDoH to these critical health outcomes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              These knowledge graphs have significant applications at both the patient and population levels:
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 mb-4">
              <li>At the patient level, they help predict individual risk, informing treatment decisions and improving care quality.</li>
              <li>At the population level, they identify risk factors that can guide the allocation of resources and the development of targeted interventions.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              The ultimate goal of this collaboration is to develop clinical decision support tools that can be integrated into the EHR system, providing both patient-specific insights and aggregated data summaries to mental health providers and VA leadership.
            </p>
          </div>

          {/* VA Synthetic Data */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">VA Synthetic Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A critical component of our work with the VHA involves the use of VA synthetic data, created by MDClone under a VA contract. This synthetic data is designed to mimic real-world patterns found in VA healthcare data while preserving patient privacy, allowing for comprehensive research without the ethical and legal challenges associated with real patient data.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The use of synthetic data enables us to:
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 mb-4">
              <li>Conduct privacy-preserving research that does not expose actual patient information.</li>
              <li>Access and analyze data that may not be readily available due to privacy concerns.</li>
              <li>Enhance datasets with underrepresented groups or outcomes, allowing for more inclusive research.</li>
              <li>Perform temporal analysis to study trends and patterns in healthcare data over time.</li>
            </ul>
          </div>

          {/* Risks, Mitigations & Ethics Issues */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">VA Data Use - Risks, Mitigations & Ethics Issues</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              While synthetic data offers numerous advantages, it also comes with certain risks and ethical considerations. For instance, combining VA synthetic data with external data requires explicit permission under the VA Synthetic Data License Agreement. To mitigate this risk, we plan to seek approval from VA legal counsel and adhere to strict transparency and safety protocols.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our commitment to ethical research is further demonstrated through our use of literature reviews and the sharing of resources on data transparency. Key references guiding our approach include Gebru et al.'s "Datasheets for Datasets" and recent discussions on data and model transparency at NIH workshops.
            </p>
          </div>

          {/* Use Cases of the Knowledge Graph */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
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
          </div>

          {/* Continual Learning */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Continual Learning</h3>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              Continual learning is an essential aspect of our research project. By continuously updating the knowledge graph with new data from sources such as PubMed and MIMIC-3, we ensure that our insights remain current and relevant. This ongoing process enables our system to adapt to new discoveries and emerging trends in healthcare, ultimately leading to better patient care and more effective interventions.
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default About;
