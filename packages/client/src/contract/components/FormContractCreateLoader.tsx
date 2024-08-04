import { useNavigate } from 'react-router-dom'
import FormContract from './FormContract'
import type { ContractWithCustomer } from '../../__codegen__/__openapi__/insurer-server'
import { useCreateMutationContract } from '../stores/useMutationContract'
import { useCallback, useMemo } from 'react'
import { useSuspenseQueryCustomerList } from '../../customer/stores/useQueryCustomer'

const FormContractCreateLoader = () => {
  const navigate = useNavigate()
  const createContractMutation = useCreateMutationContract()
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

  const handleFormSubmit = useCallback(
    async (submitPayload: ContractWithCustomer) => {
      try {
        const payload = {
          title: submitPayload.title ?? '',
          customerId: submitPayload.customerId ?? 0,
          startDate: submitPayload.startDate ?? '',
          productId: submitPayload.productId ?? 1,
          description: submitPayload.description,
          claimDate: submitPayload.startDate,
          endDate: submitPayload.startDate,
        }
        console.log({ submitPayload, payload })
        await createContractMutation.mutateAsync({
          ...payload,
        })
        navigate('/contract')
      } catch (error) {
        console.error(error)
        alert('계약 생성 실패')
      }
    },
    [createContractMutation, navigate]
  )

  const handleCancel = () => {
    navigate('/contract')
  }
  return (
    <FormContract
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
      customers={customers}
    />
  )
}
export default FormContractCreateLoader
