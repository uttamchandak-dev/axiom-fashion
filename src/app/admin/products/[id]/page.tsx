export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-medium mb-8">Edit Product</h1>
      <p className="text-sm text-neutral-500">Editing product: {id}</p>
    </div>
  );
}
