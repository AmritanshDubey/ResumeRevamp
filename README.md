Resume-Revamp

AI-powered resume analysis tool that provides instant feedback, keyword suggestions, and tailored industry tips to help job seekers improve their resumes.

##Features-

Paste your resume text and get an AI-generated score

Detailed breakdown of strengths and weaknesses

Keyword suggestions to optimize for Applicant Tracking Systems (ATS)

Industry-specific tips and best practices

Download an improved version of your resume

Secure backend powered by Supabase Edge Functions

##Tech Stack

##Frontend: Next.js, React, TailwindCSS, ShadCN UI, Lucide Icons

##Backend: Supabase Functions, PostgreSQL

#AI Integration: OpenAI API (via Supabase function)

Setup
1. Clone the Repository
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer

2. Install Dependencies
npm install

3. Configure Environment Variables

Create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key

4. Supabase Setup

Ensure you have a Supabase account
.

Install Supabase CLI:

npm install supabase --save-dev


Authenticate and link your project:

npx supabase login
npx supabase link --project-ref your_project_ref


Deploy the resume analysis function:

npx supabase functions deploy analyze-resume

5. Run the Project
npm run dev


The application will be available at http://localhost:3000
.

Deployment

Frontend can be deployed using Vercel
.

vercel


Backend functions should be deployed to Supabase:

npx supabase functions deploy analyze-resume
