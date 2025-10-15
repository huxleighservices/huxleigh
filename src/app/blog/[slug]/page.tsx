import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { summarizeTrendingTechArticle } from '@/ai/flows/summarize-trending-tech-articles';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot } from 'lucide-react';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

async function AISummary({ title, content }: { title: string; content: string }) {
  try {
    const { summary, commentary } = await summarizeTrendingTechArticle({
      articleTitle: title,
      articleContent: content,
    });
    return (
      <Alert className="bg-card my-8">
        <Bot className="h-4 w-4" />
        <AlertTitle className="font-headline text-lg text-primary">AI-Powered Insights</AlertTitle>
        <AlertDescription className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Summary</h3>
            <p className="text-muted-foreground">{summary}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Commentary</h3>
            <p className="text-muted-foreground">{commentary}</p>
          </div>
        </AlertDescription>
      </Alert>
    );
  } catch (error) {
    console.error("AI summary failed:", error);
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <article>
      <header className="relative h-[60vh] min-h-[450px] w-full flex items-end justify-center text-center">
         <div className="absolute inset-0 bg-gradient-to-t from-background via-black/70 to-black/50" />
         {image && (
          <Image
            src={image.imageUrl}
            alt={post.title}
            fill
            className="object-cover -z-10"
            data-ai-hint={image.imageHint}
            priority
          />
        )}
        <div className="container relative text-white pb-12">
            <h1 className="font-headline text-4xl font-bold md:text-6xl">
                {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-300">
                By {post.author} on {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>
        </div>
      </header>

      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <AISummary title={post.title} content={post.content} />
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
