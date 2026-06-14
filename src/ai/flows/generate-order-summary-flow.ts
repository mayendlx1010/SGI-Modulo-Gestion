'use server';
/**
 * @fileOverview A Genkit flow for generating a concise summary of recent orders.
 *
 * - generateOrderSummary - A function that handles the order summary generation process.
 * - GenerateOrderSummaryInput - The input type for the generateOrderSummary function.
 * - GenerateOrderSummaryOutput - The return type for the generateOrderSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateOrderSummaryInputSchema = z.object({
  orders: z.array(
    z.object({
      id: z.string().describe('Unique identifier for the order.'),
      client: z.string().describe('Name of the client who placed the order.'),
      product: z.string().describe('Name of the product ordered.'),
      quantity: z.number().int().positive().describe('Quantity of the product ordered.'),
      status: z.enum(['pending', 'delivered']).describe("Current status of the order ('pending' or 'delivered')."),
      timestamp: z.string().optional().describe('Optional timestamp when the order was placed (ISO 8601 format).'),
    })
  ).describe('An array of recent orders to summarize. Each order must include product, quantity, and status.'),
});
export type GenerateOrderSummaryInput = z.infer<typeof GenerateOrderSummaryInputSchema>;

const GenerateOrderSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the recent orders, highlighting pending orders and most requested products.'),
});
export type GenerateOrderSummaryOutput = z.infer<typeof GenerateOrderSummaryOutputSchema>;

// Internal schema for the prompt input after pre-processing
const PromptInputSchema = z.object({
  pendingOrdersCount: z.number().int().describe('The total number of orders that are currently pending.'),
  mostRequestedProducts: z.array(
    z.object({
      product: z.string().describe('The name of the product.'),
      totalQuantity: z.number().int().describe('The total quantity of this product requested.'),
    })
  ).describe('A list of the most requested products and their total quantities, sorted by total quantity in descending order.'),
});

const prompt = ai.definePrompt({
  name: 'generateOrderSummaryPrompt',
  input: { schema: PromptInputSchema },
  output: { schema: GenerateOrderSummaryOutputSchema },
  prompt: `Eres un asistente de IA especializado en la generación de resúmenes de negocio.
Tu tarea es generar un resumen conciso de los pedidos recientes, enfocándote en el estado actual y las tendencias de productos.

Aquí está la información clave de los pedidos:

Número de pedidos pendientes: {{{pendingOrdersCount}}}

Productos más solicitados (producto y cantidad total):
{{#each mostRequestedProducts}}
- Producto: {{{product}}}, Cantidad Total: {{{totalQuantity}}}
{{/each}}

Basándote en la información anterior, genera un resumen conciso que destaque claramente:
1. El número total de pedidos pendientes.
2. Los productos más solicitados, incluyendo sus cantidades.
3. Un breve comentario sobre el estado general de los pedidos.

Asegúrate de que el resumen sea fácil de leer, profesional y proporcione una visión rápida y valiosa para un administrador. El resumen debe ser directo y no exceder de 4-5 frases.`,
});

const generateOrderSummaryFlow = ai.defineFlow(
  {
    name: 'generateOrderSummaryFlow',
    inputSchema: GenerateOrderSummaryInputSchema,
    outputSchema: GenerateOrderSummaryOutputSchema,
  },
  async (input) => {
    const pendingOrdersCount = input.orders.filter(
      (order) => order.status === 'pending'
    ).length;

    const productQuantities: { [key: string]: number } = {};
    input.orders.forEach((order) => {
      productQuantities[order.product] = (
        productQuantities[order.product] || 0
      ) + order.quantity;
    });

    const mostRequestedProducts = Object.entries(productQuantities)
      .map(([product, totalQuantity]) => ({ product, totalQuantity }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 5); // Limit to top 5 products for conciseness

    const promptInput = {
      pendingOrdersCount,
      mostRequestedProducts,
    };

    const { output } = await prompt(promptInput);
    return output!;
  }
);

export async function generateOrderSummary(
  input: GenerateOrderSummaryInput
): Promise<GenerateOrderSummaryOutput> {
  return generateOrderSummaryFlow(input);
}
