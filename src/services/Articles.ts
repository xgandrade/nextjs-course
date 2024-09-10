import Article from "@/libs/database/Articles";

const HOME_LATEST_COUNT = 4;

const ArticleService = {
    getArticles: async (page: number = 1, limit: number = 10) => {
        const offset = (page - 1) * limit;
        const data = await Article.get({ limit, offset });
        const count = await Article.count({});

        return {
            data,
            metadata: {
                total: count,
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
        const count = await Article.count({});

        return {
            data,
            metadata: {
                total: count,
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
        const count = await Article.count({});

        return {
            data,
            metadata: {
                total: count,
                page,
                limit,
                offset
            }
        };
    }
}

export default ArticleService;