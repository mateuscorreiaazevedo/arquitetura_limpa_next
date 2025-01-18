import dynamic from 'next/dynamic'

export * from './post-item'
export const PostList = dynamic(() => import('./post-list'))
