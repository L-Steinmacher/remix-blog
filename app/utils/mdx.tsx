import { LRUCache } from "lru-cache/min"
import React from 'react'
import * as mdxBundler from 'mdx-bundler/client'

const mdxComponentCache = new LRUCache<
  string,
  React.ComponentType<any>
>({
  max: 1000,
})

export function getMdxComponent(code: string) {
  const Component = mdxBundler.getMDXComponent(code)
  function MdxComponent({components, ...rest}: Parameters<typeof Component>[0]) {
    return (
      <Component components={{...components}} {...rest} />
    )
  }
  return MdxComponent
}

export function useMdxComponent(code: string) {
  const Component = React.useMemo(() => {
    if (mdxComponentCache.has(code)) {
      return mdxComponentCache.get(code)!
    }
    const component = getMdxComponent(code)
    mdxComponentCache.set(code, component)
    return component
  }, [code])

  return Component;
}
