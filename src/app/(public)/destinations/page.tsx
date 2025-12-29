'use client';


import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar, Filter,
  Globe,
  Heart,
  MapPin,
  Plane,
  Search,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const destinations = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    travelers: 1250,
    rating: 4.9,
    continent: 'Europe',
    activePlans: 24,
    avgBudget: '$1,800',
    bestTime: 'Apr - Oct',
    tags: ['Romantic', 'Culture', 'Food'],
    description: 'The City of Light offers iconic landmarks, world-class cuisine, and unforgettable experiences.',
    trending: true,
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    travelers: 980,
    rating: 4.8,
    continent: 'Asia',
    activePlans: 18,
    avgBudget: '$2,200',
    bestTime: 'Mar - May, Sep - Nov',
    tags: ['Tech', 'Culture', 'Food'],
    description: 'Where ancient traditions meet cutting-edge technology in perfect harmony.',
    trending: true,
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    travelers: 756,
    rating: 4.7,
    continent: 'Asia',
    activePlans: 15,
    avgBudget: '$1,200',
    bestTime: 'Apr - Oct',
    tags: ['Beach', 'Wellness', 'Nature'],
    description: 'Tropical paradise known for yoga retreats, stunning beaches, and spiritual experiences.',
    trending: false,
  },
  {
    id: '4',
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    travelers: 1420,
    rating: 4.6,
    continent: 'Americas',
    activePlans: 32,
    avgBudget: '$2,500',
    bestTime: 'Apr - Jun, Sep - Nov',
    tags: ['Urban', 'Art', 'Shopping'],
    description: 'The city that never sleeps - Broadway, Central Park, and endless possibilities.',
    trending: true,
  },
  {
    id: '5',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    travelers: 890,
    rating: 4.8,
    continent: 'Europe',
    activePlans: 21,
    avgBudget: '$1,500',
    bestTime: 'May - Sep',
    tags: ['Beach', 'Architecture', 'Nightlife'],
    description: 'Gaudí architecture, Mediterranean beaches, and vibrant nightlife await.',
    trending: false,
  },
  {
    id: '6',
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    travelers: 650,
    rating: 4.7,
    continent: 'Oceania',
    activePlans: 12,
    avgBudget: '$2,800',
    bestTime: 'Sep - Nov, Mar - May',
    tags: ['Beach', 'Nature', 'Adventure'],
    description: 'Iconic harbor, beautiful beaches, and a laid-back Australian vibe.',
    trending: false,
  },
  {
    id: '7',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    travelers: 540,
    rating: 4.9,
    continent: 'Europe',
    activePlans: 9,
    avgBudget: '$2,000',
    bestTime: 'Apr - Oct',
    tags: ['Romantic', 'Beach', 'Photography'],
    description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters.',
    trending: true,
  },
  {
    id: '8',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    travelers: 720,
    rating: 4.5,
    continent: 'Asia',
    activePlans: 16,
    avgBudget: '$3,200',
    bestTime: 'Nov - Mar',
    tags: ['Luxury', 'Shopping', 'Modern'],
    description: 'Futuristic skyline, luxury experiences, and desert adventures.',
    trending: false,
  },
];

const continents = ['All', 'Europe', 'Asia', 'Americas', 'Oceania', 'Africa'];

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [favorited, setFavorited] = useState<string[]>([]);
  // Use explicit type to avoid unused var warning if we were using it, but we aren't, so removed usage.

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorited(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredDestinations = destinations.filter(dest => {
    if (searchQuery && !dest.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !dest.country.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedContinent !== 'All' && dest.continent !== selectedContinent) return false;
    return true;
  });

  const trendingDestinations = destinations.filter(d => d.trending);

  return (

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 gradient-sunset opacity-5" />
          <div className="container mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Globe className="w-8 h-8 text-primary" />
                <Badge variant="secondary">195+ Destinations</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Explore <span className="gradient-text">Destinations</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Discover the world most sought-after travel destinations and find travel buddies
                who share your wanderlust.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12"
                  />
                </div>
                <Button variant="outline" className="h-12 px-6 gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trending Destinations */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-display font-bold">Trending Now</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trendingDestinations.map((dest, index) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0"
                >
                  <Link href={`/explore?destination=${dest.name}`}>
                    <div className="relative w-48 h-64 rounded-2xl overflow-hidden group cursor-pointer">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-semibold text-primary-foreground">{dest.name}</h3>
                        <p className="text-sm text-primary-foreground/80">{dest.country}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs gap-1">
                            <Plane className="w-3 h-3" /> {dest.activePlans}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Continent Tabs */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <Tabs value={selectedContinent} onValueChange={setSelectedContinent}>
              <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-6 mb-8">
                {continents.map((continent) => (
                  <TabsTrigger key={continent} value={continent} className="text-xs sm:text-sm">
                    {continent}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={selectedContinent} className="mt-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDestinations.map((dest, index) => (
                    <motion.div
                      key={dest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/explore?destination=${dest.name}`}>
                        <Card className="border-border/50 overflow-hidden group hover:shadow-elegant transition-all duration-300 h-full cursor-pointer">
                          {/* Image with overlay */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={dest.image}
                              alt={dest.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex gap-2">
                              <Badge className="glass text-xs">{dest.continent}</Badge>
                              {dest.trending && (
                                <Badge className="gradient-primary text-primary-foreground text-xs gap-1">
                                  <TrendingUp className="w-3 h-3" /> Hot
                                </Badge>
                              )}
                            </div>

                            {/* Favorite Button */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => toggleFavorite(dest.id, e)}
                            >
                              <Heart className={`w-4 h-4 ${favorited.includes(dest.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>

                            {/* Quick Stats Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex items-center justify-between text-primary-foreground text-sm">
                                <span className="flex items-center gap-1">
                                  <Plane className="w-4 h-4" /> {dest.activePlans} trips
                                </span>
                                <span className="font-semibold">{dest.avgBudget} avg</span>
                              </div>
                            </div>
                          </div>

                          <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-semibold font-display">{dest.name}</h3>
                                <p className="text-muted-foreground flex items-center gap-1 text-sm">
                                  <MapPin className="w-3 h-3" /> {dest.country}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-sm">{dest.rating}</span>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {dest.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {dest.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4 text-primary" />
                                <span className="text-muted-foreground">{dest.travelers} travelers</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="text-muted-foreground text-xs">{dest.bestTime}</span>
                              </div>
                            </div>

                            <Button className="w-full group" variant="outline">
                              Explore Trips
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-16">
                <Globe className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <Card className="gradient-primary overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                  Dont See Your Dream Destination?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-6 max-w-2xl mx-auto">
                  Create your own travel plan and let other adventurers find you.
                  Start your journey today!
                </p>
                <Link href="/create-trip">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Create Your Trip <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

  );
};

export default Destinations;
