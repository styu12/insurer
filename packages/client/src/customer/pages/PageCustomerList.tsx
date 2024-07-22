import Button from '../../_app/components/button/Button.tsx'
import SectionHeading from '../../_app/components/section-heading/SectionHeading.tsx'
import SectionPage from '../../_app/components/section-page/SectionPage.tsx'
import TableCustomer from '../components/TableCustomer.tsx'

const PageCustomerList = () => {
  return (
    <SectionPage>
      <SectionHeading
        title="고객관리"
        description="고객 명단을 확인하는 페이지입니다."
        actions={
          <>
            <Button secondary>추가</Button>
            <Button className="ml-3">추가</Button>
          </>
        }
      />
      <TableCustomer />
    </SectionPage>
  )
}

export default PageCustomerList
