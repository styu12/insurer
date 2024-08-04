import { Suspense } from 'react'
import SectionPage from '../../_app/components/section/SectionPage'
import SectionBody from '../../_app/components/section/SectionBody'
import SectionHeading from '../../_app/components/section/SectionHeading'
import FormContractCreateLoader from '../components/FormContractCreateLoader'
import Spinner from '../../_app/components/spinner/Spinner'

const PageContractCreate = () => {
  return (
    <SectionPage>
      <SectionHeading title="계약관리" />
      <SectionBody>
        <Suspense fallback={<Spinner />}>
          <FormContractCreateLoader />
        </Suspense>
      </SectionBody>
    </SectionPage>
  )
}

export default PageContractCreate
