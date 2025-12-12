"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"

interface TravelPlanCardProps {
    travelPlan: any
}

const TravelPlanCard = ({ travelPlan }: TravelPlanCardProps) => {
    return (
        <Link href={`/all-travel/${travelPlan.id}`} key={travelPlan.id}>
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden py-0 h-full flex flex-col">
                
                {/* Card Header */}
                <CardHeader className="flex-1">
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">
                        {travelPlan.destination}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                        {travelPlan.description || "No description available"}
                    </p>
                </CardHeader>

                <CardContent className="pb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="text-xs">
                            {travelPlan.travelType}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                            BDT {travelPlan.budget}
                        </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(travelPlan.startDate).toLocaleDateString()}</span>
                            <span>-</span>
                            <span>{new Date(travelPlan.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{travelPlan.user?.name}</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                            e.preventDefault()
                            window.location.href = `all-travel/${travelPlan.id}`
                        }}
                    >
                        View Details
                        <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                </CardContent>
            </Card>
        </Link>
    )
}

export default TravelPlanCard
