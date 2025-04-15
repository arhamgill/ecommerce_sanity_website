import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons'; // Importing an icon for the sales schema

export default defineType({
  name: 'sales',
  title: 'Sales',
  type: 'document',
  icon: TagIcon, // Adding an icon for the sales schema
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'discountAmount',
      title: 'Discount Amount',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'couponCode',
      title: 'Coupon Code',
      type: 'string',
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'datetime',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'discountAmount',
      couponCode: 'couponCode',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, couponCode, isActive } = selection;
      return {
        title: title,
        subtitle: `Discount: ${subtitle}, Coupon: ${couponCode}, Active: ${isActive ? 'Yes' : 'No'}`,
      };
    },
  },
});