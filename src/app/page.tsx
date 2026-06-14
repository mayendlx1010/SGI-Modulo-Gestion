"use client"

import { useOrders } from "@/hooks/use-orders";
import { OrderForm } from "@/components/OrderForm";
import { OrderList } from "@/components/OrderList";
import { OrderSummaryAI } from "@/components/OrderSummaryAI";
import { Toaster } from "@/components/ui/toaster";
import { Package2, Activity, Users, Truck } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const { orders, loading, addOrder, updateOrderStatus, deleteOrder } = useOrders();

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-primary/20 shadow-lg">
              <Package2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-primary font-headline">Ordena<span className="text-secondary">Flow</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-primary hover:opacity-80 transition-opacity">Dashboard</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Historial</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Configuración</a>
          </nav>
        </div>
      </header>

      {/* Hero / Banner section */}
      <div className="relative w-full h-[200px] mb-8 overflow-hidden">
        {heroImage && (
          <Image 
            src={heroImage.imageUrl} 
            alt={heroImage.description} 
            fill 
            className="object-cover opacity-20"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-background via-background/80 to-transparent">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-headline text-primary">
              Control de Pedidos TechSol
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
              Sistema inteligente para la gestión ágil de suministros tecnológicos y equipos de red.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Clientes</p>
              <h3 className="text-2xl font-bold">{new Set(orders.map(o => o.client)).size}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex items-center gap-4">
            <div className="bg-yellow-50 p-3 rounded-full">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pendientes</p>
              <h3 className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === 'pending').length}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Entregados</p>
              <h3 className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'delivered').length}</h3>
            </div>
          </div>
        </div>

        {/* AI Summary Section */}
        <div className="mb-8">
          <OrderSummaryAI orders={orders} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <OrderForm onAddOrder={addOrder} />
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 text-xs text-muted-foreground">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-1">
                <Activity className="w-3 h-3" /> Info del Sistema
              </h4>
              <p>Este es un prototipo funcional basado en Historias de Usuario para el módulo de TechSol. Los datos se persisten localmente para esta demostración.</p>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <OrderList 
              orders={orders} 
              onUpdateStatus={updateOrderStatus} 
              onDelete={deleteOrder} 
            />
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  );
}