import { Hero, PageWrapper, Pagination } from "@/components";
import ArticleService from "@/services/Articles";
import GamesService from "@/services/Games";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams?: { page?: string, limit?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  const articles = await ArticleService.getArticles(currentPage, limit);
  const latestArticles = await ArticleService.getHomeLatestArticles();

  const heroGames = await GamesService.getRandomGames(40);

  return (
    <PageWrapper>
      <Hero games={heroGames.data} />
      <div className="container mx-auto my-10">
        <h2 className="text-3xl my-6 underline">Latest Articles</h2>
        <div className="grid grid-cols-4 gap-4 h-[35vh]">
          {latestArticles.data.map((article) => {
            return (
              <Link
                href={`/articles/${article.slug}`}
                key={article.title}
                className="flex flex-center  relative overflow-hidden">
                <div className="h-full w-full ">
                  <Image
                    className="w-full h-full object-cover transition duration-500 hover:scale-105 rounded-lg"
                    src={`/assets/images/articles/${article.image}`}
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

      <div className="container mx-auto my-10">
        <h3 className="text-2xl my-6 underline">Articles</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <div className="flex flex-col gap-4">
              {articles.data.map((article) => {
                return (
                  <div key={article.title} className="flex rounded-md bg-slate-800 py-4">
                    <div className="flex items-center ">
                      <div className="h-40 rounded-r-lg overflow-hidden">
                        <Image
                          className="w-auto h-full object-cover transition duration-500 hover:scale-105 rounded-r-lg"
                          src={`/assets/images/articles/${article.image}`}
                          alt={article.title}
                          width={600}
                          height={400}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2 pl-4">
                      <h2 className="text-3xl mb-4 text-indigo-400">
                        {article.id} - {article.title}
                      </h2>
                      <p className="flex-grow">
                        {article.excerpt}
                      </p>
                      <Link
                        className="bg-slate-700 hover:bg-indigo-400/40 rounded-lg px-4 py-2 inline max-w-max"
                        href={`/articles/${article.slug}`}
                      >
                        Ler mais
                      </Link>
                    </div>
                  </div>
                );
              })}
              <div className="my-8">
                <Pagination currentPage={articles.metadata.page} totalPages={articles.metadata.totalPages} />
              </div>
            </div>
          </div>
          <div className="col-span-4 bg-emerald-500">B</div>
        </div>
      </div>
    </PageWrapper>
  );
}
