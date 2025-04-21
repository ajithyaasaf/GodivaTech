import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { formatDistanceToNow, format } from "date-fns";
import NewsletterSection from "@/components/home/NewsletterSection";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage: string;
  authorName: string;
  authorImage: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams();
  const [, navigate] = useLocation();

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const post = blogPosts.find(post => post.slug === slug);
  
  // Get related posts (same category, excluding current post)
  const relatedPosts = post 
    ? blogPosts.filter(p => p.categoryId === post.categoryId && p.id !== post.id).slice(0, 3)
    : [];

  useEffect(() => {
    // If post not found, redirect to blog listing
    if (blogPosts.length > 0 && !post) {
      navigate("/blog");
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [post, blogPosts, navigate]);

  if (!post) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  const formattedDate = format(new Date(post.publishedAt), "MMMM dd, yyyy");
  const timeAgo = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true });
  
  // Split content by paragraphs for better rendering
  const contentParagraphs = post.content.split("\n\n");

  return (
    <>
      <Helmet>
        <title>{post.title} | GodivaTech Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
      </Helmet>

      <section className="bg-white pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap mb-8">
            <Link 
              href="/blog" 
              className="text-primary hover:text-primary/90 flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Blog
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="mb-4 flex items-center">
                <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded mr-3">
                  {post.category?.name || "Uncategorized"}
                </span>
                <span className="text-neutral-500 text-sm">{formattedDate}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                {post.title}
              </h1>
              
              <p className="text-lg text-neutral-600 mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex items-center">
                <img 
                  src={post.authorImage} 
                  alt={post.authorName} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-neutral-800">{post.authorName}</p>
                  <p className="text-neutral-500 text-sm">Published {timeAgo}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <article className="prose prose-lg max-w-none mb-12">
              {contentParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
            
            <div className="border-t border-neutral-200 pt-8 mb-12">
              <div className="flex flex-wrap gap-2">
                <span className="text-neutral-700 font-medium">Share this article:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-primary transition-colors"
                  aria-label="Share on Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-primary transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-primary transition-colors"
                  aria-label="Share on Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {relatedPosts.length > 0 && (
        <section className="bg-neutral-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-800 mb-8">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </>
  );
};

export default BlogPost;
