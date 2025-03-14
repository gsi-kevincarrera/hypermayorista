import { getContractByUserId } from '@/db/queries'
import Shipping from './_components/shipping'
import ContractUpload from './_components/contract-upload'
import ContractPending from './_components/contract-pending'
import ContractRejected from './_components/contract-rejected'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Checkout() {
  const { userId } = await auth()
  const contract = await getContractByUserId(userId)

  if (contract === null) {
    return redirect('/sign-in')
  }

  const contractStatus = contract?.status ?? 'none'

  switch (contractStatus) {
    case 'pending':
      return <ContractPending />
    case 'rejected':
      return <ContractRejected reason={contract.reason} />
    case 'approved':
      return <Shipping />
    case 'none':
      return <ContractUpload />
    default:
      return (
        <div className='container mx-auto p-6 mt-28 min-h-dvh'>
          <p className='text-red-500 text-2xl'>Estado de contrato no válido</p>
        </div>
      )
  }
}
