
import {
  Linkedin,
  BrainCircuit,
  Share2,
  TrendingUp,
  type LucideIcon,
  Cpu,
  Bot,
  ScanSearch,
  Instagram,
  FolderSync,
  Layers,
  Briefcase,
  UserPlus,
} from 'lucide-react';

export const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'Company',
    children: [
      {
        label: 'About',
        href: '/about',
      },
      {
        label: 'News',
        href: '/company/news',
      },
      {
        label: 'Careers',
        href: '/company/careers',
      },
      {
        label: 'My Huxleigh',
        href: '/company/staff',
      }
    ],
  },
  {
    label: 'Business Solutions',
    children: [
      {
        label: 'Trainer Software',
        href: '/business-solutions/trainer-software',
      },
    ],
  },
  {
    label: 'Marketing Products',
    children: [
      {
        label: 'Delture',
        href: '/marketing-products/delture',
      },
      {
        label: 'Stratavue',
        href: '/marketing-products/stratavue',
      },
    ],
  },
  { href: '/contact', label: 'Contact' },
];

export const socialLinks = [
  {
    icon: Instagram,
    href: 'https://instagram.com/huxleighgroup',
    name: 'Instagram',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/huxleigh',
    name: 'LinkedIn',
  },
];

type Solution = {
  title: string;
  icon: LucideIcon;
  description: string;
  useCases: string[];
  integration: string;
  imageId: string;
};

export const solutions: Solution[] = [
  {
    title: 'Predictive Analytics',
    icon: TrendingUp,
    description:
      'Leverage machine learning to forecast trends, identify opportunities, and mitigate risks. Our predictive analytics engine turns historical data into actionable insights.',
    useCases: [
      'Demand Forecasting',
      'Customer Churn Prediction',
      'Financial Modeling',
      'Fraud Detection',
    ],
    integration:
      'Integrate via our flexible REST API or use our Python/JS SDKs for seamless implementation. Our platform supports batch processing and real-time analysis pipelines.',
    imageId: 'solution-analytics',
  },
  {
    title: 'Natural Language Processing (NLP)',
    icon: BrainCircuit,
    description:
      'Unlock the value in unstructured text data. Our NLP solutions can understand, interpret, and generate human language, enabling powerful applications.',
    useCases: [
      'Sentiment Analysis',
      'Automated Summarization',
      'Chatbots & Virtual Assistants',
      'Named Entity Recognition',
    ],
    integration:
      'Access our pre-trained models or deploy custom ones through a simple API call. Supported formats include JSON for text input and provides structured data output.',
    imageId: 'solution-nlp',
  },
  {
    title: 'Computer Vision',
    icon: ScanSearch,
    description:
      "Automate tasks and gain insights from images and videos. Huxleigh's computer vision platform offers state-of-the-art accuracy and performance.",
    useCases: [
      'Object Detection & Tracking',
      'Facial Recognition',
      'Medical Image Analysis',
      'Automated Quality Control',
    ],
    integration:
      'Submit images or video streams to our API endpoints. Our service handles scaling and processing, returning structured data like bounding boxes and classifications.',
    imageId: 'solution-vision',
  },
  {
    title: 'Custom AI Models',
    icon: Cpu,
    description:
      'Have a unique challenge? Our team of AI experts will partner with you to design, build, and deploy a bespoke AI model tailored to your specific needs.',
    useCases: [
      'Personalized Recommendation Engines',
      'Anomaly Detection Systems',
      'Process Optimization',
      'Specialized Data Analysis',
    ],
    integration:
      'We provide a fully managed deployment, with integration options ranging from dedicated API endpoints to on-premise solutions for maximum security and control.',
    imageId: 'solution-custom',
  },
];

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageId: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Jane Doe',
    role: 'Chief Executive Officer',
    bio: 'With over 20 years of experience in the tech industry, Jane is a visionary leader dedicated to harnessing AI for global good. Her passion for innovation drives the company forward.',
    imageId: 'team-jane-doe',
  },
  {
    name: 'John Smith',
    role: 'Chief Technology Officer',
    bio: 'John is the architectural mastermind behind our cutting-edge AI platforms. A renowned expert in machine learning and distributed systems, he ensures our technology remains state-of-the-art.',
    imageId: 'team-john-smith',
  },
  {
    name: 'Emily White',
    role: 'VP of Product',
    bio: 'Emily bridges the gap between customer needs and technological possibilities. Her focus on user-centric design ensures our solutions are not just powerful, but also intuitive and impactful.',
    imageId: 'team-emily-white',
  },
  {
    name: 'Michael Brown',
    role: 'Head of AI Research',
    bio: 'Dr. Brown leads our team of researchers in exploring the next frontier of artificial intelligence. His work has been published in numerous academic journals and has pushed the industry forward.',
    imageId: 'team-michael-brown',
  },
];

