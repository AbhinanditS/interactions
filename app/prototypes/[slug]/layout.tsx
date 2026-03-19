import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prototypes } from '../data'

export async function generateStaticParams() {
  return prototypes.map((proto) => ({
    slug: proto.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const proto = prototypes.find((p) => p.slug === slug)

  if (!proto) {
    return {}
  }

  return {
    title: proto.title,
    description: proto.description,
  }
}

export default async function PrototypeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const proto = prototypes.find((p) => p.slug === slug)

  if (!proto) {
    notFound()
  }

  return children
}
