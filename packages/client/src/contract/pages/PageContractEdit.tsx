import { useNavigate, useParams } from 'react-router-dom'
import FormContract from '../components/FormContract'
import { ContractEditPathParamsType } from '../path.config'
import SectionPage from '../../_app/components/section/SectionPage'
import SectionBody from '../../_app/components/section/SectionBody'
import { useGetContractById } from '../hooks/useContractService'
import SectionHeading from '../../_app/components/section/SectionHeading'
import { useEffect, useState } from 'react'

export interface Contract {
  id: number
  title: string
  description: string
  customerName: string
  startDate: string
  claimDate: string
  endDate: string
}

const PageContractEdit = () => {
  const navigate = useNavigate()
  const params = useParams<ContractEditPathParamsType>()
  console.log(params.contractId)

  const [targetContract, setTargetContract] = useState<Contract | null>(null)

  const { contract, loading, error, fetchContractById } = useGetContractById()

  useEffect(() => {
    if (params.contractId) {
      fetchContractById(Number(params.contractId))
    }
  }, [fetchContractById, params.contractId])

  useEffect(() => {
    if (contract) {
      const newContract: Contract = {
        id: contract.id || 0,
        title: contract.title || '',
        description: contract.description || '',
        customerName: contract.customerName || '',
        startDate: contract.startDate || '',
        claimDate: contract.claimDate || '',
        endDate: contract.endDate || '',
      }

      setTargetContract(newContract)
    }
  }, [contract])

  const handleFormSubmit = (values: Contract) => {
    if (params.contractId) {
      console.log('Update Contract', values)
    } else {
      console.log('Create Contract', values)
    }
  }

  const handleCancel = () => {
    navigate('/contract')
  }

  if (loading) {
    return (
      <SectionPage>
        <SectionHeading title="계약관리" />
        <SectionBody>
          <div>Loading...</div>
        </SectionBody>
      </SectionPage>
    )
  }

  if (error) {
    return (
      <SectionPage>
        <SectionHeading title="계약관리" />
        <SectionBody>
          <div>Error: {error.message}</div>
        </SectionBody>
      </SectionPage>
    )
  }

  return (
    <SectionPage>
      <SectionHeading title="계약관리" />
      <SectionBody>
        <FormContract
          initialData={targetContract}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </SectionBody>
    </SectionPage>
  )
}

export default PageContractEdit
