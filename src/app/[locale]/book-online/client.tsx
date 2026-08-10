"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import InnerPageLayout from "@/components/layout/InnerPageLayout";
import PageHero from "@/components/sections/PageHero";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCmsPage } from "@/lib/hooks/useCmsPage";
import { stripHtml } from "@/lib/cms/html";

type TabKey = "tours" | "accommodation" | "travelServices";
type CustomerType = "individual" | "organization";
type PaymentMethod = "digipay" | "happypay" | "socialpay" | "qpay" | "card";

const tabs: TabKey[] = ["tours", "accommodation", "travelServices"];

const tabConfig: Record<TabKey, { title: string; label: string; placeholder: string }> = {
  tours: { title: "bookYourTours", label: "preferredTour", placeholder: "preferredTourPlaceholder" },
  accommodation: { title: "bookYourAccommodation", label: "preferredRoom", placeholder: "preferredRoomPlaceholder" },
  travelServices: { title: "bookYourTravelServices", label: "preferredService", placeholder: "preferredServicePlaceholder" },
};

const paymentMethods = [
  { id: "digipay" as PaymentMethod, label: "DigiPay", icon: "D" },
  { id: "happypay" as PaymentMethod, label: "Happy Pay", icon: "H" },
  { id: "socialpay" as PaymentMethod, label: "SocialPay", icon: "S" },
  { id: "qpay" as PaymentMethod, label: "QPay", icon: "Q" },
  { id: "card" as PaymentMethod, label: "Card", icon: "💳" },
];

interface BookOnlineClientProps {
  /** Banner image resolved on the server so it does not swap in after hydration. */
  heroImage?: string | null;
}

export default function BookOnlineClient({ heroImage }: BookOnlineClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("tours");
  const [showPayment, setShowPayment] = useState(false);
  const [customerType, setCustomerType] = useState<CustomerType>("individual");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("qpay");
  const t = useTranslations("bookOnline");
  const cms = useCmsPage("book-online");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handleCheckPayment = () => {
    alert("Payment check initiated.");
    setShowPayment(false);
  };

  return (
    <InnerPageLayout>
      <PageHero
        label="Reservations"
        title={cms?.name || "Book Online"}
        subtitle={(cms?.description ? stripHtml(cms.description) : "") || "Reserve your tour, accommodation, or travel services with our team"}
        image={heroImage}
      />

      <section className="bg-background pt-16 pb-12 lg:pt-[80px] lg:pb-[60px]">
        <div className="mx-auto max-w-[800px] px-6 lg:px-0 text-center">
          <p className="text-base leading-[1.7] text-muted-foreground mb-8">
            When you have made your decision and are ready to book, please use this form to let us know your plans. The following services can be booked online through this page.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-white text-foreground border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {tab === "tours" ? "Tours" : tab === "accommodation" ? "Accommodation" : "Travel Services"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background pb-20 lg:pb-[120px]">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[460px] rounded-[20px] bg-white p-8 lg:p-10 border border-border"
            >
              <h2 className="font-display text-2xl text-foreground mb-6">
                {activeTab === "tours" ? "Book Your Tour" : activeTab === "accommodation" ? "Book Your Accommodation" : "Book Travel Services"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    className="w-full h-[44px] rounded-[10px] bg-white border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Full Name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    className="w-full h-[44px] rounded-[10px] bg-white border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Email Address"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full h-[44px] rounded-[10px] bg-white border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground">
                    {activeTab === "tours" ? "Preferred Tour" : activeTab === "accommodation" ? "Preferred Room" : "Preferred Service"}
                  </label>
                  <input
                    type="text"
                    className="w-full h-[44px] rounded-[10px] bg-white border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder={activeTab === "tours" ? "Preferred Tour" : activeTab === "accommodation" ? "Preferred Room" : "Preferred Service"}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground">Travel Dates</label>
                  <input
                    type="text"
                    className="w-full h-[44px] rounded-[10px] bg-white border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Travel Dates"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-muted-foreground">Additional Requests</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-[10px] bg-white border border-border p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Additional Requests"
                  />
                </div>

                <Button type="submit" variant="primary" className="mt-2"
                >
                  Submit Booking Request
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-[420px] flex flex-col gap-6"
            >
              <h2 className="font-display text-2xl text-foreground">What Happens Next?</h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-base text-foreground">1. Submit your request</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Fill in the form with your preferred dates and group size.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-base text-foreground">2. We check availability</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Our team will confirm availability and send a detailed itinerary.</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-base text-foreground">3. Confirm with deposit</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Pay a deposit to secure your booking and prepare for your journey.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {showPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPayment(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-[480px] bg-primary-dark rounded-[24px] p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-end mb-6">
              <button
                onClick={() => setShowPayment(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="text-center mb-8">
              <p className="text-sm text-white/60 mb-2">Төлөх дүн</p>
              <p className="text-4xl font-bold text-white">$1,200.00</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-white/70 mb-3">И Баримт авах хэлбэр</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCustomerType("individual")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                    customerType === "individual"
                      ? "border-gold bg-white/5"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    customerType === "individual" ? "border-gold" : "border-white/40"
                  }`}>
                    {customerType === "individual" && (
                      <span className="w-2 h-2 rounded-full bg-gold" />
                    )}
                  </span>
                  <span className="text-sm text-white">Хувь хүн</span>
                </button>

                <button
                  onClick={() => setCustomerType("organization")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                    customerType === "organization"
                      ? "border-gold bg-white/5"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    customerType === "organization" ? "border-gold" : "border-white/40"
                  }`}>
                    {customerType === "organization" && (
                      <span className="w-2 h-2 rounded-full bg-gold" />
                    )}
                  </span>
                  <span className="text-sm text-white">Албан байгууллага</span>
                </button>
              </div>

              {customerType === "organization" && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Байгууллагын регистр"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold"
                  />
                </div>
              )}
            </div>

            <p className="text-xs text-gold/80 mb-6">
              *И Баримт таны бүртгэлийн и-мэйл хаягруу илгээгдэнэ
            </p>

            <div className="mb-6">
              <p className="text-sm text-white/70 mb-3">Төлбөр төлөх хэлбэр</p>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                      selectedMethod === method.id
                        ? "border-gold bg-white/5"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedMethod === method.id ? "border-gold" : "border-white/40"
                      }`}>
                        {selectedMethod === method.id && (
                          <span className="w-2 h-2 rounded-full bg-gold" />
                        )}
                      </span>
                      <span className="text-sm text-white">{method.label}</span>
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {method.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedMethod === "qpay" && (
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl">
                  <div className="w-48 h-48 bg-background flex items-center justify-center text-sm text-muted-foreground">
                    QR Code Placeholder
                  </div>
                </div>
                <p className="text-xs text-white/60 text-center">
                  Та QR кодыг өөрийн интернет банкны аппликейшн ашиглан уншуулж төлбөрөө төлөөрэй.
                </p>
              </div>
            )}

            {selectedMethod === "card" && (
              <div className="space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleCheckPayment}
              className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-4 rounded-xl transition-colors"
            >
              Төлбөр шалгах
            </button>
          </motion.div>
        </div>
      )}
    </InnerPageLayout>
  );
}
