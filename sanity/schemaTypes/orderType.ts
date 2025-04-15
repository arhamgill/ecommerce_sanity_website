import { defineArrayMember, defineField, defineType } from 'sanity';
import { BasketIcon } from '@sanity/icons'; // Importing an icon for the order schema

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon, // Adding an icon for the order schema
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stripeCheckoutOrderId',
      title: 'Stripe Checkout Order ID',
      type: 'string',
    }),
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
    }),
    defineField({
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'string',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'stripePaymentIntentId',
      title: 'Stripe Payment Intent ID',
      type: 'string',
    }),
    defineField({
        name: 'orderStatus',
        title: 'Order Status',
        type: 'string',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Processing', value: 'processing' },
            { title: 'Shipped', value: 'shipped' },
            { title: 'Delivered', value: 'delivered' },
            { title: 'Cancelled', value: 'cancelled' },
          ],
        },
      }),
      defineField({
        name: 'totalPrice',
        title: 'Total Price',
        type: 'number',
        validation: (Rule) => Rule.min(0),
      }),
      defineField({
        name: 'discountAmount',
        title: 'Discount Amount',
        type: 'number',
        validation: (Rule) => Rule.min(0),
      }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'reference',
              to: [{ type: 'product' }],
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: {
              title: 'name.name', // Resolves the 'name' field from the referenced product
              subtitle: 'quantity',
              media: 'name.image', // Resolves the 'image' field from the referenced product
              price: 'name.price', // Resolves the 'price' field from the referenced product
              currency: 'name.currency', // Resolves the 'currency' field from the referenced product
            },
            prepare(selection) {
              const { title, subtitle, media, price, currency } = selection;
              return {
                title: title,
                subtitle: `Quantity: ${subtitle}, Price: ${price} ${currency}`,
                media: media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customerName',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Order #${title}`,
        subtitle: `Customer: ${subtitle}`,
      };
    },
  },
});