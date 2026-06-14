"use client"

import { Order, OrderStatus } from "@/types/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Trash2, ListFilter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
}

export function OrderList({ orders, onUpdateStatus, onDelete }: OrderListProps) {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      variant: "destructive",
      title: "Pedido Eliminado",
      description: "El pedido ha sido removido del sistema.",
    });
  };

  const handleUpdate = (id: string, status: OrderStatus) => {
    onUpdateStatus(id, status);
    toast({
      title: "Estado Actualizado",
      description: `El pedido ahora está marcado como ${status === 'delivered' ? 'entregado' : 'pendiente'}.`,
    });
  };

  return (
    <Card className="shadow-lg border-none overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-primary font-headline">
          <ListFilter className="w-6 h-6" />
          Listado de Pedidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No hay pedidos registrados actualmente.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px]">Cliente</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-center">Cant.</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="transition-colors hover:bg-muted/50">
                    <TableCell className="font-medium">{order.client}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell className="text-center">{order.quantity}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {format(new Date(order.timestamp), "d MMM, HH:mm", { locale: es })}
                    </TableCell>
                    <TableCell>
                      {order.status === "pending" ? (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none flex w-fit items-center gap-1 px-2 py-1">
                          <Clock className="w-3 h-3" /> Pendiente
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 border-none flex w-fit items-center gap-1 px-2 py-1">
                          <CheckCircle2 className="w-3 h-3" /> Entregado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleUpdate(order.id, "delivered")}
                            title="Marcar como entregado"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        {order.status === "delivered" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                            onClick={() => handleUpdate(order.id, "pending")}
                            title="Marcar como pendiente"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(order.id)}
                          title="Eliminar pedido"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}