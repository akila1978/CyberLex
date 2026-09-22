"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from "lucide-react";

interface Question {
  id: number;
  question: string;
  topic: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Under the CFAA and the precedent set in Van Buren v. United States (2021), when does an individual 'exceed authorized access'?",
    topic: "Ethical Hacking & Cybercrime",
    options: [
      "Whenever they violate an employer's internal policy or website terms of service",
      "Only when they access information on a computer system that they were not entitled under any circumstance to obtain",
      "Whenever they run an automated vulnerability scanner against an IP address",
      "Whenever they copy proprietary data to an external USB flash drive",
    ],
    correctIndex: 1,
    explanation:
      "In Van Buren v. United States (2021), the US Supreme Court resolved a circuit split by holding that a person 'exceeds authorized access' only when accessing information on a computer system that the person is not entitled to obtain, rejecting the notion that simple terms-of-service violations trigger criminal CFAA liability.",
  },
  {
    id: 2,
    question: "Under the GDPR (Article 33), within how many hours must a data controller report a personal data breach to the supervisory authority after becoming aware of it?",
    topic: "Data Protection",
    options: ["24 hours", "48 hours", "72 hours", "30 business days"],
    correctIndex: 2,
    explanation:
      "GDPR Article 33(1) establishes that in the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the competent supervisory authority.",
  },
  {
    id: 3,
    question: "Under Sri Lanka's Personal Data Protection Act No. 9 of 2022, what is the apex statutory regulatory body established to enforce compliance?",
    topic: "Sri Lanka Cyber Law",
    options: [
      "Sri Lanka Telecom Regulatory Commission (TRCSL)",
      "Data Protection Authority of Sri Lanka (DPA)",
      "Cyber Security Regulatory Authority (CSRA)",
      "Information and Communication Technology Agency (ICTA)",
    ],
    correctIndex: 1,
    explanation:
      "The Data Protection Authority of Sri Lanka (DPA), established under Part V of Act No. 9 of 2022, is the independent regulatory body empowered to issue directives, conduct investigations, and sanction non-compliant controllers and processors.",
  },
  {
    id: 4,
    question: "What is the primary function of establishing an unbroken 'Chain of Custody' in digital forensics?",
    topic: "Digital Evidence",
    options: [
      "To increase the processing speed of hard drive bit-stream imaging",
      "To legally prove that digital evidence was not altered, substituted, or tampered with between seizure and courtroom trial",
      "To encrypt forensic images with AES-256 for transmission over open internet",
      "To obtain a search warrant post-facto from an investigating magistrate",
    ],
    correctIndex: 1,
    explanation:
      "Chain of custody provides meticulous chronological documentation of physical or digital transfer and possession, ensuring judges and juries can verify that evidence admitted into court is identical to what was seized at the crime scene.",
  },
];

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Interactive Knowledge Quiz" }]} className="mb-8" />

        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Knowledge Assessment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) tracking-tight font-heading mb-4">
            Cyber Law & Online Safety Quiz
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Test your understanding of international statutes, precedent case rulings, breach notification timelines, and digital forensics principles.
          </p>
        </div>

        {completed ? (
          <div className="p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-(--primary)/10 text-(--primary) flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-(--foreground) font-heading mb-2">
              Quiz Completed!
            </h2>
            <p className="text-lg text-(--muted-foreground) mb-6">
              You scored <span className="font-bold text-(--foreground)">{score}</span> out of{" "}
              <span className="font-bold text-(--foreground)">{quizQuestions.length}</span> (
              {Math.round((score / quizQuestions.length) * 100)}%)
            </p>
            <Button variant="primary" onClick={handleRestart} className="inline-flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </Button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm">
            <div className="flex justify-between items-center mb-4 text-xs text-(--muted-foreground)">
              <span className="font-semibold text-(--primary)">{currentQ.topic}</span>
              <span>
                Question {currentIdx + 1} of {quizQuestions.length}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-(--foreground) font-heading mb-6 leading-snug">
              {currentQ.question}
            </h2>

            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, idx) => {
                let btnStyle = "border-(--border-color) hover:border-(--primary)/50 bg-(--card-bg)";

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                  } else if (idx === selectedOption) {
                    btnStyle = "border-red-500 bg-red-500/10 text-red-400";
                  } else {
                    btnStyle = "border-(--border-color) opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="p-4 rounded-xl bg-(--primary)/5 border border-(--primary)/20 mb-6 text-xs text-(--muted-foreground) leading-relaxed">
                <strong className="text-(--foreground) block mb-1">Statutory Explanation:</strong>
                {currentQ.explanation}
              </div>
            )}

            {isAnswered && (
              <div className="flex justify-end">
                <Button variant="primary" onClick={handleNext} className="inline-flex items-center gap-2">
                  <span>{currentIdx < quizQuestions.length - 1 ? "Next Question" : "View Results"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
