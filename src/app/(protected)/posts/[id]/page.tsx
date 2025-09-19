"use client"

import AuthorBlock from "@/components/pages/posts/AuthorBlock"
import PostMeta from "@/components/pages/posts/PostMeta"
import Container from "@/components/shared/Container"
import ErrorMessage from "@/components/shared/ErrorMessage"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import useFetch from "@/hooks/useFetch"
import { api_url } from "@/lib/api"
import { capitalizeFirstLetter } from "@/lib/utils"
import type { Post, User } from "@/types"
import Link from "next/link"
import { use } from "react"

interface PostDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PostDetailPage({ params }: PostDetailPageProps) {

  const { id } = use(params);

  const {
    data: post,
    loading: postLoading,
    error: postError,
    refetch: refetchPost,
  } = useFetch<Post>(`${api_url}/posts/${id}`)
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(post ? `${api_url}/users/${post.userId}` : null)

  if (postLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (postError) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message={postError} onRetry={refetchPost} />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message="Post not found" />
      </div>
    )
  }

  return (
    <Container className="max-w-4xl mx-auto space-y-6 py-6">
      {/* Back Button */}
      <Link href="/posts" className="inline-flex items-center text-primary hover:text-accent transition-colors">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Back to Posts
      </Link>

      {/* Post Content */}
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{capitalizeFirstLetter(post.title)}</h1>
        <PostMeta post={post} />
        <p className="text-gray-700 leading-relaxed">{capitalizeFirstLetter(post.body)}</p>

      </div>

      {/* Author Information */}
      {userLoading ? (
        <div className="">
          <div>
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
              <span className="ml-2 text-gray-600">Loading author information...</span>
            </div>
          </div>
        </div>
      ) : userError ? (
        <div className="">
          <div>
            <ErrorMessage message="Failed to load author information" />
          </div>
        </div>
      ) : user ? (
        <AuthorBlock author={user} />
      ) : null}
    </Container>
  )
}
