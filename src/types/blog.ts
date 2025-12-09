export interface IBlog {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail?: string;
    isFeatured: boolean;
    tags: string[];
    views: number;
    author: {
        name: string;
        email?: string;
        picture?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}