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
import { Customer } from './PageCustomerList.tsx'
import { useEffect, useState } from 'react'

const PageCustomerEdit = () => {
  const navigate = useNavigate()
  const params = useParams<CustomerEditPathParamsType>()
  console.log(params.customerId)

  const [targetCustomer, setTargetCustomer] = useState<Customer | null>(null)
  const {
    customer: customerById,
    loading: getCustomerLoading,
    error: getCustomerError,
    fetchCustomerById,
  } = useGetCustomerById()
  const {
    customer: createdCustomer,
    _,
    error: createCustomerError,
    createCustomer,
  } = useCreateCustomer()

  useEffect(() => {
    if (params.customerId) {
      fetchCustomerById(Number(params.customerId))
    }
  }, [fetchCustomerById, params.customerId])

  useEffect(() => {
    if (customerById) {
      const newCustomer: Customer = {
        id: customerById.id || 0,
        name: customerById.name || '',
        email: customerById.email || '',
        phone: customerById.phone || '',
        address: customerById.address || '',
        emailNotification: customerById.emailNotification || false,
        smsNotification: customerById.smsNotification || false,
        kakaoNotification: customerById.kakaoNotification || false,
      }

      setTargetCustomer(newCustomer)
    }
  }, [customerById])

  const handleFormSubmit = async (value: Customer) => {
    if (params.customerId) {
      console.log('Update Customer', value)
    } else {
      await createCustomer({
        payload: {
          name: value.name,
          email: value.email,
          phone: value.phone,
          address: value.address,
          emailNotification: value.emailNotification,
          smsNotification: value.smsNotification,
          kakaoNotification: value.kakaoNotification,
        },
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

  if (getCustomerLoading) {
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
          initialData={targetCustomer}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </SectionBody>
    </SectionPage>
  )
}

export default PageCustomerEdit
