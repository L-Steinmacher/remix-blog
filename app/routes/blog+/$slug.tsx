import { json, type DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { GeneralErrorBoundary } from "~/components/error-boundary.tsx";
import { getPost } from "~/utils/blog.server.ts";

import { useMdxComponent } from "~/utils/mdx.tsx";

export async function loader({params, request}: DataFunctionArgs) {
  let slug = params.slug;
  if (!slug) {
    throw new Error(`No slug called ${slug} found`);
  }
  const post = await getPost(slug).catch(() => null);

  return json({post});
};

export default function BlogPostRoute() {
  let { post } = useLoaderData();

  const Component = useMdxComponent(post.code);
  console.log(Component);

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
        <p>By {post.frontmatter.description}</p>
      <Component />
    </div>
  )
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: () => <p>Note not found</p>,
			}}
		/>
	)
}