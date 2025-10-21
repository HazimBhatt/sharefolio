// app/checkout/CheckoutContent.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  X,
  Tag,
  Zap,
  Rocket,
  Crown,
  Coins,
  Sparkles,
  Shield,
  CreditCard,
  Lock,
  Gift,
  IndianRupee
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

// Mock coupon data
const availableCoupons = [
  {
    id: "1",
    code: "WELCOME10",
    discountType: 'percentage',
    discountValue: 10,
    minAmount: 5,
    validUntil: new Date('2025-12-31'),
    isActive: true,
    usedBy: []
  },
  {
    id: "2",
    code: "SAVE20",
    discountType: 'percentage',
    discountValue: 20,
    minAmount: 10,
    maxDiscount: 15,
    validUntil: new Date('2025-11-30'),
    isActive: true,
    usedBy: []
  },
  {
    id: "3",
    code: "FLAT5",
    discountType: 'fixed',
    discountValue: 5,
    minAmount: 10,
    validUntil: new Date('2025-10-31'),
    isActive: true,
    usedBy: []
  }
];

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');
  const isUpgrade = searchParams.get('upgrade') === 'true';
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const couponInputRef = useRef(null);

  // Plan details
  const plans = {
    free: {
      name: "Starter",
      price: 0,
      tokens: 1,
      icon: Zap,
      description: "Perfect for getting started",
      subscriptionType: "free"
    },
    pro: {
      name: "Creator",
      price: 499,
      tokens: 2,
      icon: Rocket,
      description: "Perfect for growing creators",
      subscriptionType: "premium"
    },
    enterprise: {
      name: "Professional",
      price: 999,
      tokens: null, // unlimited
      icon: Crown,
      description: "For unlimited portfolio needs",
      subscriptionType: "pro"
    }
  };

  const currentPlan = plans[planId] || plans.pro;
  const Icon = currentPlan.icon;

  // Calculate prices
  const originalPrice = currentPlan.price;
  const discountAmount = appliedCoupon ? 
    appliedCoupon.discountType === 'percentage' 
      ? Math.min(
          originalPrice * (appliedCoupon.discountValue / 100),
          appliedCoupon.maxDiscount || Infinity
        )
      : appliedCoupon.discountValue
    : 0;

  const finalPrice = Math.max(0, originalPrice - discountAmount);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    if (finalPrice > 0 && !razorpayLoaded) {
      loadRazorpay();
    }
  }, [finalPrice, razorpayLoaded]);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    setCouponMessage({ text: '', type: '' });

    // Simulate API call
    setTimeout(() => {
      const coupon = availableCoupons.find(
        c => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive
      );

      if (!coupon) {
        setCouponMessage({ 
          text: 'Invalid coupon code', 
          type: 'error' 
        });
        setIsApplyingCoupon(false);
        return;
      }

      if (coupon.validUntil < new Date()) {
        setCouponMessage({ 
          text: 'Coupon has expired', 
          type: 'error' 
        });
        setIsApplyingCoupon(false);
        return;
      }

      if (coupon.minAmount && originalPrice < coupon.minAmount) {
        setCouponMessage({ 
          text: `Minimum purchase of $${coupon.minAmount} required`, 
          type: 'error' 
        });
        setIsApplyingCoupon(false);
        return;
      }

      setAppliedCoupon(coupon);
      setCouponMessage({ 
        text: 'Coupon applied successfully!', 
        type: 'success' 
      });
      setCouponCode('');
      setIsApplyingCoupon(false);
    }, 1000);
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponMessage({ text: '', type: '' });
  };

  // Create Razorpay order
  const createRazorpayOrder = async () => {
    try {
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: finalPrice * 100, 
          currency: 'INR',
          planId: planId,
          couponCode: appliedCoupon?.code || null,
          isUpgrade: isUpgrade
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  };

  // Verify payment and update user plan
  const verifyPaymentAndUpdatePlan = async (paymentId, orderId, signature) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This sends cookies
        body: JSON.stringify({
          paymentId,
          orderId,
          signature,
          planId,
          couponCode: appliedCoupon?.code || null,
          isUpgrade,
          amount: finalPrice
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment verification failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  // Handle free plan activation
  const activateFreePlan = async () => {
    try {
      const response = await fetch('/api/update-user-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This sends cookies
        body: JSON.stringify({
          planId: 'free',
          isUpgrade: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to activate free plan');
      }

      return await response.json();
    } catch (error) {
      console.error('Error activating free plan:', error);
      throw error;
    }
  };

  // Handle payment
  const handlePayment = async () => {
    if (!isAuthenticated) {
      alert('Please log in to complete your purchase.');
      router.push('/login');
      return;
    }

    if (finalPrice === 0) {
      // Handle free plan
      setIsProcessing(true);
      try {
        await activateFreePlan();
        router.push('/payment-success?plan=free&amount=0');
      } catch (error) {
        console.error('Error activating free plan:', error);
        alert(error.message || 'Failed to activate free plan. Please try again.');
        setIsProcessing(false);
      }
      return;
    }

    if (!razorpayLoaded) {
      alert('Payment gateway is loading. Please wait...');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order on backend
      const order = await createRazorpayOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Portfolio Pro',
        description: `${currentPlan.name} Plan`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend with signature
            await verifyPaymentAndUpdatePlan(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
            
            // Redirect to success page
            router.push(`/payment-success?plan=${planId}&amount=${finalPrice}&payment_id=${response.razorpay_payment_id}`);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert(error.message || 'Payment verification failed. Please contact support.');
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#7332a8'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert(error.message || 'Failed to initialize payment. Please try again.');
      setIsProcessing(false);
    }
  };

  // Animation variants
  const couponAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  };

  const successCheckmark = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#7332a8]/5 to-background">
      <div className="max-w-2xl mx-auto px-4 py-8 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7332a8] text-white text-sm font-medium">
                1
              </div>
              <div className="w-16 h-1 bg-[#7332a8] mx-2" />
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7332a8] text-white text-sm font-medium">
                2
              </div>
              <div className="w-16 h-1 bg-muted mx-2" />
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                3
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Order Summary */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
                <p className="text-muted-foreground">
                  {isUpgrade ? 'Upgrade your plan' : 'Get started with'} {currentPlan.name}
                </p>
              </div>

              {/* Plan Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[#7332a8] to-[#8a3dc2]">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                    <p className="text-muted-foreground text-sm">{currentPlan.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Plan</span>
                    <span className="font-medium">{currentPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Portfolio Tokens</span>
                    <span className="font-medium">
                      {currentPlan.tokens === null ? 'Unlimited' : `${currentPlan.tokens} tokens`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Billing</span>
                    <span className="font-medium">One-time payment</span>
                  </div>
                </div>
              </motion.div>

              {/* Security Features */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Secure Payment
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Encrypted transaction
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    PCI DSS compliant
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Money-back guarantee
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Payment */}
            <div className="space-y-6">
              {/* Pricing Breakdown */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-border bg-card p-2"
              >
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="flex items-center gap-2"><IndianRupee/>{originalPrice.toFixed(2)}</span>
                  </div>

                  {/* Coupon Discount */}
                  <AnimatePresence>
                    {appliedCoupon && (
                      <motion.div
                        variants={couponAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex justify-between items-center text-green-500"
                      >
                        <span className="flex items-center gap-2">
                          <motion.span
                            variants={successCheckmark}
                            initial="initial"
                            animate="animate"
                          >
                            <Check className="w-4 h-4" />
                          </motion.span>
                          Discount ({appliedCoupon.code})
                        </span>
                        <span className="flex items-center gap-2"><IndianRupee/>{discountAmount.toFixed(2)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total</span>
                      <div className="flex items-center gap-2">
                        {appliedCoupon && (
                          <span className="text-sm text-muted-foreground line-through flex items-center gap-2">
                            <IndianRupee/>{originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className={cn(
                          "text-[#7332a8] flex items-center gap-2",
                          appliedCoupon && "text-green-500"
                        )}>
                           <IndianRupee/>{finalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    {finalPrice === 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        No payment required for free plan
                      </p>
                    )}
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#7332a8]" />
                    <label htmlFor="coupon" className="text-sm font-medium">
                      Apply Coupon Code
                    </label>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      ref={couponInputRef}
                      id="coupon"
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7332a8]/20 focus:border-[#7332a8]"
                      disabled={isApplyingCoupon || !!appliedCoupon}
                    />
                    {appliedCoupon ? (
                      <Button
                        onClick={removeCoupon}
                        variant="outline"
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    ) : (
                      <Button
                        onClick={applyCoupon}
                        disabled={!couponCode.trim() || isApplyingCoupon}
                        variant="outline"
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        {isApplyingCoupon ? (
                          <div className="w-4 h-4 border-2 border-[#7332a8] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Check className="w-4 h-4 mr-1" />
                        )}
                        Apply
                      </Button>
                    )}
                  </div>

                  {/* Coupon Message */}
                  <AnimatePresence>
                    {couponMessage.text && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                          "text-sm",
                          couponMessage.type === 'error' 
                            ? "text-red-500" 
                            : "text-green-500"
                        )}
                      >
                        {couponMessage.text}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Available Coupons Hint */}
                  {!appliedCoupon && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <Gift className="w-3 h-3" />
                      <span>Try: WELCOME10, SAVE20, or FLAT5</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Payment Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || (!isAuthenticated && finalPrice > 0) || (finalPrice > 0 && !razorpayLoaded)}
                  size="lg"
                  className={cn(
                    "w-full py-6 text-base font-semibold transition-all duration-200",
                    finalPrice === 0 
                      ? "bg-green-500 hover:bg-green-600" 
                      : "bg-[#7332a8] hover:bg-[#6332a8]"
                  )}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : finalPrice === 0 ? (
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      Get Free Plan
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Pay  <span className="flex items-center"><IndianRupee/>{finalPrice.toFixed(2)}</span>
                    </div>
                  )}
                </Button>

                {finalPrice > 0 && (
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Shield className="w-3 h-3" />
                      Secure payment processed by Razorpay
                    </p>
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 text-center">
                      Please log in to complete your purchase.
                    </p>
                  </div>
                )}

                {/* Upgrade Notice */}
                {isUpgrade && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 dark:text-blue-100">
                          Upgrade in Progress
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                          You're upgrading from your current plan to {currentPlan.name}. 
                          The change will be immediate after payment.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-6 pt-4 border-t border-border/40"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  SSL Secure
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  PCI Compliant
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutContent;