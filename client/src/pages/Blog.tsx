import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import NewsletterSection from "@/components/home/NewsletterSection";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
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

interface Category {
  id: number;
  name: string;
  slug: string;
}

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  // Filter posts by category and search term
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !activeCategory || post.categoryId === activeCategory;
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  // Default categories in case API doesn't return data
  const defaultCategories = [
    { id: 0, name: "All Topics", slug: "all" },
    { id: 1, name: "Technology Trends", slug: "technology-trends" },
    { id: 2, name: "Cloud Computing", slug: "cloud-computing" },
    { id: 3, name: "Cybersecurity", slug: "cybersecurity" },
    { id: 4, name: "AI & Machine Learning", slug: "ai-machine-learning" }
  ];

  const displayCategories = categories.length > 0 
    ? [{ id: 0, name: "All Topics", slug: "all" }, ...categories] 
    : defaultCategories;

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    setPage(1); // Reset to first page when changing category
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  return (
    <>
      <Helmet>
        <title>Blog - Latest Tech Insights | GodivaTech</title>
        <meta 
          name="description" 
          content="Stay up-to-date with the latest technology trends and insights from GodivaTech's expert team. Explore our articles on software development, cloud solutions, cybersecurity, and more." 
        />
      </Helmet>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Latest Insights & Articles</h1>
            <p className="text-xl text-white/90">
              Stay up-to-date with the latest technology trends and insights from our experts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <CategoryFilter 
              categories={displayCategories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 px-4 pr-10 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:w-64"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-primary"
                  aria-label="Search"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>

          {filteredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {displayPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="inline-flex items-center -space-x-px">
                    <Button
                      onClick={() => setPage(page > 1 ? page - 1 : 1)}
                      disabled={page === 1}
                      variant="outline"
                      className="rounded-l-md"
                      aria-label="Previous page"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </Button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        variant={page === i + 1 ? "default" : "outline"}
                        className={page === i + 1 ? "bg-primary text-white" : ""}
                        aria-label={`Page ${i + 1}`}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    
                    <Button
                      onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                      disabled={page === totalPages}
                      variant="outline"
                      className="rounded-r-md"
                      aria-label="Next page"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </Button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">No articles found</h3>
              <p className="text-neutral-600 mb-8">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setActiveCategory(null);
                  setSearchTerm("");
                }}
              >
                View All Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </>
  );
};

export default Blog;
