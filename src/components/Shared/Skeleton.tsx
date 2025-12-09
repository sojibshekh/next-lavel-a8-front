import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton as UISkeleton } from '@/components/ui/skeleton';

const Skeleton = () => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <Card key={i}>
                    <UISkeleton className="h-48 w-full" />
                    <CardHeader>
                        <UISkeleton className="h-6 w-3/4 mb-2" />
                        <UISkeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                        <UISkeleton className="h-4 w-full mb-2" />
                        <UISkeleton className="h-4 w-2/3" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Skeleton;