import React from "react";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

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

const BlogCard = ({ post }: { post: BlogPost }) => {
  const formattedDate = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true });
  
  const categoryName = post.category?.name || "Uncategorized";

  return (
    <article className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300">
      <Link href={`/blog/${post.slug}`}>
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded">
            {categoryName}
          </span>
          <span className="text-neutral-500 text-sm ml-auto">{formattedDate}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="block mb-3">
          <h3 className="text-xl font-semibold text-neutral-800 hover:text-primary transition duration-150">
            {post.title}
          </h3>
        </Link>
        <p className="text-neutral-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="text-neutral-700 font-medium">{post.authorName}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