type SuccessStory = {
  client: string;
  industry: string;
  quote: string;
  problem: string;
  solution: string;
  outcome: string;
  imageId: string;
};

export const successStories: SuccessStory[] = [
  {
    client: 'FinSecure',
    industry: 'FinTech',
    quote:
      "Huxleigh's predictive analytics transformed our fraud detection, reducing false positives by 60% and saving us millions.",
    problem:
      'High rates of fraudulent transactions and a slow, manual review process were impacting customer satisfaction and revenue.',
    solution:
      'We implemented a real-time fraud detection model using Huxleigh’s predictive analytics engine, trained on millions of historical transactions.',
    outcome:
      'Reduced fraudulent transactions by 40%, decreased manual review time by 75%, and significantly improved customer trust.',
    imageId: 'story-fintech',
  },
  {
    client: 'HealthPlus Diagnostics',
    industry: 'HealthTech',
    quote:
      'The computer vision API for medical imaging has been a game-changer, enabling our radiologists to detect anomalies with 99.5% accuracy.',
    problem:
      'Radiologists were overwhelmed with the volume of scans, leading to burnout and a risk of missed diagnoses.',
    solution:
      "Huxleigh's computer vision solution was trained to identify specific markers in medical scans, highlighting areas of interest for radiologists to review.",
    outcome:
      'Increased diagnostic speed by 2x, improved detection accuracy, and allowed doctors to focus on the most critical cases.',
    imageId: 'story-healthtech',
  },
  {
    client: 'ShopSphere',
    industry: 'E-commerce',
    quote:
      'The custom recommendation engine from Huxleigh increased our average order value by 30% within the first quarter.',
    problem:
      'Our generic recommendation system was failing to engage users, leading to low conversion rates and cart abandonment.',
    solution:
      'A bespoke recommendation engine was developed, analyzing user behavior in real-time to provide highly personalized product suggestions.',
    outcome:
      'Achieved a 30% increase in AOV, a 25% lift in user engagement, and a 15% reduction in cart abandonment rates.',
    imageId: 'story-ecommerce',
  },
];

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageId: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-rise-of-generative-ai',
    title: 'The Rise of Generative AI: Reshaping Industries',
    excerpt:
      'Explore how generative AI is moving beyond novelty to become a cornerstone of modern business, from content creation to drug discovery.',
    date: '2023-10-26',
    author: 'Jane Doe',
    imageId: 'blog-ai-ethics',
    content:
      "Generative AI is no longer a futuristic concept; it's a transformative force reshaping industries. From automating creative workflows to accelerating scientific research, its applications are vast and growing. This article delves into the core technologies powering this revolution, including transformers and diffusion models, and examines real-world case studies where generative AI is creating unprecedented value. We also discuss the ethical considerations and the importance of responsible development as this technology becomes more integrated into our daily lives.",
  },
  {
    slug: 'ai-and-the-future-of-work',
    title: 'Navigating the New Normal: AI and the Future of Work',
    excerpt:
      'How will AI augment human capabilities in the workplace? We discuss the shift from automation to augmentation and what it means for the workforce.',
    date: '2023-10-15',
    author: 'John Smith',
    imageId: 'blog-future-of-work',
    content:
      'The conversation around AI in the workplace is shifting from one of replacement to one of collaboration. This post explores the concept of "augmented intelligence," where AI tools act as powerful assistants, amplifying human creativity, problem-solving, and efficiency. We look at specific roles and industries where this synergy is already taking hold and provide a framework for businesses to prepare their teams for a future where human-AI partnership is the new normal. The key is not to fear automation, but to embrace augmentation.',
  },
  {
    slug: 'quantum-computing-and-ai',
    title: 'The Quantum Leap: How Quantum Computing Will Revolutionize AI',
    excerpt:
      'Quantum computing promises to solve problems currently intractable for classical computers. What does this mean for the future of artificial intelligence?',
    date: '2023-09-28',
    author: 'Michael Brown',
    imageId: 'blog-quantum-computing',
    content:
      "While still in its early stages, quantum computing holds the potential to unlock a new paradigm in artificial intelligence. By leveraging principles like superposition and entanglement, quantum computers can process information in fundamentally new ways. This could supercharge machine learning algorithms, enabling the solution of complex optimization problems in fields like drug discovery, materials science, and financial modeling that are beyond the reach of today's supercomputers. We explore the current state of quantum hardware and the development of quantum machine learning algorithms.",
  },
];

