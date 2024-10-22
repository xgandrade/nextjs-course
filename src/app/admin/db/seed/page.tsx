import { PageWrapper } from "@/components";
import { seed, truncate } from "../../../../../prisma/seed/seed";

export default async function SeedPage() {

    let ranTruncate: boolean = false;
    let ranSeed: boolean = false;

    try {
        if (process.env.DB_TRUNCATE) {
            await truncate();
            ranTruncate = true;
        }

        if (process.env.DB_SEED) {
            await seed();
            ranSeed = true;
        }

        return (
            <PageWrapper>
                <div className="bg-slate-800 py-8">
                    <div className="container mx-auto text-slate-100 px-4">
                        <p>
                            Truncate: {ranTruncate ? 'YES' : 'NO'}, SEED {ranSeed ? 'YES' : 'NO'}
                        </p>
                        <p className="my-4 text-red-500 font-semibold">
                            Delete DB_SEED and DB_TRUNCATE from your .env file.
                        </p>
                    </div>
                </div>
            </PageWrapper>
        );
    }
    catch (e) {
        console.log('Error SeedPage:', e);
        return (
            <PageWrapper>
                <div className="bg-slate-800 py-8">
                    <div className="container mx-auto text-slate-100 px-4">
                        <p className="my-4 text-red-500 font-semibold">
                            Something went wrong.
                        </p>
                    </div>
                </div>
            </PageWrapper>
        );
    }
}