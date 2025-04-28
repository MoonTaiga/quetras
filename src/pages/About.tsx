
import React from "react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/Logo";

const About = () => {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 page-container animate-fade-in">
        <Container as="section" className="py-12 max-w-4xl mx-auto" withGlass={false}>
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <Logo className="h-24 w-24 text-sky-600 transition-all hover:scale-110" />
            </div>
            <h1 className="text-4xl font-bold text-sky-800 mb-4">About QUETRAS</h1>
            <p className="text-lg text-sky-600 max-w-2xl mx-auto">
              Query Tracking and Response System for Educational Institutions
            </p>
          </div>

          <div className="glass p-8 rounded-xl mb-10 transition-all hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">Our Mission</h2>
            <p className="mb-6 text-gray-700">
              QUETRAS is designed to streamline the process of tracking and managing student queries related to 
              tuition payments, academic matters, and administrative requests in educational institutions.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-sky-700">What We Offer</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-sky-50 p-5 rounded-lg transition-all hover:bg-sky-100 hover:scale-[1.02]">
                <h3 className="font-medium text-xl mb-2 text-sky-800">For Students</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Easy query submission</li>
                  <li>Real-time status tracking</li>
                  <li>Notification system</li>
                </ul>
              </div>
              
              {/* <div className="bg-sky-50 p-5 rounded-lg transition-all hover:bg-sky-100 hover:scale-[1.02]">
                <h3 className="font-medium text-xl mb-2 text-sky-800">For Administrators</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Comprehensive dashboard</li>
                  <li>Query management tools</li>
                  <li>Analytics and reporting</li>
                  <li>User management system</li>
                </ul>
              </div> */}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-sky-100 to-white p-8 rounded-xl shadow-sm transition-all hover:shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-sky-700 text-center">How It Works</h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              <li className="transition-all hover:translate-x-1">
                <strong>Register an account</strong> - Create your personal profile with a unique ID
              </li>
              <li className="transition-all hover:translate-x-1">
                <strong>Submit a query</strong> - Provide details about your tuition payment or academic request
              </li>
              <li className="transition-all hover:translate-x-1">
                <strong>Track status</strong> - Monitor the progress of your query through the dashboard
              </li>
              <li className="transition-all hover:translate-x-1">
                <strong>Receive updates</strong> - Get notified when your query status changes
              </li>
              
            </ol>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default About;
