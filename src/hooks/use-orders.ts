"use client"

import { useState, useEffect } from 'react';
import { Order, OrderStatus, NewOrder } from '@/types/order';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrders = localStorage.getItem('techsol_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Seed initial data for prototype
      const initialOrders: Order[] = [
        {
          id: '1',
          client: 'Juan Perez',
          product: 'Router Industrial AX-500',
          quantity: 2,
          status: 'pending',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          client: 'Maria Garcia',
          product: 'Switch Administrable 24p',
          quantity: 1,
          status: 'delivered',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setOrders(initialOrders);
      localStorage.setItem('techsol_orders', JSON.stringify(initialOrders));
    }
    setLoading(false);
  }, []);

  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('techsol_orders', JSON.stringify(updatedOrders));
  };

  const addOrder = (newOrder: NewOrder) => {
    const order: Order = {
      ...newOrder,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    saveOrders([order, ...orders]);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status } : order
    );
    saveOrders(updatedOrders);
  };

  const deleteOrder = (id: string) => {
    const updatedOrders = orders.filter(order => order.id !== id);
    saveOrders(updatedOrders);
  };

  return { orders, loading, addOrder, updateOrderStatus, deleteOrder };
}