"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, BarChart3 } from "lucide-react";
import { Order } from "@/types/order";
import { generateOrderSummary } from "@/ai/flows/generate-order-summary-flow";

interface OrderSummaryAIProps {
  orders: Order[];
}

export function OrderSummaryAI({ orders }: OrderSummaryAIProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      // Map domain order to expected AI flow order
      const aiInputOrders = orders.map(o => ({
        id: o.id,
        client: o.client,
        product: o.product,
        quantity: o.quantity,
        status: o.status as 'pending' | 'delivered',
        timestamp: o.timestamp
      }));
      
      const result = await generateOrderSummary({ orders: aiInputOrders });
      setSummary(result.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-secondary/10 backdrop-blur-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="w-5 h-5 text-secondary" />
              Inteligencia de Negocio
            </CardTitle>
            <CardDescription>Genera un resumen estratégico basado en tus pedidos actuales.</CardDescription>
          </div>
          <Button 
            onClick={handleGenerateSummary} 
            disabled={loading || orders.length === 0}
            variant="secondary"
            className="shadow-md"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <BarChart3 className="w-4 h-4 mr-2" />}
            {summary ? "Actualizar Resumen" : "Generar Resumen"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {summary ? (
          <div className="bg-white/60 p-4 rounded-lg border border-primary/10 shadow-inner animate-in fade-in slide-in-from-top-2">
            <p className="text-sm leading-relaxed text-foreground/80 italic font-medium whitespace-pre-line">
              "{summary}"
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3 opacity-50">
            <div className="p-3 bg-muted rounded-full">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Haz clic en el botón superior para obtener un análisis detallado.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}