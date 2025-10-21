import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent.jsx";
import { Skeleton } from "@/components/ui/skeleton";

function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessSkeleton />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse" />
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-48 mx-auto mb-8" />
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;