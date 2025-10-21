// app/payment-success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap, Rocket, Crown, ArrowRight, Coins, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');
  const amount = searchParams.get('amount');
  const paymentId = searchParams.get('payment_id');
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plans = {
    free: { name: "Starter", icon: Zap, tokens: 1 },
    pro: { name: "Creator", icon: Rocket, tokens: 2 },
    enterprise: { name: "Professional", icon: Crown, tokens: "Unlimited" }
  };

  const currentPlan = plans[planId ] || plans.free;
  const Icon = currentPlan.icon;

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 " />
        </motion.div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold  mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your {currentPlan.name} plan has been activated.
        </p>

        {/* Plan Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-green-200 p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-[#7332a8] to-[#8a3dc2]">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{currentPlan.name} Plan</h3>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Portfolio Tokens:</span>
              <span className="font-medium">{currentPlan.tokens}</span>
            </div>
            {amount && amount !== '0' && (
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-medium flex items-center"><IndianRupee/>{amount}</span>
              </div>
            )}
            {paymentId && (
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-medium text-xs">{paymentId.slice(-8)}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Button asChild size="lg" className="w-full bg-[#7332a8] hover:bg-[#6332a8]">
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/pricing">
              View Other Plans
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;