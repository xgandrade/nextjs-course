import Article from "@/libs/database/Articles";

const HOME_LATEST_COUNT = 4;

const ArticleService = {
    getArticles: async (page: number = 1, limit: number = 10) => {
        const offset = (page - 1) * limit;
        const data = await Article.get({ limit, offset });
        const total = await Article.count({});
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            metadata: {
                total,
                totalPages,
                page,
                limit,
                offset
            }
        };
    },
    getHomeArticles: async (page: number = 1, limit: number = 10) => {
        const offset = (page - 1) * limit + HOME_LATEST_COUNT;
        const orderBy = { publishedAt: "desc" };
        const data = await Article.get({ orderBy, limit, offset });
        const total = await Article.count({});
        const totalPages = Math.ceil((total - HOME_LATEST_COUNT) / limit);

        return {
            data,
            metadata: {
                total,
                totalPages,
                page,
                limit,
                offset
            }
        };
    },
    getHomeLatestArticles: async () => {
        const limit = HOME_LATEST_COUNT;
        const offset = 0;
        const page = 1;
        const orderBy = { publishedAt: "desc" };
        const data = await Article.get({ limit, offset, orderBy });
        const total = await Article.count({});
        const totalPages = Math.ceil((total - HOME_LATEST_COUNT) / limit);

        return {
            data,
            metadata: {
                total,
                totalPages,
                page,
                limit,
                offset
            }
        };
    },
    getArticleBySlug: async (slug: string) => {
        return Article.getOne({ where: { slug } });
    }
}

export default ArticleService;