import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";


export default function FaqPage() {
    return (
        <section className="container mx-auto px-4 py-16">
            <h1
                className="text-3xl md:text-4xl font-bold text-center mb-10"
            >
                Frequently Asked Questions (FAQ)
            </h1>

            <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl">
                <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full space-y-4">

                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is tour mate</AccordionTrigger>
                            <AccordionContent>
                                tour mate is a mobile application that helps travelers find compatible companions for their trips.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>How do meet mate</AccordionTrigger>
                            <AccordionContent>
                                To find a travel mate, simply create a profile, specify your travel preferences, and browse through potential matches. You can connect with other users, chat, and plan your trips together.    
                            </AccordionContent>
                        </AccordionItem>


                    </Accordion>
                </CardContent>
            </Card>
        </section>
    )
}