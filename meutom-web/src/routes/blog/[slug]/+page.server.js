import { blogPosts } from '$lib/data/blogPosts'

export async function load({ params }) {
  const currentPostIndex = blogPosts.findIndex((post) => post.slug === params.slug)
  const previousPost = blogPosts[currentPostIndex - 1] || null
  const nextPost = blogPosts[currentPostIndex + 1] || null

  return {
    post: blogPosts[currentPostIndex],
    previousPost,
    nextPost
  }
}
