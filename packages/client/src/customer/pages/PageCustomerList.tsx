import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../_app/components/button/Button.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'
import SectionHeading from '../../_app/components/section/SectionHeading.tsx'
import SectionPage from '../../_app/components/section/SectionPage.tsx'
import ContentCustomerList from '../components/ContentCustomerList.tsx'
import Spinner from '../../_app/components/spinner/Spinner.tsx'

const PageCustomerList = () => {
  const navigate = useNavigate()

  return (
    <SectionPage>
      <SectionHeading
        title="고객관리"
        description="고객 명단을 확인하는 페이지입니다."
        actions={
          <>
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
        <Suspense fallback={<Spinner />}>
          <ContentCustomerList />
        </Suspense>
      </SectionBody>
    </SectionPage>
  )
}

export default PageCustomerList
