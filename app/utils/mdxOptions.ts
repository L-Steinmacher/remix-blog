// utils/mdxOptions.ts
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { type Pluggable } from 'unified';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import { type BundleMDX } from 'mdx-bundler/dist/types.js';

export async function getMdxOptions(): Promise<Partial<BundleMDX<{[key: string]: any}>>> {
    return {
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkGfm as unknown as Pluggable<any[]>,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeAutolinkHeadings as unknown as Pluggable<any[]>,
          rehypeSlug as unknown as Pluggable<any[]>,
          rehypeHighlight as unknown as Pluggable<any[]>,
        ];

        return options;
      },
    }
  }


