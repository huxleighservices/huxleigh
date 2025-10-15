import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogPage() {
  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div>
        <section className="bg-card py-16 md:py-24">
          <div className="container text-center">
            <h1 className="font-headline text-4xl font-bold md:text-6xl">
              Huxleigh Blog
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Insights, analysis, and news from the forefront of artificial
              intelligence.
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <p className="text-muted-foreground">No blog posts available at the moment. Please check back later.</p>
          </div>
        </section>
      </div>
    );
  }
  
  const [firstPost, ...restOfPosts] = blogPosts;
  const firstPostImage = PlaceHolderImages.find(
    (img) => img.id === firstPost.imageId
  );

  return (
    <div>
      <section className="bg-card py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Huxleigh Blog
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Insights, analysis, and news from the forefront of artificial
            intelligence.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          {/* Featured Post */}
          <article className="mb-16">
            <Card className="grid md:grid-cols-2 overflow-hidden">
              <div className="p-8 flex flex-col justify-center">
                <CardHeader className="p-0">
                  <CardDescription>Featured Article</CardDescription>
                  <CardTitle className="text-3xl font-headline mt-2">
                    <Link
                      href={`/blog/${firstPost.slug}`}
                      className="hover:text-primary"
                    >
                      {firstPost.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <p className="text-muted-foreground mb-4">
                    {firstPost.excerpt}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    By {firstPost.author} on{' '}
                    {new Date(firstPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </CardContent>
              </div>

              {firstPostImage && (
                <div className="relative min-h-[300px] md:h-full">
                  <Image
                    src={firstPostImage.imageUrl}
                    alt={firstPost.title}
                    fill
                    className="object-cover"
                    data-ai-hint={firstPostImage.imageHint}
                  />
                </div>
              )}
            </Card>
          </article>

          {/* Grid of other posts */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {restOfPosts.map((post) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === post.imageId
              );
              return (
                <Card
                  key={post.slug}
                  className="overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  {image && (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block aspect-video relative"
                    >
                      <Image
                        src={image.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </Link>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
