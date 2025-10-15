'use client';

import {
  MessageSquare,
  Mic,
  FileText,
  Send,
  Phone,
  Bot,
  User,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const ScreenshotFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const frameClasses = cn(
    'bg-slate-800/50 backdrop-blur-xl border border-sky-300/20 rounded-xl shadow-2xl shadow-sky-500/10 overflow-hidden h-full flex flex-col',
    className
  );
  return (
    <div className={frameClasses}>
      <div className="p-2 bg-slate-900/50 flex items-center gap-1.5 flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="p-6 flex-grow flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export const DMSimulator = () => (
  <ScreenshotFrame>
    <div className="flex flex-col items-center text-center">
      <MessageSquare className="w-16 h-16 text-sky-300 mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">DM Simulation</h3>
      <p className="text-slate-400 text-sm mb-6">
        Practice handling objections and closing deals in a realistic text-based
        environment.
      </p>
      <Button className="bg-sky-400 text-slate-900 font-bold hover:bg-sky-300">
        Start New Simulation
      </Button>
    </div>
  </ScreenshotFrame>
);

export const ColdCallSimulator = () => (
  <ScreenshotFrame>
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <Phone className="w-8 h-8 text-turquoise-300" />
        <h3 className="text-lg font-bold text-white">
          Cold Call Scenario: Inbound Lead
        </h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-sky-400 flex-shrink-0" />
          <p className="bg-slate-700/50 p-2 rounded-md text-sm text-slate-300">
            "Hi, I saw your ad and I'm interested in learning more about your
            product."
          </p>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <p className="bg-sky-500/20 p-2 rounded-md text-sm text-sky-200">
            "Great! I can certainly help with that. What specifically caught your
            eye?"
          </p>
          <User className="w-6 h-6 text-sky-200 flex-shrink-0" />
        </div>

        <div className="flex items-center gap-2 pt-4">
          <Mic className="w-5 h-5 text-turquoise-300 animate-pulse" />
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-turquoise-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </ScreenshotFrame>
);

export const KnowledgeQuiz = () => (
  <ScreenshotFrame>
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <BookOpen className="w-8 h-8 text-sky-300" />
        <h3 className="text-xl font-bold text-white">
          Product Knowledge Assessment
        </h3>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-slate-700/50">
          <p className="text-sm text-slate-400 mb-1">Module 1: Core Features</p>
          <Progress value={80} className="h-2 [&>div]:bg-sky-400" />
        </div>
        <div className="p-4 rounded-lg bg-slate-700/50">
          <p className="text-sm text-slate-400 mb-1">Module 2: Pricing Tiers</p>
          <Progress value={60} className="h-2 [&>div]:bg-sky-400" />
        </div>
        <div className="p-4 rounded-lg bg-slate-900/80 border border-sky-400/50">
          <p className="font-bold text-white mb-3">
            Q: Which plan includes the "Camp/AI/gn" tool?
          </p>
          <div className="space-y-2 text-sm">
            <div className="p-2 rounded bg-slate-700 text-slate-300">A. Basic</div>
            <div className="p-2 rounded bg-sky-500/20 text-white font-semibold">
              B. Premium
            </div>
            <div className="p-2 rounded bg-slate-700 text-slate-300">
              C. Enterprise
            </div>
          </div>
        </div>
      </div>
    </div>
  </ScreenshotFrame>
);

export const TrainingReport = () => (
  <ScreenshotFrame>
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <FileText className="w-8 h-8 text-turquoise-300" />
        <h3 className="text-xl font-bold text-white">Your Weekly Report</h3>
      </div>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
          <p className="text-slate-300">Simulations Completed</p>
          <p className="font-bold text-white">12</p>
        </div>
        <div className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
          <p className="text-slate-300">Average Score</p>
          <p className="font-bold text-white">88%</p>
        </div>
        <div className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
          <p className="text-slate-300">Most Improved Area</p>
          <p className="font-bold text-white">Objection Handling</p>
        </div>
      </div>
      <Button className="w-full mt-6 bg-turquoise-500 text-slate-900 font-bold hover:bg-turquoise-400">
        <Send className="w-4 h-4 mr-2" />
        Send Report to Team
      </Button>
    </div>
  </ScreenshotFrame>
);
