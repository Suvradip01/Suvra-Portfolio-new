export const myProjects = [
  {
    id: 1,
    title: "Insight-ATS",
    description:
      "AI Hiring Support Platform extending traditional ATS systems with contextual Resume–JD matching, project evaluation, and explainable candidate assessment.",

    subDescription: [
      "Built an AI hiring platform integrating project evaluation, contextual Resume–JD matching, and resume parsing beyond keyword-based ATS screening.",
      "Fine-tuned BERT, RoBERTa, and DistilBERT models, achieving 0.75 F1 and 0.78, 0.93 Macro F1 for entity extraction, semantic matching, and project evaluation.",
      "Reduced inference latency by 51% (6.62s → 3.24s) using FastAPI lazy loading, singleton model orchestration, and Redis caching.",
      "Reduced client-to-server API requests by 90% through shared Job Description batch processing with Redux-managed screening workflows."
    ],
    href: "https://ai-resume-analyzer-ats-six.vercel.app/",
    liveHref: "",
    images: [
      "/assets/projects/insightATS/2026-06-16 16 44 57.png",
      "/assets/projects/insightATS/2026-06-16 16 56 35.png",
      "/assets/projects/insightATS/2026-06-16 16 58 28.png",
      "/assets/projects/insightATS/2026-06-16 17 26 41.png",
      "/assets/projects/insightATS/2026-06-16 17 27 37.png",
      "/assets/projects/insightATS/2026-06-16 17 27 59.png"
    ],
    tags: [
      { id: 1, name: "React.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "Redux", path: "/assets/logos/redux.svg" },
      { id: 3, name: "FastAPI", path: "/assets/logos/fastapi.svg" },
      { id: 4, name: "Redis", path: "/assets/logos/redis.svg" },
      { id: 5, name: "Python", path: "/assets/logos/python.svg" },
      { id: 6, name: "PyTorch", path: "/assets/logos/pytorch.svg" },
      { id: 7, name: "Scikit-learn", path: "/assets/logos/scikitlearn.svg" },
      { id: 8, name: "Clerk", path: "/assets/logos/clerk.svg" },
      { id: 9, name: "JWT", path: "/assets/logos/jwt.svg" },
    ],
  },
  {
    id: 2,
    title: "CodeNest",
    description:
      "AI-powered Cloud IDE with secure Docker-based code execution, AI-assisted code review, debugging, and software visualization.",

    subDescription: [
      "Built a cloud IDE supporting 20+ concurrent users with isolated Docker-based code execution and 5-second execution timeouts.",
      "Engineered an asynchronous execution pipeline using a 25-job queue and worker processes for reliable concurrent execution.",
      "Integrated Llama-3.3-70B for AI-assisted code review, debugging, code generation, and Mermaid flowchart visualization.",
      "Reduced AI response latency to 1–3 seconds using Redis caching, SHA-256 cache keys, secure rate limiting, and in-memory fallback."
    ],
    href: "https://code-nest-swart.vercel.app/",
    liveHref: "",
    images: [
      "/assets/projects/Codenest/2026-06-16 16 59 56.png",
      "/assets/projects/Codenest/2026-06-16 17 00 55.png",
      "/assets/projects/Codenest/2026-06-16 17 02 57.png",
      "/assets/projects/Codenest/2026-06-16 17 04 09.png"
    ],
    tags: [
      { id: 1, name: "React.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "Zustand", path: "/assets/logos/zustand.svg" },
      { id: 3, name: "Node.js", path: "/assets/logos/nodejs.svg" },
      { id: 4, name: "Express.js", path: "/assets/logos/expressjs.svg" },
      { id: 5, name: "MongoDB", path: "/assets/logos/mongodb.svg" },
      { id: 6, name: "Docker", path: "/assets/logos/docker.svg" },
      { id: 7, name: "Groq", path: "/assets/logos/groq.svg" },
      { id: 8, name: "JWT", path: "/assets/logos/jwt.svg" },
    ],
  },
  {
    id: 3,
    title: "AI-Powered CSV Import Platform",
    description: "AI-powered CSV import platform that transforms unstructured spreadsheets into validated CRM-ready records.",
    subDescription: [
      "Built an intelligent CSV import platform with adaptive AI processing and automated field mapping.",
      "Transformed unstructured spreadsheets into validated CRM-ready records while minimizing unnecessary LLM usage.",
      "Implemented streaming import workflows with real-time validation and progress updates using Server-Sent Events.",
      "Developed using React, Express.js, MongoDB, Redis, and Google Gemini with cloud deployment on Vercel and Render."
    ],
    href: "",
    liveHref: "",
    images: [
      "/assets/projects/CSV proj/2026-07-21 14 46 29.png",
      "/assets/projects/CSV proj/2026-07-21 14 47 31.png",
      "/assets/projects/CSV proj/2026-07-21 14 48 42.png",
      "/assets/projects/CSV proj/2026-07-21 14 49 15.png",
      "/assets/projects/CSV proj/2026-07-21 14 49 57.png"
    ],
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/nextjs.svg" },
      { id: 2, name: "Node.js", path: "/assets/logos/nodejs.svg" },
      { id: 3, name: "Express.js", path: "/assets/logos/expressjs.svg" },
      { id: 4, name: "Nginx", path: "/assets/logos/nginx.svg" },
      { id: 5, name: "Redis", path: "/assets/logos/redis.svg" },
      { id: 6, name: "Docker", path: "/assets/logos/docker.svg" },
      { id: 7, name: "Google Gemini", path: "/assets/logos/gemini.svg" },
    ],
  },
  {
    id: 4,
    title: "Skin Disease Detection",
    description:
      "Deep learning-based skin lesion classification system for early melanoma detection using Computer Vision.",

    subDescription: [
      "Developed a skin lesion classification system using the HAM10000 dataset with 10,015 dermoscopic images.",
      "Improved model reliability using patient-wise data splitting, CLAHE enhancement, hair-removal preprocessing, and EfficientNetB3 transfer learning.",
      "Applied Focal Loss and Test-Time Augmentation to improve generalization across lesion categories.",
      "Achieved 90% test accuracy with F1-scores of 0.89, 0.86, and 0.94 across benign, melanoma, and non-melanoma classes."
    ],
    href: "https://www.kaggle.com/code/suvradipghosh/skindiseasedetection-using-cnn",
    liveHref: "",
    images: [
      "/assets/projects/Skindiseasedetectioncnn/2026-06-16 17 23 55.png",
      "/assets/projects/Skindiseasedetectioncnn/2026-06-16 17 23 22.png",
      "/assets/projects/Skindiseasedetectioncnn/2026-06-16 19 07 19.png"
    ],
    tags: [
      { id: 1, name: "Python", path: "/assets/logos/python.svg" },
      { id: 2, name: "TensorFlow", path: "/assets/logos/tensorflow.svg" },
      { id: 3, name: "Scikit-learn", path: "/assets/logos/scikitlearn.svg" },
      { id: 4, name: "OpenCV", path: "/assets/logos/opencv.svg" },
      { id: 5, name: "NumPy", path: "/assets/logos/numpy.svg" },
      { id: 6, name: "Pandas", path: "/assets/logos/pandas.svg" },
      { id: 7, name: "Matplotlib", path: "/assets/logos/matplotlib.svg" },
    ],
  },
  {
    id: 5,
    title: "Luminist",
    description:
      "AI-powered photo editing platform with intelligent editing tools, cloud storage, and project management.",

    subDescription: [
      "Built a browser-based photo editor supporting AI-powered image enhancement and background removal.",
      "Integrated cloud storage, project organization, and folder-based media management.",
      "Implemented secure authentication, subscription-aware usage limits, and responsive editing workflows.",
      "Developed using Next.js, Convex, Clerk, and ImageKit for scalable image management."
    ],
    href: "https://luminist-s.vercel.app/",
    liveHref: "",
    images: [
      "/assets/projects/Luminist/2026-06-16 17 18 09.png",
      "/assets/projects/Luminist/2026-06-16 17 20 13.png",
      "/assets/projects/Luminist/2026-06-16 17 21 24.png"
    ],
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "Tailwind", path: "/assets/logos/tailwindcss.svg" },
      { id: 3, name: "TypeScript", path: "/assets/logos/javascript.svg" },
      { id: 4, name: "Convex", path: "/assets/logos/convex.svg" },
      { id: 5, name: "Clerk", path: "/assets/logos/clerk.svg" },
    ],
  },
  {
    id: 6,
    title: "Interference Detection",
    description:
      "Deep learning-based system that classifies scanned examination papers as Clean or Interference before automated evaluation.",

    subDescription: [
      "Developed a computer vision system that detects hands and visual obstructions before automated examination paper evaluation.",
      "Designed an 8.48M-parameter CNN using Conv2D, Batch Normalization, and MaxPooling for Clean vs Interference classification.",
      "Improved feature extraction using Gaussian Blur, CLAHE enhancement, LAB color conversion, and normalized preprocessing.",
      "Achieved 92% test accuracy, 97% recall, and 91% Macro F1-score using optimized preprocessing and stratified dataset splitting."
    ],
    href: "https://www.kaggle.com/code/suvradipghosh/merittracknotebookv1",
    liveHref: "",
    images: [
      "/assets/projects/proj5/2026-06-16 17 25 30.png",
      "/assets/projects/proj5/2026-06-16 17 25 12.png",
      "/assets/projects/proj5/2026-06-16 19 08 48.png"
    ],
    tags: [
      { id: 1, name: "Python", path: "/assets/logos/python.svg" },
      { id: 2, name: "TensorFlow", path: "/assets/logos/tensorflow.svg" },
      { id: 3, name: "OpenCV", path: "/assets/logos/opencv.svg" },
      { id: 4, name: "Scikit-learn", path: "/assets/logos/scikitlearn.svg" },
      { id: 5, name: "NumPy", path: "/assets/logos/numpy.svg" },
      { id: 6, name: "Pandas", path: "/assets/logos/pandas.svg" },
      { id: 7, name: "Matplotlib", path: "/assets/logos/matplotlib.svg" },
    ],
  },
];

