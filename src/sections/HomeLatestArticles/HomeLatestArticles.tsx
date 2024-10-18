import { getArticleImage, getArticleUrl } from "@/helpers/articles";
import ArticleService from "@/services/Articles";
import Image from "next/image";
import Link from "next/link";

export default async function HomeLatestArticles() {
    const latestArticles = await ArticleService.getHomeLatestArticles();

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-3xl my-6 underline">Latest Articles</h2>
            <div className="grid grid-cols-4 gap-4 h-[35vh]">
                {latestArticles.data.map((article) => {
                    return (
                        <Link
                            href={getArticleUrl(article.slug)}
                            key={article.title}
                            className="flex flex-center  relative overflow-hidden">
                            <div className="h-full w-full ">
                                <Image
                                    className="w-full h-full object-cover transition duration-500 hover:scale-105 rounded-lg"
                                    src={getArticleImage(article.image)}
                                    alt={article.title}
                                    width={600}
                                    height={400}
                                />
                            </div>
                            <p className="font-center absolute bottom-0 pt-6 pb-2 px-2 bg-gradient-to-t from-slate-900 via-slate-800 to-transparent w-full">
                                {article.id} - {article.title}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}