import { Suspense } from 'react'

import SectionPage from '../../_app/components/section/SectionPage.tsx'
import SectionHeading from '../../_app/components/section/SectionHeading.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'
import Spinner from '../../_app/components/spinner/Spinner.tsx'
import FormEditCustomerLoader from '../components/FormEditCustomerLoader.tsx'

const PageCustomerEdit = () => {
  return (
    <SectionPage>
      <SectionHeading title="고객관리" />
      <SectionBody>
        <Suspense fallback={<Spinner />}>
          <FormEditCustomerLoader />
        </Suspense>
      </SectionBody>
    </SectionPage>
  )
}

export default PageCustomerEdit
