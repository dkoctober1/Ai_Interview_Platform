// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Spline from "@splinetool/react-spline";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

export default async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          {/* <title>Hirely</title> */}
          <div className="logo flex items-center gap-2 font-bold text-2xl">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1a2980]">
              H
            </div>
            Hirely
          </div>
          <Button
            asChild
            className="bg-white text-[#1a2980] rounded-full px-8 py-2 font-bold hover:bg-white/90"
          >
            {/* <Link href="/sign-in">Sign In</Link> */}
          </Button>
        </header>

        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/10 backdrop-blur-lg rounded-xl p-18 mb-12">
          <div className="hero-text">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Master Your Tech Interviews with AI-Powered Practice
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Practice with realistic interview questions, receive instant
              feedback, and improve your skills with personalized
              recommendations.
            </p>
            <Button
              asChild
              className="bg-white text-[#1a2980] rounded-full px-8 py-2 font-bold hover:bg-white/90 hover:translate-y-[-3px] hover:shadow-lg transition-all"
            >
              <Link href="/interview">Start Practicing Now</Link>
            </Button>
          </div>
          <div className="hero-image h-full w-full relative text-center">
            {/* <Image
              src="/robot.png"
              alt="AI interview assistant"
              width={400}
              height={300}
              className="mx-auto"
            /> */}
            <Spline
              scene="https://prod.spline.design/yE7LITKgx7EuMFCe/scene.splinecode"
              className="w-[500px] h-screen max-auto"
            />
            <div className="skill-bubble absolute top-[10%] left-[10%] bg-white text-[#1a2980] font-bold px-4 py-2 rounded-full text-sm animate-float">
              React
            </div>
            <div className="skill-bubble absolute top-[20%] right-[5%] bg-white text-[#1a2980] font-bold px-4 py-2 rounded-full text-sm animate-float animation-delay-500">
              Node.js
            </div>
            <div className="skill-bubble absolute bottom-[10%] right-[15%] mt-2 bg-white text-[#1a2980] font-bold px-4 py-2 rounded-full text-sm animate-float animation-delay-1000">
              JavaScript
            </div>
            <div className="skill-bubble absolute bottom-[10%] left-[20%] bg-white text-[#1a2980] font-bold px-4 py-2 rounded-full text-sm animate-float animation-delay-1500">
              Python
            </div>
          </div>
        </section>

        {/* Your Interviews Section - Kept exactly as you had it */}
        <section className="flex flex-col gap-6 mt-8">
          <h2>Your Interviews</h2>
          <div className="interviews-section">
            {hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <p>You haven&apos;t taken any interviews yet</p>
            )}
          </div>
        </section>

        {/* Take Interviews Section - Kept exactly as you had it */}
        <section className="flex flex-col gap-6 mt-8">
          <h2>Take Interviews</h2>
          <div className="interviews-section">
            {hasUpcomingInterviews ? (
              allInterview?.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <p>There are no interviews available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
