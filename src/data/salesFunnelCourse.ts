export const salesFunnelCourse = {
  _id: 'sales-funnel-mastery',
  title: 'Sales Funnel Mastery: Convert Visitors into Loyal Customers',
  description: 'Master the art of creating high-converting sales funnels. Learn proven strategies to attract, engage, and convert visitors into loyal customers through effective funnel optimization.',
  instructor: {
    name: 'Sarah Anderson',
    title: 'Digital Marketing Strategist',
    bio: '15+ years experience in digital marketing and funnel optimization. Helped 500+ businesses increase conversion rates.',
    avatar: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=200&h=200'
  },
  price: 199.99,
  thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1920',
  level: 'intermediate',
  category: 'Digital Marketing',
  duration: '6 weeks',
  modules: [
    {
      title: 'Foundations of Sales Funnels',
      description: 'Understanding the core concepts and psychology behind effective sales funnels',
      order: 1,
      lessons: [
        {
          title: 'What is a Sales Funnel?',
          description: 'Learn the fundamental concepts of sales funnels and why they are crucial for business success. We will cover the different stages and how they work together.',
          videoUrl: 'https://example.com/videos/funnel-basics',
          duration: 15,
          order: 1,
          keyPoints: [
            'The AIDA model explained',
            'Different types of funnels',
            'Key metrics to track',
            'Common funnel mistakes'
          ]
        },
        {
          title: 'Customer Psychology in Funnels',
          description: 'Understand how customer psychology influences buying decisions and how to leverage these principles in your funnel.',
          videoUrl: 'https://example.com/videos/customer-psychology',
          duration: 20,
          order: 2,
          keyPoints: [
            'Decision-making triggers',
            'Emotional vs. rational buying',
            'Trust building elements',
            'Psychological pricing strategies'
          ]
        }
      ]
    },
    {
      title: 'Creating Your Lead Magnet',
      description: 'Design and develop compelling lead magnets that attract your ideal customers',
      order: 2,
      lessons: [
        {
          title: 'Lead Magnet Strategy',
          description: 'Learn how to create irresistible lead magnets that attract qualified prospects and start building your email list.',
          videoUrl: 'https://example.com/videos/lead-magnets',
          duration: 25,
          order: 1,
          keyPoints: [
            'Types of lead magnets',
            'Audience research',
            'Value proposition creation',
            'Delivery optimization'
          ]
        },
        {
          title: 'Lead Magnet Creation Workshop',
          description: 'Step-by-step guide to creating your first lead magnet, from conception to delivery.',
          videoUrl: 'https://example.com/videos/lead-magnet-workshop',
          duration: 30,
          order: 2,
          keyPoints: [
            'Content planning',
            'Design principles',
            'Tools and resources',
            'Testing and optimization'
          ]
        }
      ]
    },
    {
      title: 'Landing Page Optimization',
      description: 'Create high-converting landing pages that turn visitors into leads',
      order: 3,
      lessons: [
        {
          title: 'Landing Page Essentials',
          description: 'Master the key elements of high-converting landing pages and learn how to optimize each component.',
          videoUrl: 'https://example.com/videos/landing-pages',
          duration: 25,
          order: 1,
          keyPoints: [
            'Headlines that convert',
            'Effective call-to-actions',
            'Social proof placement',
            'Mobile optimization'
          ]
        },
        {
          title: 'A/B Testing Strategies',
          description: 'Learn how to conduct effective A/B tests to continuously improve your landing page performance.',
          videoUrl: 'https://example.com/videos/ab-testing',
          duration: 20,
          order: 2,
          keyPoints: [
            'Test planning',
            'Statistical significance',
            'Common testing mistakes',
            'Results analysis'
          ]
        }
      ]
    }
  ]
};