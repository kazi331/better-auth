"use client"
import { PostCard } from "@/components/pages/posts/post-card"
import Container from "@/components/shared/Container"
import ErrorMessage from "@/components/shared/ErrorMessage"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import useFetch from "@/hooks/useFetch"
import { api_url } from "@/lib/api"
import { Post } from "@/types/api"

export default function Posts() {
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(`${api_url}/posts`)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    )
  }
  return (
    <Container className="py-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing {posts?.length || 0} posts</p>
        <button
          onClick={refetch}
          className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors cursor-pointer"
        >
          Refresh
        </button>
      </div>
      <main className="my-10">
        {posts && posts.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            role="grid"
          >
            {posts.map((post, index) => (
              <div key={post.id} role="gridcell" aria-rowindex={Math.floor(index / 4) + 1} aria-colindex={(index % 4) + 1}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12" role="status">
            <p className="text-gray-500 text-lg">No posts found.</p>
          </div>
        )}
      </main>
    </Container>
  )
}
