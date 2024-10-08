import { PageWrapper } from "@/components";
import ArticleService from "@/services/Articles";
import Image from "next/image";

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const article = await ArticleService.getArticleBySlug(slug);

    if (!article) {
        return (
            <PageWrapper>
                <div className="container mx-auto my-6">
                    <h1 className="text-3xl my-6">
                        Article not found
                    </h1>
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <div className="container mx-auto my-6">
                <div className="w-2/3">
                    <h1 className="text-3xl my-6">
                        {article.title}
                    </h1>
                    <Image
                        className="my-6 w-full h-full object-cover rounded-lg"
                        src={`/assets/images/articles/${article.image}`}
                        alt={article.title}
                        width={600}
                        height={400}
                    />
                    <div className="my-6 flex flex-col">
                        <p className="my-2 p-2 bg-slate-700 rounded-lg">{article.excerpt}</p>
                        <p className="my-2">{article.content}</p>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}