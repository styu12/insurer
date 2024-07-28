import Button from '../../_app/components/button/Button.tsx'
import Pagination from '../../_app/components/pagination/Pagination.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'
import SectionHeading from '../../_app/components/section/SectionHeading.tsx'
import SectionPage from '../../_app/components/section/SectionPage.tsx'
import TableCustomer from '../components/TableCustomer.tsx'
import { useListCustomers } from '../hooks/useCustomerService.ts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  emailNotification: boolean
  smsNotification: boolean
  kakaoNotification: boolean
}

const PageCustomerList = () => {
  const navigate = useNavigate()

  const [customerList, setCustomerList] = useState<Customer[]>([])
  const { customers, loading, error, fetchAllCustomers } = useListCustomers()

  useEffect(() => {
    fetchAllCustomers()
  }, [fetchAllCustomers])

  useEffect(() => {
    if (Array.isArray(customers) && customers.length > 0) {
      setCustomerList(
        customers.map((customer) => ({
          id: customer.id || 0,
          name: customer.name || '',
          email: customer.email || '',
          phone: customer.phone || '',
          address: customer.address || '',
          emailNotification: customer.emailNotification || false,
          smsNotification: customer.smsNotification || false,
          kakaoNotification: customer.kakaoNotification || false,
        }))
      )
    }
  }, [customers])

  if (loading) {
    return (
      <SectionPage>
        <SectionHeading
          title="고객관리"
          description="고객 명단을 확인하는 페이지입니다."
        />
        <SectionBody>
          <div>Loading...</div>
        </SectionBody>
      </SectionPage>
    )
  }

  if (error) {
    return (
      <SectionPage>
        <SectionHeading
          title="고객관리"
          description="고객 명단을 확인하는 페이지입니다."
        />
        <SectionBody>
          <div>Error: {error.message}</div>
        </SectionBody>
      </SectionPage>
    )
  }

  return (
    <SectionPage>
      <SectionHeading
        title="고객관리"
        description="고객 명단을 확인하는 페이지입니다."
        actions={
          <>
            {/*<Button secondary>추가</Button>*/}
            <Button
              onClick={() => navigate('/customer/create')}
              className="ml-3"
            >
              추가
            </Button>
          </>
        }
      />
      <SectionBody>
        <TableCustomer customers={customerList} />

        <Pagination
          totalItems={1000}
          itemsPerPage={10}
          onChangePage={(number) => {
            console.log(number)
          }}
        />
      </SectionBody>
    </SectionPage>
  )
}

export default PageCustomerList
