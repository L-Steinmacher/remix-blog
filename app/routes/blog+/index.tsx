import { json, type DataFunctionArgs } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { getPosts } from "~/utils/blog.server.ts"
export async function loader(request: DataFunctionArgs) {
  let blogs = await getPosts()

  return json({blogs})
};

export default function BlogsRoute() {
    let {blogs} = useLoaderData<typeof loader>()
    return (
        <div>
            <h1>Blog Posts</h1>
            <pre>{JSON.stringify(blogs, null, 2)}</pre>
            <ul>
                {blogs.map((post) => (
                    <li key={post.slug}>
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}