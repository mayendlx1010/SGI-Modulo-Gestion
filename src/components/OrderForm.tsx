"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, User, Hash, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  client: z.string().min(2, { message: "El nombre del cliente es requerido." }),
  product: z.string().min(2, { message: "El producto es requerido." }),
  quantity: z.coerce.number().min(1, { message: "La cantidad debe ser al menos 1." }),
});

interface OrderFormProps {
  onAddOrder: (order: { client: string; product: string; quantity: number }) => void;
}

export function OrderForm({ onAddOrder }: OrderFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: "",
      product: "",
      quantity: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddOrder(values);
    form.reset();
    toast({
      title: "Pedido Registrado",
      description: "El pedido ha sido añadido correctamente a la lista.",
    });
  }

  return (
    <Card className="shadow-lg border-none bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <PlusCircle className="w-6 h-6" />
          Nuevo Pedido
        </CardTitle>
        <CardDescription>
          Completa los datos para registrar un nuevo pedido en el sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <User className="w-4 h-4 text-primary" /> Cliente
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre completo" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Package className="w-4 h-4 text-primary" /> Producto
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del producto o equipo" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Hash className="w-4 h-4 text-primary" /> Cantidad
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 transition-all">
              REGISTRAR PEDIDO
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}