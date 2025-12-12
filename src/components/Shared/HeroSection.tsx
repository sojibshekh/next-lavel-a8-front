"use client"

import { Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface HeroSectionType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    maxBudget: number | "";
    setMaxBudget: (value: number | "") => void;
    travelTypeFilter: string;
    setTravelTypeFilter: (value: string) => void;
    dateFilter: { start: string; end: string };
    setDateFilter: (value: { start: string; end: string }) => void;

    title: string;
    subtitle: string;
    icon: React.ReactNode;
    topText: string;
};

const HeroSection: React.FC<HeroSectionType> = ({
    searchQuery,
    setSearchQuery,
    maxBudget,
    setMaxBudget,
    travelTypeFilter,
    setTravelTypeFilter,
    dateFilter,
    setDateFilter,
    title,
    subtitle,
    icon,
    topText
}) => {
    return (
        <section className="relative py-20 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
            {/* background blur effects */}
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
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    {subtitle}
                </p>

                {/* FILTER SECTION */}
                <div className="bg-white border rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-end max-w-5xl mx-auto text-left">

                    {/* Search */}
                    <div className="flex flex-col md:col-span-2">
                        <Label className="my-1 mb-2">Search</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search destination or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Max Budget */}
                    <div className="flex flex-col ">
                        <Label  className="my-1 mb-2">Max Budget</Label>
                        <Input
                            type="number"
                            placeholder="Max budget"
                            value={maxBudget}
                            onChange={(e) =>
                                setMaxBudget(e.target.value === "" ? "" : Number(e.target.value))
                            }
                        />
                    </div>

                    {/* Travel Type */}
                    <div className="flex flex-col">
                        <Label className="my-1 mb-2">Travel Type</Label>
                        <Select
                            value={travelTypeFilter || undefined}
                            onValueChange={setTravelTypeFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SOLO">SOLO</SelectItem>
                                <SelectItem value="FAMILY">FAMILY</SelectItem>
                                <SelectItem value="FRIENDS">FRIENDS</SelectItem>
                                <SelectItem value="COUPLE">COUPLE</SelectItem>
                                <SelectItem value="GROUP">GROUP</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Range */}
                    <div className="flex flex-col">
                        <Label className="my-1 mb-2">Date Range</Label>
                        <div className="flex gap-2">
                            <Input
                                type="date"
                                value={dateFilter.start}
                                onChange={(e) =>
                                    setDateFilter({ ...dateFilter, start: e.target.value })
                                }
                            />
                            <Input
                                type="date"
                                value={dateFilter.end}
                                onChange={(e) =>
                                    setDateFilter({ ...dateFilter, end: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
