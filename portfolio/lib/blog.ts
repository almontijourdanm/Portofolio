export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: string
  category: "career" | "technical" | "tutorial" | "opinion"
  readingTime: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "from-logistics-to-code",
    title: "My Journey: From Logistics to Code",
    date: "April 15, 2025",
    excerpt:
      "How I transitioned from a career in freight forwarding and logistics to becoming a fullstack JavaScript developer.",
    coverImage: "/forwarding-to-javascript.svg?height=600&width=1200",
    category: "career",
    readingTime: "5 min read",
    content: `
# My Journey: From Logistics to Code

After spending several years in the freight forwarding and logistics industry, I made the decision to completely change my career path and dive into the world of programming. This is the story of how I made that transition, the challenges I faced, and the lessons I learned along the way.

## The Logistics Years

My career began in the fast-paced world of global logistics. I started as a Sales Executive at Proteus Mitra Logistic, handling sales and operations for local and international freight forwarding. I managed documentation and permits for customs clearance, created cost-effective proposals, and monitored container bookings and shipment schedules.

Later, I moved to M+R Forwarding Indonesia, where I oversaw end-to-end logistics for domestic, export, and import cargo. I developed competitive quotations and pricing strategies that helped win new clients and managed order tracking and container allocation for numerous monthly shipments.

My most recent role was in Sales Operations at Abadimitra Andhika, where I managed domestic, export, and import shipments across sea and land logistics, ensuring timely delivery with a 98% on-time rate. I calculated quotations with accurate cost analysis and coordinated order fulfillment and container scheduling.

While I enjoyed the problem-solving aspects of logistics, I found myself increasingly drawn to the technological side of the business. I was fascinated by the software systems we used and often found myself thinking about how they could be improved.

## The Spark of Change

The turning point came when I realized that my passion for technology and problem-solving could be channeled into a career in software development. I started learning basic programming concepts in my free time, and soon found myself spending evenings and weekends coding.

What started as curiosity quickly grew into passion. I realized that software development combined many of the aspects I enjoyed about logistics—problem-solving, creating efficient systems, and delivering value—but with the added benefit of building something tangible.

## Taking the Leap

After months of self-study and deliberation, I made the decision to fully commit to my new path. I enrolled in Hacktiv8's immersive coding bootcamp, a program focused on fullstack JavaScript development.

The decision wasn't easy. It meant leaving behind a stable career, taking a financial hit, and starting over in a new field. But I knew that the long-term benefits—both in terms of career satisfaction and growth potential—would be worth it.

## The Bootcamp Experience

The bootcamp was intense, to say the least. From December 2024 to April 2025, I was immersed in code from morning until night. We covered everything from the fundamentals of JavaScript to building complex fullstack applications with React, Node.js, and various databases.

The learning curve was steep, and there were moments of doubt. But with each project completed and each concept mastered, my confidence grew. I discovered that my background in logistics had equipped me with valuable skills that translated well to development:

- **Problem-solving under pressure**: In logistics, problems need to be solved quickly to keep shipments moving. This ability to think on my feet proved invaluable when debugging code.
- **Attention to detail**: Logistics requires meticulous attention to documentation and regulations. This precision helped me write clean, error-free code.
- **Communication skills**: Years of explaining complex logistics concepts to clients prepared me to communicate technical ideas clearly.

## Building My First Projects

During the bootcamp, I worked on several projects that helped solidify my skills:

1. **Jolt Jordan**: A job portal platform with AI-powered CV feedback and a Telegram chatbot for job alerts.
2. **Qarl**: An e-commerce platform for reusable drink bottles with integrated product pages and cart system.
3. **Sparkles**: A mobile photo-sharing application inspired by Instagram with real-time updates.
4. **Queezy**: A web-based word game with dynamically generated questions powered by Gemini AI.
5. **Flex**: A fitness-focused application that fetched and displayed exercises from an API.

Each project presented its own challenges, but also provided immense satisfaction when completed. I found myself enjoying the process of building something from scratch and seeing it come to life.

## The Road Ahead

As I complete my bootcamp journey, I'm excited about the possibilities that lie ahead. The tech industry offers endless opportunities for growth and learning, and I'm eager to continue expanding my skills.

I plan to focus on fullstack development with JavaScript, React, and Node.js, while continuing to build my skills with databases and APIs. I'm particularly interested in creating intuitive user interfaces and solving complex problems with clean, efficient code.

## Lessons Learned

For anyone considering a similar career change, here are a few lessons I've learned along the way:

1. **Your previous experience is valuable**: Don't discount the skills you've developed in other fields. They often translate in unexpected ways.
2. **Embrace the discomfort**: Learning to code is challenging, and feeling lost is part of the process. Embrace it rather than fight it.
3. **Build projects you care about**: Working on projects related to your interests or previous industry keeps you motivated and showcases your unique perspective.
4. **Connect with the community**: The tech community is incredibly supportive. Attend meetups, join online forums, and don't be afraid to ask questions.

## Conclusion

Transitioning from logistics to code has been one of the most challenging and rewarding experiences of my life. While the journey is just beginning, I'm confident that the decision to change careers was the right one.

I'm excited to bring my unique background and perspective to the tech industry, and I look forward to the challenges and opportunities that lie ahead.
    `,
  },
  {
    slug: "building-with-nextjs",
    title: "Why I Love Building with Next.js",
    date: "April 20, 2025",
    excerpt: "My experience with Next.js and why it has become my go-to framework for web development projects.",
    coverImage: "/wp11846979.svg?height=600&width=1200",
    category: "technical",
    readingTime: "4 min read",
    content: `
# Why I Love Building with Next.js

As a developer who recently transitioned into the world of web development, finding the right tools and frameworks has been crucial to my success. Among all the technologies I've worked with, Next.js has quickly become my favorite framework for building web applications. Here's why I love it and why you might want to consider it for your next project.

## The Perfect Balance of Flexibility and Structure

One of the things I appreciate most about Next.js is how it strikes the perfect balance between providing helpful structure and allowing flexibility. Coming from a background in logistics where systems and processes are essential, I value frameworks that offer clear patterns without being overly restrictive.

Next.js provides conventions that make sense (like file-based routing) while still giving developers the freedom to organize their code in a way that works for their specific project. This balance makes it approachable for newcomers while remaining powerful enough for complex applications.

## Server Components Changed Everything

The introduction of React Server Components in Next.js 13+ was a game-changer for how I build applications. The ability to render components on the server has numerous benefits:

- **Improved performance**: Server components reduce the JavaScript sent to the client, resulting in faster page loads.
- **Simplified data fetching**: Fetching data directly in server components eliminates the need for client-side data fetching libraries in many cases.
- **Better SEO**: Server-rendered content is more easily indexed by search engines.

Here's a simple example of a server component that fetches data:

\`\`\`jsx
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products')
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
\`\`\`

The simplicity of this approach compared to client-side data fetching with useEffect or SWR is remarkable.

## File-Based Routing Makes Sense

Coming from a logistics background where organization is key, Next.js's file-based routing system immediately made sense to me. The structure of your application's files directly maps to your URL structure, making it intuitive to understand how routing works.

For example:
- \`app/page.tsx\` → \`/\`
- \`app/about/page.tsx\` → \`/about\`
- \`app/blog/[slug]/page.tsx\` → \`/blog/:slug\`

This approach eliminates the need for a separate router configuration file and makes it easy to understand the structure of your application at a glance.

## Server Actions Simplify Form Handling

Working with forms has traditionally been one of the more cumbersome aspects of web development. Next.js Server Actions have simplified this process significantly. Being able to define a server function right next to your form markup creates a more cohesive development experience.

Here's a simple example:

\`\`\`jsx
// app/contact/page.tsx
export default function ContactPage() {
  async function submitForm(formData) {
    'use server'
    const email = formData.get('email')
    const message = formData.get('message')
    
    // Process the form data on the server
    await saveMessageToDatabase({ email, message })
    
    // Return a result that the client can use
    return { success: true }
  }
  
  return (
    <form action={submitForm}>
      <input name="email" type="email" required />
      <textarea name="message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  )
}
\`\`\`

This approach reduces the need for client-side form libraries in many cases and provides a more straightforward way to handle form submissions.

## Image Optimization Out of the Box

The \`next/image\` component has saved me countless hours of work by handling image optimization automatically. It:

- Automatically serves images in modern formats like WebP when supported
- Resizes images to avoid shipping large images to small screens
- Lazy loads images by default, improving page performance
- Prevents layout shift with proper sizing

These optimizations would take significant effort to implement manually, but Next.js provides them out of the box.

## Deployment Simplicity with Vercel

While Next.js works with any hosting provider, the seamless integration with Vercel makes deployment incredibly simple. The zero-configuration approach means I can focus on building features rather than configuring deployment pipelines.

Features like preview deployments for pull requests have improved my workflow significantly, allowing stakeholders to review changes before they go to production.

## Conclusion

As someone who values efficiency and organization from my logistics background, Next.js provides the perfect framework for building modern web applications. Its balance of structure and flexibility, powerful features like Server Components and Server Actions, and excellent developer experience make it my go-to choice for new projects.

Whether you're building a simple portfolio site or a complex application, Next.js provides the tools you need to create fast, SEO-friendly, and developer-friendly web experiences.
    `,
  },
  {
    slug: "logistics-skills-in-development",
    title: "How My Logistics Background Helps Me as a Developer",
    date: "April 25, 2025",
    excerpt:
      "The unexpected ways my experience in freight forwarding and logistics has made me a better software developer.",
    coverImage: "/logistic-to-developer.svg?height=600&width=1200",
    category: "opinion",
    readingTime: "6 min read",
    content: `
# How My Logistics Background Helps Me as a Developer

When I decided to transition from logistics to software development, I worried that my previous experience might not be relevant in my new career. However, I've been pleasantly surprised to discover that many of the skills I developed in freight forwarding and logistics have directly translated to software development. Here's how my background has unexpectedly prepared me for success in tech.

## Systems Thinking

### Logistics Experience
In logistics, I had to understand complex systems of transportation, documentation, customs regulations, and supply chains. Every shipment involved multiple stakeholders, touchpoints, and potential failure points that needed to be managed.

### Development Application
Software development, especially for complex applications, requires similar systems thinking. Understanding how different components interact, managing dependencies, and anticipating potential issues are all skills I developed in logistics that now help me design better software architectures.

For example, when building the Jolt Jordan job portal during my bootcamp, I was able to map out the entire system—from user authentication to job matching algorithms—in a way that accounted for all the interconnected parts.

## Problem-Solving Under Pressure

### Logistics Experience
In freight forwarding, problems arise constantly: delayed shipments, customs issues, documentation errors, or weather disruptions. I had to quickly assess situations, identify solutions, and implement them under tight deadlines.

### Development Application
Debugging code, handling production issues, or meeting project deadlines requires the same ability to stay calm under pressure and methodically solve problems. When our team encountered a critical bug in the Sparkles photo-sharing app the night before presentation, I was able to lead the debugging process with the same methodical approach I used when resolving shipping delays.

## Attention to Detail

### Logistics Experience
In logistics, a single error in documentation or calculation could lead to significant delays, additional costs, or even legal issues. I developed a meticulous attention to detail, especially when calculating quotations and preparing shipping documents.

### Development Application
This precision has been invaluable in coding. I find myself naturally checking for edge cases, validating inputs, and ensuring that my code handles exceptions properly. During code reviews, I often catch small issues that could potentially cause problems down the line.

## Client Communication

### Logistics Experience
A significant part of my role in logistics involved communicating with clients about complex shipping processes, regulations, and timelines. I had to translate industry jargon into clear explanations and set realistic expectations.

### Development Application
As a developer, I now find it easier to communicate technical concepts to non-technical stakeholders. I can explain how features work, discuss technical limitations, and set realistic timelines without overwhelming clients with technical details.

## Project Management

### Logistics Experience
Managing multiple shipments simultaneously required strong organizational skills, prioritization, and the ability to track progress across different stages. I had to coordinate between various parties and ensure everything moved according to schedule.

### Development Application
These skills directly translate to managing development tasks, especially in an Agile environment. Breaking down large projects into manageable tasks, prioritizing work, and tracking progress are all familiar activities from my logistics days.

## Adaptability

### Logistics Experience
The logistics industry is constantly changing due to global events, regulatory changes, and market fluctuations. I had to quickly adapt to new situations and find alternative solutions when plans fell through.

### Development Application
The tech industry evolves even faster, with new frameworks, tools, and best practices emerging regularly. My experience with adapting to change has made it easier to learn new technologies and pivot when necessary. During my bootcamp, when we had to switch from one database solution to another mid-project, I was able to adapt quickly and help the team transition smoothly.

## Real-World Examples

Here are some specific examples of how my logistics background has helped me in development projects:

1. **Data Modeling**: When designing the database schema for the Qarl e-commerce platform, I drew on my experience with inventory management to create a robust product catalog system that accounted for variations, stock levels, and shipping information.

2. **Process Optimization**: For the Queezy word game, I implemented a caching system that significantly improved load times, applying the same principles I used to optimize shipping routes and documentation workflows.

3. **Error Handling**: In the Jolt Jordan job portal, I created comprehensive error handling for the application process, anticipating various failure points just as I would when planning for potential disruptions in a shipping route.

4. **User Experience**: My experience dealing with clients in logistics helped me design more intuitive user interfaces that anticipate user needs and provide clear guidance, particularly in the Flex fitness application where users needed to easily find and filter exercises.

## Conclusion

If you're considering a career change into development from a seemingly unrelated field like logistics, don't underestimate the value of your existing skills and experiences. The technical skills of programming can be learned, but many of the soft skills and ways of thinking that make a great developer are transferable from other industries.

My background in logistics hasn't just been relevant to my new career in development—it's been a competitive advantage. It's given me a unique perspective and approach to problem-solving that complements the technical skills I've acquired.

As the tech industry continues to evolve, I believe that developers with diverse backgrounds will be increasingly valuable, bringing fresh perspectives and approaches to solving complex problems.
    `,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    career: "Career",
    technical: "Technical",
    tutorial: "Tutorial",
    opinion: "Opinion",
  }

  return categories[category] || "Uncategorized"
}
