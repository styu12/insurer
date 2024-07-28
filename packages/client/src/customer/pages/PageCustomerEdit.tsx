import { useNavigate, useParams } from 'react-router-dom'
import FormCustomer from '../components/FormCustomer.tsx'
import type { CustomerEditPathParamsType } from '../path.config.ts'
import SectionPage from '../../_app/components/section/SectionPage.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'
import {
  useCreateCustomer,
  useGetCustomerById,
} from '../hooks/useCustomerService.ts'
import SectionHeading from '../../_app/components/section/SectionHeading.tsx'
import { useEffect } from 'react'
import { Customer } from '../../__codegen__/__openapi__/insurer-server'

const PageCustomerEdit = () => {
  const navigate = useNavigate()
  const params = useParams<CustomerEditPathParamsType>()
  console.log(params.customerId)

  const {
    customer: customerById,
    loading: getCustomerLoading,
    error: getCustomerError,
    fetchCustomerById,
  } = useGetCustomerById()
  const {
    customer: createdCustomer,
    loading: createCustomerLoading,
    error: createCustomerError,
    createCustomer,
  } = useCreateCustomer()

  useEffect(() => {
    if (params.customerId) {
      fetchCustomerById(Number(params.customerId))
    }
  }, [fetchCustomerById, params.customerId])

  const handleFormSubmit = async (value: Customer) => {
    if (params.customerId) {
      console.log('Update Customer', value)
    } else {
      await createCustomer({
        name: value.name ?? '',
        email: value.email ?? '',
        phone: value.phone ?? '',
        address: value.address,
        emailNotification: value.emailNotification,
        smsNotification: value.smsNotification,
        kakaoNotification: value.kakaoNotification,
      })

      if (createCustomerError) {
        console.error(createCustomerError)
        alert('고객 추가에 실패했습니다.')
      }

      if (createdCustomer) {
        navigate('/customer')
      }
    }
  }

  const handleCancel = () => {
    navigate('/customer')
  }

  if (getCustomerLoading || createCustomerLoading) {
    return (
      <SectionPage>
        <SectionHeading title="고객관리" />
        <SectionBody>
          <div>Loading...</div>
        </SectionBody>
      </SectionPage>
    )
  }

  if (getCustomerError) {
    return (
      <SectionPage>
        <SectionHeading title="고객관리" />
        <SectionBody>
          <div>Error: {getCustomerError.message}</div>
        </SectionBody>
      </SectionPage>
    )
  }

  return (
    <SectionPage>
      <SectionHeading title="고객관리" />
      <SectionBody>
        <FormCustomer
          initialData={customerById}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </SectionBody>
    </SectionPage>
  )
}

export default PageCustomerEdit
