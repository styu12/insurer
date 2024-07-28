import { useNavigate, useParams } from 'react-router-dom'
import FormContract from '../components/FormContract'
import { ContractEditPathParamsType } from '../path.config'
import SectionPage from '../../_app/components/section/SectionPage'
import SectionBody from '../../_app/components/section/SectionBody'
import { useGetContractById } from '../hooks/useContractService'
import SectionHeading from '../../_app/components/section/SectionHeading'
import { useEffect } from 'react'
import { ContractWithCustomer } from '../../__codegen__/__openapi__/insurer-server'

const PageContractEdit = () => {
  const navigate = useNavigate()
  const params = useParams<ContractEditPathParamsType>()
  console.log(params.contractId)

  const { contractWithCustomer, loading, error, fetchContractById } =
    useGetContractById()

  useEffect(() => {
    if (params.contractId) {
      fetchContractById(Number(params.contractId))
    }
  }, [fetchContractById, params.contractId])

  const handleFormSubmit = (values: ContractWithCustomer) => {
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
          initialData={contractWithCustomer}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </SectionBody>
    </SectionPage>
  )
}

export default PageContractEdit
