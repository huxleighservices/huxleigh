'use server';

/**
 * @fileOverview A flow for creating a new order.
 *
 * - createOrder - A function that handles the order creation process.
 * - CreateOrderInput - The input type for the createOrder function.
 * - CreateOrderOutput - The return type for the createOrder function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const CreateOrderInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  companyName: z.string().optional(),
  planId: z.string(),
  billingCycle: z.enum(['monthly', 'annually']),
  discountCode: z.string().optional(),
});
export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>;

export const CreateOrderOutputSchema = z.object({
  orderId: z.string().describe('The unique identifier for the created order.'),
  confirmationMessage: z.string().describe('A confirmation message for the user.'),
});
export type CreateOrderOutput = z.infer<typeof CreateOrderOutputSchema>;


export async function createOrder(
  input: CreateOrderInput
): Promise<CreateOrderOutput> {
  return createOrderFlow(input);
}


const createOrderFlow = ai.defineFlow(
  {
    name: 'createOrderFlow',
    inputSchema: CreateOrderInputSchema,
    outputSchema: CreateOrderOutputSchema,
  },
  async (input) => {
    // In a real application, you would process the payment here with a payment provider,
    // save the order to a database, and then return the order ID.
    // For this example, we will just generate a random order ID.
    const orderId = `HUX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    return {
      orderId,
      confirmationMessage: `Thank you, ${input.firstName}! Your order for the ${input.planId} plan has been received.`,
    };
  }
);
