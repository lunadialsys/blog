import { defineCollection } from "astro:content";
import {glob} from "astro/loaders";
import {z} from "astro/zod";

const blog = defineCollection({
    loader: glob({ base:'./blog', pattern:'*.mdx' }),
    schema: () => z.object({
        title: z.string(),
        authors: z.array(z.string()),
        tags: z.array(z.string()),
        date: z.coerce.date(),
    })
})

export const collections = {blog};
