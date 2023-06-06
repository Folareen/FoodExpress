export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'cover_image',
      type: 'image',
      title: 'Cover Image',
    },
    {
      name: 'images',
      type: 'array',
      title: "Images",
      of: [{ type: 'image' }]
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price'
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }],
    },
  ]
}