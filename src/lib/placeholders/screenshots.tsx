import Image from 'next/image';

export function DMSimulator() {
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-border">
      <div className="bg-muted p-4 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="bg-background p-6">
        <h3 className="text-lg font-semibold mb-4">DM Simulation Practice</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="bg-card p-3 rounded">
            AI: "Hi! I saw your profile and wanted to reach out..."
          </div>
          <div className="bg-primary/10 p-3 rounded ml-8">
            You: "Thanks for reaching out! What can I help with?"
          </div>
          <div className="bg-card p-3 rounded">
            AI: "I'm interested in learning more about your product..."
          </div>
        </div>
      </div>
    </div>
  );
}

export function ColdCallSimulator() {
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-border">
      <div className="bg-muted p-4 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="bg-background p-6">
        <h3 className="text-lg font-semibold mb-4">Cold Call Training</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              📞
            </div>
            <div className="flex-1">
              <p className="font-medium">Practice Call #47</p>
              <p className="text-sm text-muted-foreground">Duration: 3:24</p>
            </div>
          </div>
          <div className="bg-card p-3 rounded text-sm">
            <p className="font-medium mb-2">AI Feedback:</p>
            <p className="text-muted-foreground">
              Great opener! Consider adding more value proposition in the first 30 seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KnowledgeQuiz() {
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-border">
      <div className="bg-muted p-4 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="bg-background p-6">
        <h3 className="text-lg font-semibold mb-4">Product Knowledge Quiz</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-3">What are the three main features of our enterprise plan?</p>
            <div className="space-y-2">
              <div className="p-3 rounded border border-border hover:border-primary cursor-pointer transition-colors">
                A) Basic, Standard, Premium
              </div>
              <div className="p-3 rounded border-2 border-primary bg-primary/5">
                B) AI Training, Analytics, Custom Integration ✓
              </div>
              <div className="p-3 rounded border border-border hover:border-primary cursor-pointer transition-colors">
                C) Support, Updates, Storage
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Score: 8/10 (80%)
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrainingReport() {
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-border">
      <div className="bg-muted p-4 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="bg-background p-6">
        <h3 className="text-lg font-semibold mb-4">Training Performance</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-3 rounded">
              <p className="text-2xl font-bold">92%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="bg-card p-3 rounded">
              <p className="text-2xl font-bold">47</p>
              <p className="text-sm text-muted-foreground">Sessions Completed</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Product Knowledge</span>
              <span className="font-medium">95%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[95%]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sales Technique</span>
              <span className="font-medium">88%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[88%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}