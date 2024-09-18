import { PrismaClient } from "@prisma/client";
import articles from "../../src/data/articles.json";
import games from "../../src/data/games.json";
import { slugfy } from "../../src/helpers/slugfy";

const prisma = new PrismaClient();
const isDev = process.env.NODE_ENV === "development";

async function main() {
    console.log('\nDB Seeds ... initializing...');

    if (!isDev) {
        throw new Error("Cannot seed in production, NODE_ENV is not 'development' environment.");
    }

    const [, , ...args] = process.argv;
    const truncate = !!args.find(arg => arg === '-truncate');
    const articles = !!args.find(arg => arg === 'articles');
    const games = !!args.find(arg => arg === 'games');

    if (truncate) {
        if (articles) await truncateArticles();
        if (games) await truncateGamesAndGenres();
    }

    if (articles) await seedArticles();
    if (games) await seedGamesAndGenres();
}

async function truncateArticles() {
    console.log('Truncating articles...');
    await prisma.article.deleteMany();
    await prisma.$executeRawUnsafe("DELETE FROM SQLITE_SEQUENCE WHERE name=$1;", "Article");
}

async function truncateGamesAndGenres() {
    console.log('Truncating games and genres...');

    await prisma.gameGenre.deleteMany();
    await prisma.games.deleteMany();
    await prisma.genres.deleteMany();

    await prisma.$executeRawUnsafe("DELETE FROM SQLITE_SEQUENCE WHERE name=$1;", "GameGenre");
    await prisma.$executeRawUnsafe("DELETE FROM SQLITE_SEQUENCE WHERE name=$1;", "Games");
    await prisma.$executeRawUnsafe("DELETE FROM SQLITE_SEQUENCE WHERE name=$1;", "Genres");
}

async function seedArticles() {
    console.log('Seeding articles...');
    if (!isDev) throw new Error("Cannot seed in production, NODE_ENV is not 'development' environment.");

    for (let article of articles) {
        const record = await prisma.article.create({
            data: {
                title: article.title,
                slug: slugfy(article.title),
                excerpt: article.excerpt,
                content: article.content,
                image: article.image,
                publishedAt: new Date(article.publish_date),
            },
        });
    }
}

async function seedGamesAndGenres() {
    console.log('Seeding games and genres...');

    for (let game of games) {
        const genres = game.genre.map((title) => {
            const slug = slugfy(title);
            return {
                genre: {
                    connectOrCreate: {
                        where: { slug },
                        create: { title, slug }
                    }
                }
            };
        })

        const record = await prisma.games.create({
            data: {
                title: game.title,
                slug: game.slug,
                year: game.year,
                image: game.fileName,
                link: game.link || '#',
                platform: 'Nintendo 64',
                genres: {
                    create: genres
                }
            },
        });

        console.log('*** created game: ', record.id, record.title);
    }


}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
