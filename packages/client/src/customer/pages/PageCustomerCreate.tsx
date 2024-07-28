import SectionPage from '../../_app/components/section/SectionPage.tsx'
import SectionHeading from '../../_app/components/section/SectionHeading.tsx'
import SectionBody from '../../_app/components/section/SectionBody.tsx'

import ContentFormCreateCustomer from '../components/ContentFormCreateCustomer.tsx'

const PageCustomerCreate = () => {
  return (
    <SectionPage>
      <SectionHeading title="고객관리" />
      <SectionBody>
        <ContentFormCreateCustomer />
      </SectionBody>
    </SectionPage>
  )
}

export default PageCustomerCreate
