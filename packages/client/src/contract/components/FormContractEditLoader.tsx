import { useNavigate, useParams } from 'react-router-dom'
import FormContract from './FormContract'
import type { ContractEditPathParamsType } from '../path.config'
import type { ContractWithCustomer } from '../../__codegen__/__openapi__/insurer-server'
import { useMemo } from 'react'
import { useSuspenseQueryContractById } from '../stores/useQueryContract'
import { useSuspenseQueryCustomerList } from '../../customer/stores/useQueryCustomer'

const FormContractEditLoader = () => {
  const navigate = useNavigate()
  const params = useParams<ContractEditPathParamsType>()
  const contractId = useMemo(
    () => Number(params.contractId),
    [params.contractId]
  )
  const payload = useSuspenseQueryContractById({ id: contractId })
  const selectedContract = useMemo(() => {
    return {
      id: payload.data.id ?? 0,
      title: payload.data.title ?? '',
      description: payload.data.description ?? '',
      customerId: payload.data.customerId ?? 0,
      productId: payload.data.productId ?? 0,
      startDate: payload.data.startDate ?? '',
      claimDate: payload.data.claimDate ?? '',
      endDate: payload.data.endDate ?? '',
    }
  }, [payload.data])

  const customerPayload = useSuspenseQueryCustomerList()
  const customers = useMemo(() => {
    return customerPayload.data?.map((item) => {
      return {
        id: item.id ?? 0,
        name: item.name ?? '',
        email: item.email ?? '',
        phone: item.phone ?? '',
        address: item.address ?? '',
        emailNotification: item.emailNotification ?? false,
        smsNotification: item.smsNotification ?? false,
        kakaoNotification: item.kakaoNotification ?? false,
      }
    })
  }, [customerPayload.data])

  const handleFormSubmit = async (submitPayload: ContractWithCustomer) => {
    try {
      navigate('/contract')
    } catch (error) {
      console.error(error)
      alert('계약 변경에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    navigate('/contract')
  }
  return (
    <FormContract
      initialData={selectedContract}
      customers={customers}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
    />
  )
}
export default FormContractEditLoader
