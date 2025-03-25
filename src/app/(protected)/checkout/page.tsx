import { getContractByUserId } from '@/db/queries'
import Shipping from './_components/shipping'
import ContractUpload from './_components/contract-upload'
import ContractPending from './_components/contract-pending'
import ContractRejected from './_components/contract-rejected'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

const CONTRACT_STATUS = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  APPROVED: 'approved',
  NONE: 'none',
}

const CONTRACT_REASON = {
  UNAUTHORIZED: 'No Autorizado',
  NOT_FOUND: 'No Encontrado',
}

export default async function Checkout() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const contract = await getContractByUserId()

  const contractStatus = contract.status

  switch (contractStatus) {
    case CONTRACT_STATUS.PENDING:
      return <ContractPending />
    case CONTRACT_STATUS.REJECTED:
      return <ContractRejected reason={contract.reason} />
    case CONTRACT_STATUS.APPROVED:
      return <Shipping />
    case CONTRACT_STATUS.NONE:
      //TO-DO improve reason management
      return contract.reason == CONTRACT_REASON.UNAUTHORIZED ? (
        redirect('/sign-in')
      ) : (
        <ContractUpload />
      )
    default:
      return (
        <div className='container mx-auto p-6 mt-28 min-h-dvh'>
          <p className='text-red-500 text-2xl'>Estado de contrato no válido</p>
        </div>
      )
  }
}
