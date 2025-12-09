import { Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface HeroSectionType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    topText: string;
};

const HeroSection: React.FC<HeroSectionType> = ({ searchQuery, setSearchQuery, title, subtitle, icon, topText }) => {
    return (
        <section className="relative py-20 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <Badge variant="outline" className="mb-4">
                    {icon}
                    {topText}
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    {subtitle}
                </p>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 text-base"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;