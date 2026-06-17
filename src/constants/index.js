export const myProjects = [
  {
    id: 1,
    title: "Insight-ATS",
    description:
      "AI-Assisted Hiring and Project-Based Evaluation Platform — a full-stack ATS with 3 transformer models for entity extraction, resume–JD matching, and SHAP explainability.",
    subDescription: [
      "Built a full-stack AI candidate-evaluation ATS platform with a FastAPI backend integrating 3 transformer models for entity extraction, Resume–JD matching, extended project complexity scoring, and SHAP explainability.",
      "Fine-tuned and evaluated 3 models: BERT-NER entity extractor (1000 resumes, 0.75 F1), RoBERTa resume–JD semantic matcher (8000 resume–JD pairs, 0.78 Macro F1), and DistilBERT project-complexity evaluator (0.93 Macro F1) using 3×5 repeated K-Fold validation.",
      "Optimized multi-resume inference latency by 51.1% (6.62s to 3.24s) by designing a FastAPI pipeline with lazy loaded singleton orchestration and in-memory cached model instances serving 4-dimensional ATS scores.",
      "Reduced client-to-backend API calls by 40% via shared-JD batch screening and deployed the system as a production full-stack application with Clerk authentication on Hugging Face Spaces."
    ],
    href: "https://github.com/Suvradip01",
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
      { id: 2, name: "FastAPI", path: "/assets/logos/fastapi.svg" },
      { id: 3, name: "PyTorch", path: "/assets/logos/pytorch.svg" },
      { id: 4, name: "BERT", path: "/assets/logos/python.svg" },
    ],
  },
  {
    id: 2,
    title: "CodeNest",
    description:
      "AI-Powered Cloud IDE and Review Platform — a microservice-based cloud IDE supporting 20+ concurrent users executing code in isolated Docker containers with AI-assisted reviews.",
    subDescription: [
      "Built a microservice-based cloud IDE supporting 20+ concurrent users, executing JavaScript, Python, Java, and C in isolated Docker containers with resource quotas, network restrictions, and 5-second execution timeouts.",
      "Engineered a queue-based execution system with a 25-job buffer and 2 worker processes to prevent resource exhaustion and ensure reliable code execution under concurrent workloads.",
      "Integrated Groq-hosted Llama-3.3-70B for AI-assisted code reviews, debugging, Mermaid flowchart generation, and code analysis with 1–3 second response latency.",
      "Implemented SHA-256 response caching, a 20 requests/minute rate limit, and a Redis-backed rate limiter with in-memory failover; deployed the platform and execution runner on Render."
    ],
    href: "https://github.com/Suvradip01",
    liveHref: "",
    images: [
      "/assets/projects/Codenest/2026-06-16 16 59 56.png",
      "/assets/projects/Codenest/2026-06-16 17 00 55.png",
      "/assets/projects/Codenest/2026-06-16 17 02 57.png",
      "/assets/projects/Codenest/2026-06-16 17 04 09.png"
    ],
    tags: [
      { id: 1, name: "React.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "Express.js", path: "/assets/logos/expressjs.svg" },
      { id: 3, name: "MongoDB", path: "/assets/logos/mongodb.svg" },
      { id: 4, name: "Docker", path: "/assets/logos/docker.svg" },
    ],
  },
  {
    id: 3,
    title: "Skin Disease Detection",
    description:
      "CNN-based skin lesion classification system on the HAM10000 dataset — achieving 90% test accuracy across 3 disease classes using EfficientNetB3 with transfer learning.",
    subDescription: [
      "Created a skin lesion classification pipeline on the HAM10000 dataset containing 10,015 dermatoscopic images and restructured labels into 3 classes: benign, melanoma, and non-melanoma.",
      "Prevented data leakage through patient-id based train-validation-test splitting and used a dual-stream preprocessing pipeline using CLAHE enhancement and black-hat morphology-based hair removal.",
      "Fine-tuned EfficientNetB3 using transfer learning, Focal Loss, Adam optimization, and Test-Time Augmentation.",
      "Achieved 90% test accuracy with F1-scores of 0.89 (benign), 0.86 (melanoma), and 0.94 (non-melanoma), and evaluated performance using confusion matrices and per-class precision/recall analysis."
    ],
    href: "https://github.com/Suvradip01",
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
    ],
  },
  {
    id: 4,
    title: "Luminist",
    description:
      "AI-Powered Photo Editor Web App — combining familiar editing tools with background removal, enhancements, and simple generative actions in browser.",
    subDescription: [
      "Supports background removal, basic enhancements, and simple generative actions directly in the browser.",
      "Manages multiple projects, organizes work into folders, and stores edited images through cloud services.",
      "Includes secure login via Clerk, project limits based on subscription level, and a dark comfortable interface.",
      "Built with Next.js, React, Convex, Clerk, and ImageKit for reliable performance and straightforward editing."
    ],
    href: "https://github.com/Suvradip01",
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
      { id: 4, name: "MongoDB", path: "/assets/logos/mongodb.svg" },
    ],
  },
  {
    id: 5,
    title: "Interference Detection",
    description:
      "CNN-Based Image Classification System for automatic interference detection (Clean vs Interference images) using Deep Learning and Computer Vision.",
    subDescription: [
      "Developed a Conv2D, Batch Normalization, and MaxPooling CNN model with approximately 8.48 million trainable parameters.",
      "Applied Gaussian Blur, CLAHE contrast enhancement, RGB to LAB conversion, and image normalization preprocessing.",
      "Used stratified sampling to split dataset into 70% train, 15% validation, and 15% test sets.",
      "Achieved 92% overall test accuracy, 97% recall for interference detection, and 91% Macro F1-Score."
    ],
    href: "https://github.com/Suvradip01",
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
      "Master of Computer Applications (2024 – Present) | Sikkim Manipal Institute of Technology — CGPA: 8.16",
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
