"use client"

import React, { useEffect, useState } from "react"

import { ArrowRight, Code2, Grid, Heart, HeartHandshake, List, MapPin, Plane, Search, SlidersHorizontal, Users } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import HeroSection from "../Shared/HeroSection"
import { Skeleton } from "../ui/skeleton"
import TravelPlanCard from "./TravelPlanCard"
import Pagination from "../Shared/Pagination"
import { Button } from "../ui/button"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"

import { AnimatePresence, motion } from 'framer-motion';

interface TravelPlan {
    id: string
    destination: string
    startDate: string
    endDate: string
    budget: number
    travelType: string
    description: string
    user: {
        name: string
        email: string
    }
}

const TravelPlansPageClient = () => {
    const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // Filters
    const [maxBudget, setMaxBudget] = useState<number | "">("")
    const [travelTypeFilter, setTravelTypeFilter] = useState<string>("")
    const [dateFilter, setDateFilter] = useState<{ start: string; end: string }>({
        start: "",
        end: "",
    })

    useEffect(() => {
        loadTravelPlans()
    }, [currentPage])

    const loadTravelPlans = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/travel-plans?limit=12&page=${currentPage}`
            )
            const data = await res.json()

            if (data.success) {
                setTravelPlans(data.data)
                setTotalPages(data.meta.totalPage || 1)
            }
        } catch (error) {
            console.error("Failed to fetch travel plans:", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Filtering logic
    const filteredPlans = travelPlans.filter((plan) => {
        const matchesSearch =
            plan.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plan.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesBudget = maxBudget === "" || plan.budget <= maxBudget
        const matchesTravelType = travelTypeFilter === "" || plan.travelType === travelTypeFilter
        const matchesDate =
            (dateFilter.start === "" || new Date(plan.startDate) >= new Date(dateFilter.start)) &&
            (dateFilter.end === "" || new Date(plan.endDate) <= new Date(dateFilter.end))

        return matchesSearch && matchesBudget && matchesTravelType && matchesDate
    })

    return (
        <>


   
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero */}
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 gradient-ocean opacity-5" />
          <div className="container mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Plane className="w-8 h-8 text-primary" />
                <Badge variant="secondary">Live Travel Plans</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Find Your <span className="gradient-text">Travel Buddy</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Browse travel plans from adventurers around the world and find your perfect match.
                Join existing trips or create your own.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations, trips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 w-full"
                  />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative w-[180px] h-12">
                    <select
                      value={travelTypeFilter}
                      onChange={(e) => setTravelTypeFilter(e.target.value)}
                      className="w-full h-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="date">Date: Soonest</option>
                      <option value="budget-low">Budget: Low to High</option>
                      <option value="budget-high">Budget: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  <Button variant="outline" className="h-12 px-6 gap-2" onClick={() => setTravelTypeFilter("")}>
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </Button>
                </div>
              </div>

              {/* Expanded Filters */}
              <AnimatePresence>
                {/* {isFiltersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="max-w-3xl mx-auto mt-6 text-left"
                  >
                    <Card className="border-border/50">
                      <CardContent className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">Filters</h3>
                          <Button variant="ghost" size="sm" onClick={() => setIsFiltersOpen(false)}><X className="w-4 h-4" /></Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label>Travel Type</Label>
                            <div className="flex flex-wrap gap-2">
                              {travelTypes.map((type) => (
                                <Badge
                                  key={type}
                                  variant={selectedType === type ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => setSelectedType(type)}
                                >
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label>Max Budget: ${budgetRange[1]}</Label>
                            <input
                              type="range"
                              min="0"
                              max="10000"
                              step="100"
                              value={budgetRange[1]}
                              onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
                              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )} */}
              </AnimatePresence>

              {/* Quick Type Filters */}
              {/* {!isFiltersOpen && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {travelTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={selectedType === type ? "gradient-primary text-primary-foreground" : ""}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              )} */}
            </motion.div>
          </div>
        </section>

        {/* Results Header */}
        <div className="container mx-auto px-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredPlans.length}</span> trips found
            </p>
            <div className="flex items-center gap-2">
           
            </div>
          </div>
        </div>

        {/* Results */}
        <section className="pb-20 px-4">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="h-96">
                    <Skeleton className="h-48 w-full rounded-t-xl" />
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className= "grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.length > 0 ? (
                  filteredPlans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/trip/${plan.id}`}>
                        <Card className={`border-border/50 overflow-hidden group hover:shadow-elegant transition-all duration-300 `}>
                          {/* Image */}
                          <div className={`relativew-64 min-w-[16rem] aspect-[4/3]'`}>
                            <img
                              src={plan.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600'}
                              alt={plan.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                            
                            >
                              <HeartHandshake className={`w-4 h-4 fill-red-500 text-red-500`} />
                            </Button>

                            <div className="absolute bottom-3 left-3 right-3">
                              <Badge className="gradient-primary text-primary-foreground capitalize mb-2">
                              
                              </Badge>
                              <h3 className="font-semibold text-lg text-primary-foreground">{plan.id}</h3>
                            </div>
                          </div>

                          {/* Content */}
                          <CardContent className={`p-5 list`}>
                            <div className="flex items-center gap-1 text-muted-foreground mb-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-medium">{plan.destination}</span>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {plan.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {/* {plan.interests && plan.interests.map((interest: string) => (
                                <Badge key={interest} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))} */}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <span className="flex items-center gap-1">
                                {/* <Calendar className="w-4 h-4" /> {plan.dates} */}
                              </span>
                              <span className="font-medium text-foreground">{plan.budget}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {/* <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                                  <AvatarImage src={plan.user.avatar} />
                                  <AvatarFallback>{plan.user.name.charAt(0)}</AvatarFallback>
                                </Avatar> */}
                                <div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium">{plan.user.name}</span>
                                    {/* {plan.user.verified && (
                                      <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">✓</Badge>
                                    )} */}
                                  </div>
                                  {/* <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-muted-foreground">{plan.user.rating}</span>
                                  </div> */}
                                </div>
                              </div>

                              <Badge variant="outline" className="gap-1">
                                <Users className="w-3 h-3" />
                                {/* {plan.maxBuddies - plan.buddies} spots */}
                              </Badge>
                            </div>

                            <Button className="w-full mt-4 gradient-primary text-primary-foreground group">
                              View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-xl text-muted-foreground">No trips found. Be the first to create one!</p>
                    <Button className="mt-4" asChild>
                      <Link href="/dashboard/travelplans/new">Create Trip</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Trips
              </Button>
            </div>
          </div>
        </section>
      </div>
  


            {/* Hero Section */}
           <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                maxBudget={maxBudget}
                setMaxBudget={setMaxBudget}
                travelTypeFilter={travelTypeFilter}
                setTravelTypeFilter={setTravelTypeFilter}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                title="Travel Plans"
                subtitle="Explore trips planned by users with budget, dates, and travel type"
                icon={<Code2 className="w-4 h-4 mr-2" />}
                topText="Travel"
            />

            {/* Filters — Premium UI */}
          
            {/* Travel Plans Section */}
            <section className="py-16 max-w-7xl mx-auto px-6">
                {isLoading ? (
                    <Skeleton />
                ) : filteredPlans.length === 0 ? (
                    <div className="text-center py-20">
                        <Code2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">No travel plans found</h3>
                        <p className="text-muted-foreground">
                            {searchQuery
                                ? "Try a different search term or adjust filters"
                                : "Travel plans coming soon"}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPlans.map((plan) => (
                                <TravelPlanCard key={plan.id} travelPlan={plan} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        )}
                    </>
                )}
            </section>
        </>
    )
}

export default TravelPlansPageClient
