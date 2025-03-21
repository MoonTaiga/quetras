
import React from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText, Shield, Users } from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-muted">
          <Container>
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Welcome to <span className="text-primary">QUETRAS</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                Your complete tuition query tracking and resolution system
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button size="lg" asChild>
                  <Link to="/queries">
                    View Queries <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-background">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Query Management</h3>
                <p className="text-muted-foreground">Track and resolve student tuition queries efficiently</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Student Notifications</h3>
                <p className="text-muted-foreground">Keep students informed about their query status</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Comprehensive Reports</h3>
                <p className="text-muted-foreground">Generate detailed financial and query reports</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Secure System</h3>
                <p className="text-muted-foreground">Protected student and financial information</p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-muted">
          <Container>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Start Using QUETRAS Today</h2>
                <p className="text-muted-foreground mb-6">
                  Streamline your tuition query management process and improve student satisfaction
                  with our comprehensive tracking system.
                </p>
                <Button asChild>
                  <Link to="/register">Create an Account</Link>
                </Button>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative h-[300px] w-[400px] bg-card rounded-lg border flex items-center justify-center">
                  <div className="text-muted-foreground">Application Screenshot</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <footer className="py-8 border-t">
          <Container>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="font-bold text-lg">QUETRAS</h2>
                <p className="text-sm text-muted-foreground">Tuition Query Tracking System</p>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} QUETRAS. All rights reserved.
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </main>
  );
};

export default Home;
