
export interface IProject {
    id: number;
    name: string;
    slug: string;
    description: string;
    liveSiteUrl: string;
    frontendGitUrl?: string;
    backendGitUrl?: string;
    thumbnail?: string;
    techStack: string[];
    features: string[];
    startDate: Date;
    author: {
        name: string;
        email?: string;
        picture?: string;
    };
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}