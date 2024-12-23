import { PageWrapper } from "@/components";
import { getGameImage } from "@/helpers/games";
import GameService from "@/services/Games";
import Image from "next/image";

type GameDetailPageProps = {
  params: { slug: string };
};

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = params;
  const game = await GameService.getGameBySlug(slug);

  if (!game) {
    return (
      <PageWrapper>
        <div className="container mx-auto my-6">
          <h1 className="text-3xl my-6">Game not found</h1>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto my-6">
        <div className="w-2/3">
          <h1 className="text-3xl my-6">{game.title}</h1>
          <Image
            className="my-6 w-full h-full object-cover rounded-lg"
            src={getGameImage(game.image)}
            alt={game.title}
            width={600}
            height={400}
          />
          <div className="my-6 flex flex-col">
            <p className="my-2 p-2 bg-slate-700 rounded-lg">
              {game.platform} - {game.year}
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const games = await GameService.getGamesList();

  if (!games || !games.data) {
    console.error("No games found");
    return [];
  }

  const gameSlugs = games.data.map((game) => ({
    slug: game.slug,
  }));

  return gameSlugs;
}

export const dynamicParams = false;
