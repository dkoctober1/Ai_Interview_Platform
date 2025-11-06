// components/InterviewCard.tsx
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-blue-400",
      Mixed: "bg-purple-400",
      Technical: "bg-green-400",
    }[normalizedType] || "bg-purple-400";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 transition-all hover:translate-y-[-5px] hover:shadow-xl w-full max-w-[320px]">
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 px-3 py-1 rounded-bl-lg rounded-tr-xl",
              badgeColor
            )}
          >
            <p className="text-white font-medium text-sm">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <div className="flex justify-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={70}
              height={70}
              className="rounded-full object-cover w-[70px] h-[70px]"
            />
          </div>

          {/* Interview Role */}
          <h3 className="mt-4 text-lg font-bold capitalize text-center">
            {role} Interview
          </h3>

          {/* Date & Score */}
          <div className="flex flex-row justify-center gap-4 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/calendar.svg"
                width={18}
                height={18}
                alt="calendar"
                className="invert"
              />
              <p className="text-sm">{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/star.svg"
                width={18}
                height={18}
                alt="star"
                className="invert"
              />
              <p className="text-sm">{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-4 text-xs opacity-90 text-center">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 mt-5">
          <DisplayTechIcons techStack={techstack} />
          <Button
            asChild
            className="bg-white text-[#1a2980] rounded-full px-4 py-1 font-bold hover:bg-white/90 text-sm"
          >
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
