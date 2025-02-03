export default function ProductDescription({
  description,
}: {
  description: string
}) {
  if (!description) {
    return null
  }
  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>Descripción del Producto</h3>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}
