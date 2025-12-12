export interface TravelPlan {
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