import { Suspense } from 'react'
import SectionHeading from '../../_app/components/section/SectionHeading.tsx'
import SectionPage from '../../_app/components/section/SectionPage.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'
import CalendarLoader from '../components/CalendarLoader.tsx'
import Spinner from '../../_app/components/spinner/Spinner.tsx'

const PageContractList = () => {
  return (
    <SectionPage>
      <SectionHeading title="계약관리" />
      <SectionBody>
        <Suspense fallback={<Spinner />}>
          <CalendarLoader />
        </Suspense>
      </SectionBody>
    </SectionPage>
  )
}

export default PageContractList
