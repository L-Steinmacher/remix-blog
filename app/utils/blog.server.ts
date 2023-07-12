
import fs from 'fs/promises';
import path from 'path';
import  matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { getMdxOptions } from './mdxOptions.ts';

export type Post = {
    slug: string;
    title: string;
}

export type PostMarkdown = {
    title: string;
}

export async function getPosts(): Promise<Post[]> {
    const postPath = await fs.readdir(path.join(process.cwd(), 'content/blog'), {withFileTypes: true,} );

    const posts =  await Promise.all(
        postPath.map(async (post) => {
            const slug = post.name.replace('.mdx', '');
            const content = await fs.readFile(path.join(process.cwd(), 'content/blog', post.name), 'utf-8');
            const { data } = matter(content);
            const frontmatter = data as PostMarkdown;
            return {
                slug,
                title: frontmatter.title
            }
        }
    ));
    return posts;
}

export async function getPostBySlug(slug: string): Promise<Post> {
    const posts = await getPosts();
    const post = posts.find((post) => post.slug === slug);

    if (!post) throw new Error(`No post found with the slug ${slug}`);

    return post;
}

export async function getPost(slug: string) {
    const source = await fs.readFile(
      path.join(process.cwd(), 'content/blog', slug + ".mdx"),
      "utf-8"
    );

    const { file, ...options} = await getMdxOptions();

    const post = await bundleMDX({ source, ...options })
      .catch((e) => {
        console.error(e);
        throw e;
      });

    return post;
}
