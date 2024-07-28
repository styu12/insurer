import Button from '../../_app/components/button/Button.tsx'
import Pagination from '../../_app/components/pagination/Pagination.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'
import SectionHeading from '../../_app/components/section/SectionHeading.tsx'
import SectionPage from '../../_app/components/section/SectionPage.tsx'
import TableCustomer from '../components/TableCustomer.tsx'
import { useListCustomers } from '../hooks/useCustomerService.ts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PageCustomerList = () => {
  const navigate = useNavigate()

  const { customers, loading, error, fetchAllCustomers } = useListCustomers()

  useEffect(() => {
    fetchAllCustomers()
  }, [fetchAllCustomers])

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
        <TableCustomer customers={customers} />

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