export const mySocials = [
  {
    name: "Email",
    href: "mailto:suvrawork03@gmail.com",
    icon: "/assets/socials/email.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/Suvradip01",
    icon: "/assets/socials/github.svg",
  },
  {
    name: "Linkedln",
    href: "https://www.linkedin.com/in/suvradip01",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/Suvra.exe/",
    icon: "/assets/socials/instagram.svg",
  },
  {
    name: "Twitter/X",
    href: "https://x.com/SuvradipGhosh7",
    icon: "/assets/socials/x.svg",
  },
];

export const experiences = [
  {
    title: "Android Developer Virtual Internship",
    job: "Google & AICTE EduSkills",
    date: "Apr 2024 - Jun 2024",
    background: "/assets/google-android.png",
    contents: [
      "Grade: Excellent Performance",
      "Completed intensive virtual training on Android application architecture, UI design, and platform integrations.",
      "Gained hands-on experience building and deploying Android apps using modern developer tools and practices.",
      "Internship Profile https://g.dev/suvra",
      "Certificate  https://shorturl.at/P1uHq",
    ],
  },
  {
    title: "Academic Education",
    job: "Master of Computer Applications (MCA) & Bachelor of Computer Applications (BCA)",
    date: "2021 - Present",
    background: "/assets/degree.png",
    contents: [
      "Master of Computer Applications (2024 – Present) | Sikkim Manipal Institute of Technology — CGPA: 8.25",
      "Bachelor of Computer Applications (2021 – 2024) | Techno India University — CGPA: 8.39",
      "Higher Secondary (Class XII) (2021) | Maynaguri High School — Percentage: 88.6%",
    ],
  },
  {
    title: "Professional Certifications",
    job: "IBM, Google & Oracle",
    date: "2024 - Present",
    background: "/assets/certificate.png",
    contents: [
      "IBM Professional Certificate: Full Stack Software Developer  https://coursera.org/verify/professional-cert/8Y9PV0EKR63Z",
      "IBM Professional Certificate: Data Science and AI  https://coursera.org/verify/professional-cert/065T6NLP2W6A",
      "Google AI Essentials  https://coursera.org/verify/specialization/JBYITCAGT3RH",
      "Oracle Java Foundation  https://coursera.org/verify/IC3KZOA4RFFM",
      "All certificates & badges https://github.com/Suvradip01/learning-journey-Suvradip-Certificates-",
    ],
  },
];
