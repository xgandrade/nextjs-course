import { getGameImage, getGameUrl } from "@/helpers/games";
import { Games } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ScrollableGameListType = {
  games: Games[];
  width?: number;
  height?: number;
};

type HeroType = {
  games: Games[];
};

const ScrollableGameList = ({
  games,
  width = 175,
  height = 128,
}: ScrollableGameListType) => {
  return (
    <>
      {games.map((game) => {
        return (
          <Link
            href={getGameUrl(game.slug)}
            key={game.id}
            className="h-32 w-auto"
          >
            <Image
              className="h-full w-full object-cover brightness-75 hover:brightness-100"
              src={getGameImage(game.image)}
              alt={game.title}
              width={width}
              height={height}
            />
            {game.title}
          </Link>
        );
      })}
    </>
  );
};

export const Hero = ({ games }: HeroType) => {
  const style = {
    "--duration": "180s",
    "--item-size": "128px",
    "--item-count": "10",
    textAlign: "center",
  } as React.CSSProperties;

  return (
    <div className="container mx-auto my-6 w-full h-[42vh] flex-center gap-2">
      <div className="flex-center">
        <div className="flex-center flex-col">
          <Image
            src={`/assets/images/logo/nintendo-64.svg`}
            alt="Nintendo 64"
            width={160}
            height={150}
          />
          <h1 className="text-4xl my-6">The Best Nintendo 64 fan website</h1>
        </div>
      </div>

      <div
        className="ml-auto w-auto h-full border border-slate-700 p-2 rounded-lg"
        style={style}
      >
        <div className="flex h-full overflow-hidden gap-2">
          <div className="scroll-ttb flex flex-col gap-2">
            <ScrollableGameList games={games.slice(0, 10)} />
            <ScrollableGameList games={games.slice(0, 10)} />
          </div>
          <div className="scroll-btt flex flex-col gap-2">
            <ScrollableGameList games={games.slice(10, 20)} />
            <ScrollableGameList games={games.slice(10, 20)} />
          </div>
          <div className="scroll-ttb flex flex-col gap-2">
            <ScrollableGameList games={games.slice(20, 30)} />
            <ScrollableGameList games={games.slice(20, 30)} />
          </div>
          <div className="scroll-btt flex flex-col gap-2">
            <ScrollableGameList games={games.slice(30, 40)} />
            <ScrollableGameList games={games.slice(30, 40)} />
          </div>
        </div>
      </div>
    </div>
  );
};
