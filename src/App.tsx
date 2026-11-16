import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index.tsx";
import Catalog from "./pages/Catalog.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Checkout from "./pages/Checkout.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
import OrderTracking from "./pages/OrderTracking.tsx";
import Tribes from "./pages/Tribes.tsx";
import CreatorDashboard from "./pages/creator/CreatorDashboard.tsx";
import UploadStudio from "./pages/creator/UploadStudio.tsx";
import Earnings from "./pages/creator/Earnings.tsx";
import Designs from "./pages/creator/Designs.tsx";
import DesignAnalytics from "./pages/creator/DesignAnalytics.tsx";
import Notifications from "./pages/creator/Notifications.tsx";
import Settings from "./pages/creator/Settings.tsx";
import Messages from "./pages/creator/Messages.tsx";
import CreatorStorefront from "./pages/CreatorStorefront.tsx";
import Auth from "./pages/Auth.tsx";
import Account from "./pages/Account.tsx";
import Help from "./pages/Help.tsx";
import Contact from "./pages/Contact.tsx";
import SellWithUs from "./pages/SellWithUs.tsx";
import WriteReview from "./pages/WriteReview.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/track/:id" element={<OrderTracking />} />
            <Route path="/tribes" element={<Tribes />} />
            <Route path="/tribes/:slug" element={<Tribes />} />
            <Route path="/creator" element={<CreatorDashboard />} />
            <Route path="/creator/upload" element={<UploadStudio />} />
            <Route path="/creator/earnings" element={<Earnings />} />
            <Route path="/creator/designs" element={<Designs />} />
            <Route path="/creator/analytics" element={<Designs />} />
            <Route path="/creator/analytics/:id" element={<DesignAnalytics />} />
            <Route path="/creator/notifications" element={<Notifications />} />
            <Route path="/creator/settings" element={<Settings />} />
            <Route path="/creator/messages" element={<Messages />} />
            <Route path="/creator/messages/:id" element={<Messages />} />
            <Route path="/creator/:handle" element={<CreatorStorefront />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/:section" element={<Account />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sell" element={<SellWithUs />} />
            <Route path="/write-review" element={<WriteReview />} />
            <Route path="/write-review/:id" element={<WriteReview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
