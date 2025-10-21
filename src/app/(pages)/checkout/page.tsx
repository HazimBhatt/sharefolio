"use client";

import { Suspense } from "react";
import CheckoutContent from "./CheckoutContent.jsx";
import { Skeleton } from "@/components/ui/skeleton"; 

function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutContent />
    </Suspense>
  );
}

// Loading skeleton component
function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#7332a8]/5 to-background">
      <div className="max-w-2xl mx-auto px-4 py-8 pt-16">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center">
                <Skeleton className="w-8 h-8 rounded-full" />
                {item < 3 && <Skeleton className="w-16 h-1 mx-2" />}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-80 rounded-2xl" />
            <Skeleton className="h-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;