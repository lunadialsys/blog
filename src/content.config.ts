import { defineCollection } from "astro:content";
import {glob, file} from "astro/loaders";
import {z} from "astro/zod";

const blog = defineCollection({
    loader: glob({
        base:'./blog',
        pattern: '**/index.mdx',
        generateId: (e) => e.entry.match(/^(.+)\/index\.mdx$/)![1]
    }),
    schema: () => z.object({
        title: z.string(),
        authors: z.array(z.string()),
        tags: z.array(z.string()),
        date: z.coerce.date(),
        draft: z.boolean().optional(),
        foreword: z.string().optional(),
        series: z.string().optional(),
    })
});

const series = defineCollection({
    loader: file("blog/series.json"),
    schema: () => z.object({
        name: z.string(),
        line: z.string()
    }),
})

export const collections = {blog, series};
