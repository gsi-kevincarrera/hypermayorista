import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type SpecificationsProps = {
  specifications: Record<string, string> | unknown
}

export default function SpecificationsTable({
  specifications,
}: SpecificationsProps) {
  if (!specifications || typeof specifications !== 'object') {
    return (
      <div>
        <h3 className='text-lg font-semibold mb-4'>Especificaciones</h3>
        <p className='text-gray-500'>No hay especificaciones disponibles.</p>
      </div>
    )
  }

  const entries = Object.entries(specifications as Record<string, string>)

  if (entries.length === 0) {
    return (
      <div>
        <h3 className='text-lg font-semibold mb-4'>Especificaciones</h3>
        <p className='text-gray-500'>No hay especificaciones disponibles.</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>Especificaciones</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Característica</TableHead>
            <TableHead>Especificación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map(([key, value], index) => (
            <TableRow key={index}>
              <TableCell className='font-medium'>{key || 'N/A'}</TableCell>
              <TableCell>{value || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
