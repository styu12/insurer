import { useCallback } from 'react'
import { useCreateMutationCustomer } from '../stores/useMutationCustomer'
import FormCustomer from './FormCustomer'
import { useNavigate } from 'react-router-dom'
import type { Customer } from '../../__codegen__/__openapi__/insurer-server'

const ContentFormCreateCustomer = () => {
  const navigate = useNavigate()
  const createMutationCustomer = useCreateMutationCustomer()
  const handleFormSubmit = useCallback(
    async (submitPayload: Customer) => {
      try {
        await createMutationCustomer.mutateAsync({
          name: submitPayload.name ?? '',
          email: submitPayload.email ?? '',
          phone: submitPayload.phone ?? '',
          address: submitPayload.address,
          emailNotification: submitPayload.emailNotification,
          smsNotification: submitPayload.smsNotification,
          kakaoNotification: submitPayload.kakaoNotification,
        })
        navigate('/customer')
      } catch (error) {
        console.error(error)
        alert('고객 추가에 실패했습니다.')
      }
    },
    [createMutationCustomer, navigate]
  )
  const handleCancel = useCallback(() => {
    navigate('/customer')
  }, [navigate])

  return <FormCustomer onSubmit={handleFormSubmit} onCancel={handleCancel} />
}
export default ContentFormCreateCustomer