type NewsItem = {
  title: string;
  date: string;
  content: string;
  icon: LucideIcon;
};

export const newsItems: NewsItem[] = [
  {
    title: 'File storage is live on all Huxleigh Marketing Products.',
    date: '2025-09-22',
    content:
      'Delture Social Suite & Stratavue, two marketing software products, now support local file storage to further streamline user productivity, organization, and workflow.',
    icon: FolderSync,
  },
  {
    title: 'Camp/AI/gn arrives at Delture Social Suite.',
    date: '2025-09-18',
    content:
      'Delture Social Suite, the AI-backed Greek Life marketing app, has finally received integration with Huxleigh Camp/AI/gn technology. Now, users with select subscriptions can access top-notch AI tools to help them with their marketing journeys.',
    icon: Bot,
  },
  {
    title: 'Stratavue expands to four membership tiers.',
    date: '2025-09-15',
    content:
      "Stratavue, the AI-backed marketing software for musicians & record labels, has expanded membership tiers from three to four. Now, memberships range from the bare minimum (Sound Check) to large enterprise (Standing 'O').",
    icon: Layers,
  },
];

type JobPosting = {
  title: string;
  type?: string;
  description: string[];
  responsibilities?: string[];
  compensation?: string;
  qualifications?: string[];
  benefits?: string[];
};

export const jobPostings: JobPosting[] = [
  {
    title: 'Account Manager Intern (B2B Sales)',
    type: 'Internship (Paid, 3 Months, Remote)',
    description: [
      'At Huxleigh, we’ve developed and created Tr/ai/ner. We’re transforming how businesses train their employees. Our AI-powered training solution gets teams up to speed quicker, better, and more streamlined than ever before. With customizable simulations, product knowledge modules, and seamless brand integration, we help companies onboard faster, reinforce culture, and drive sales performance.',
      'We are looking for a motivated Account Manager Intern who wants to learn the ins and outs of B2B sales while actively contributing to client success. This is a hands-on role in a learn-and-work environment, offering mentorship, real-world projects, and a chance to make a direct impact.',
    ],
    responsibilities: [
      'Prospecting & Outreach: Research and identify potential business clients in target industries; support outreach efforts via email, LinkedIn, and calls.',
      'Client Engagement: Assist in handling inbound leads, product demos, and follow-ups with prospects under guidance of senior team members.',
      'Pipeline Management: Help track leads, maintain appropriate records, and report on sales activities and progress.',
      'Learning by Doing: Participate in sales simulations and objection handling exercises using our state-of-the-art training technology/program to develop real-world sales skills.',
      'Support Sales Cycle: Shadow account managers on client calls, prepare proposals/quotes, and assist in managing trial accounts.',
      'Reporting: Compile performance and learning reports on outreach, engagement, and sales growth.',
    ],
    qualifications: [
      'Currently pursuing a degree in Business, Marketing, Communications, or related field (or equivalent experience/interest in sales).',
      'Strong interpersonal and communication skills; comfortable speaking with business professionals.',
      'Eagerness to learn B2B sales strategies and apply them in practice.',
      'Organized, detail-oriented, and able to manage multiple tasks.',
      'Self-motivated with a growth mindset; takes initiative in a fast-paced, startup-style environment.',
      'Familiarity with Google Suite and/or Microsoft Suite',
    ],
    benefits: [
      'Hands-on B2B sales experience with mentorship from experienced account managers.',
      'Training and practice using AI-powered sales simulation tools.',
      'Exposure to the full sales cycle, from lead generation to client onboarding.',
      'Opportunity to contribute to real client relationships and impact business growth.',
      'A foundation for future roles in sales, account management, or business development.',
    ]
  },
];
