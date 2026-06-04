// src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const subtotal = getTotal();
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // TODO: Replace with real Stripe checkout session creation
    // const res = await fetch("/api/checkout", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items, customerDetails: form }),
    // });
    // const { url } = await res.json();
    // window.location.href = url;

    // Demo delay
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    alert("Stripe integration point — connect your API keys to process payments.");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sand-100 pt-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-display text-2xl font-bold text-charcoal-900">
            Your cart is empty
          </p>
          <Link href="/shop" className="btn-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-100 pt-20">
      <div className="container-site py-10">
        {/* Back */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-body text-sm text-charcoal-500 hover:text-forest-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Contact */}
              <FormSection title="Contact information">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="label">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="label">
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="label">
                        Last name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </FormSection>

              {/* Delivery address */}
              <FormSection title="Delivery address">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address1" className="label">
                      Address line 1
                    </label>
                    <input
                      id="address1"
                      name="address1"
                      required
                      value={form.address1}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="address2" className="label">
                      Address line 2
                    </label>
                    <input
                      id="address2"
                      name="address2"
                      value={form.address2}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="label">
                        Town / City
                      </label>
                      <input
                        id="city"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className="label">
                        Postcode
                      </label>
                      <input
                        id="postcode"
                        name="postcode"
                        required
                        value={form.postcode}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="label">
                      Order notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Access details, gate codes, or anything else we should know"
                      className="input-field resize-none"
                    />
                  </div>
                </div>
              </FormSection>

              {/* Payment */}
              <FormSection title="Payment">
                <div className="bg-sand-100 rounded-2xl p-6 border border-sand-300 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-forest-800" />
                    <p className="font-body text-sm font-semibold text-charcoal-800">
                      Secure payment via Stripe
                    </p>
                  </div>
                  <p className="font-body text-xs text-charcoal-500">
                    You&apos;ll be redirected to Stripe&apos;s secure payment page. 
                    We accept all major credit/debit cards and bank transfers for orders over £5,000.
                  </p>
                  <div className="flex gap-2">
                    {["Visa", "Mastercard", "Amex", "Bank Transfer"].map((m) => (
                      <span
                        key={m}
                        className="px-2.5 py-1 bg-white border border-sand-300 rounded-lg text-xs font-body font-medium text-charcoal-600"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </FormSection>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full justify-center py-4 text-base"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay {formatPrice(total)} securely
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-card">
                <h2 className="font-display text-xl font-bold text-charcoal-900 mb-5">
                  Order summary
                </h2>

                <div className="space-y-3 mb-5">
                  {items.map((item) => {
                    const img = item.product.images?.find((i) => i.isPrimary) ?? item.product.images?.[0];
                    return (
                      <div key={item.productId} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-sand-200 shrink-0">
                          {img && (
                            <Image
                              src={img.url}
                              alt={img.alt}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          )}
                          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-charcoal-700 text-white text-2xs font-bold rounded-full flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-semibold text-charcoal-900 truncate">
                            {item.product.name}
                          </p>
                          {item.selectedSize && (
                            <p className="font-body text-xs text-charcoal-500">
                              {item.selectedSize.label}
                            </p>
                          )}
                          {item.selectedFinish && (
                            <p className="font-body text-xs text-charcoal-500">
                              {item.selectedFinish.name}
                            </p>
                          )}
                        </div>
                        <p className="font-body text-sm font-semibold text-charcoal-900 shrink-0">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-sand-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-charcoal-600">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-charcoal-600">VAT (20%)</span>
                    <span className="font-semibold">{formatPrice(vat)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-charcoal-600">Installation</span>
                    <span className="text-charcoal-500">Quoted separately</span>
                  </div>
                  <div className="border-t border-sand-200 pt-2 flex justify-between">
                    <span className="font-body font-bold text-charcoal-900">Total</span>
                    <span className="font-display text-2xl font-bold text-forest-800">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-forest-800/8 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-forest-800 shrink-0" />
                <p className="font-body text-xs text-charcoal-700">
                  Secure 256-bit SSL encryption. Your data is protected and never shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl p-7 shadow-card">
      <h2 className="font-display text-xl font-bold text-charcoal-900 mb-5">{title}</h2>
      {children}
    </div>
  );
}
