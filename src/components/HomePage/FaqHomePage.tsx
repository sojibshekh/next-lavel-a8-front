'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const faqs = [
  { question: 'How does TravelBuddy work?', answer: 'Create a profile, post your travel plans, and connect with travelers heading to similar destinations. Our matching algorithm helps you find compatible travel companions.' },
  { question: 'Is it safe to travel with strangers?', answer: 'We verify all users and provide safety features like reviews, messaging, and reporting. We recommend video calls before meeting and meeting in public places.' },
  { question: 'How much does it cost?', answer: 'Basic features are free forever. Premium plans start at $9.99/month for advanced features like unlimited messaging and verified badges.' },
  { question: 'Can I cancel my subscription?', answer: 'Yes, you can cancel anytime. Your premium features will remain active until the end of your billing period.' },
];


export default function FaqHomePage() {
    return (
         <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <Badge className="mb-4">FAQ</Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-6 shadow-card">
                <AccordionTrigger className="font-display text-lg font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
    )
}