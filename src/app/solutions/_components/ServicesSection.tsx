// import { IntroTitle } from "@/components/IntroTitle";
// import { FeatureSimpleCard } from "@/components/Card/FeatureSimpleCard";
// import { Settings, FileCheck, Puzzle, Headphones } from "lucide-react";

// const services = [
//   {
//     title: "Customized Implementation",
//     description: "We assess your unique business requirements to configure GoHighLevel for optimal performance.",
//     icon: <Settings className="w-6 h-6" />,
//   },
//   {
//     title: "Data Migration",
//     description: "Seamlessly transfer existing customer data into the new system, ensuring continuity and data integrity.",
//     icon: <FileCheck className="w-6 h-6" />,
//   },
//   {
//     title: "Workflow Automation",
//     description: "Develop automated processes to enhance efficiency and reduce manual tasks.",
//     icon: <Puzzle className="w-6 h-6" />,
//   },
//   {
//     title: "Training and Support",
//     description: "Equip your team with the knowledge and tools to effectively utilize the platform, with ongoing assistance as needed.",
//     icon: <Headphones className="w-6 h-6" />,
//   },
// ];

// export function ServicesSection() {
//   return (
//     <section className="bg-gray-50 py-24">
//       <div className="container">
//         <IntroTitle
//           heading="Our Services"
//           title="End-to-end GoHighLevel CRM Setup Services"
//           size="lg"
//           className="mb-16 text-center"
//         />
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {services.map((service, index) => (
//             <FeatureSimpleCard
//               key={index}
//               index={index}
//               title={service.title}
//               description={service.description}
//               icon={service.icon}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
