import { useNavigate, useParams } from 'react-router-dom'
import type { CustomerEditPathParamsType } from '../path.config'
import type { Customer } from '../../__codegen__/__openapi__/insurer-server'
import FormCustomer from './FormCustomer'
import { useSuspenseQueryCustomerById } from '../stores/useQueryCustomer'
import { useUpdateMutationCustomer } from '../stores/useMutationCustomer'
import { useMemo } from 'react'

const FormEditCustomerLoader = () => {
  const navigate = useNavigate()
  const params = useParams<CustomerEditPathParamsType>()
  const customerId = useMemo(
    () => Number(params.customerId),
    [params.customerId]
  )
  const payload = useSuspenseQueryCustomerById({ id: customerId })
  const updateMutation = useUpdateMutationCustomer()
  const selectedCustomer = useMemo(() => {
    return {
      id: payload.data.id ?? 0,
      name: payload.data.name ?? '',
      email: payload.data.email ?? '',
      phone: payload.data.phone ?? '',
      address: payload.data.address ?? '',
      emailNotification: payload.data.emailNotification ?? false,
      smsNotification: payload.data.smsNotification ?? false,
      kakaoNotification: payload.data.kakaoNotification ?? false,
    }
  }, [payload.data])

  const handleFormSubmit = async (submitPayload: Customer) => {
    try {
      await updateMutation.mutateAsync({
        id: customerId,
        payload: {
          name: submitPayload.name ?? '',
          email: submitPayload.email ?? '',
          phone: submitPayload.phone ?? '',
          address: submitPayload.address,
          emailNotification: submitPayload.emailNotification,
          smsNotification: submitPayload.smsNotification,
          kakaoNotification: submitPayload.kakaoNotification,
        },
      })
      navigate('/customer')
    } catch (error) {
      console.error(error)
      alert('고객 추가에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    navigate('/customer')
  }
  return (
    <FormCustomer
      initialData={selectedCustomer}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
    />
  )
}

export default FormEditCustomerLoader
