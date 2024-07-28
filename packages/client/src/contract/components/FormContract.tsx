import { customers } from '../../customer/components/TableCustomer'
import { Contract } from '../pages/PageContractEdit'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'

interface FormContractProps {
  initialData: Contract | null
  onSubmit: (data: Contract) => void
  onCancel: () => void
}

const FormContract: React.FC<FormContractProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contract>({
    defaultValues: initialData || {
      id: 0,
      title: '',
      description: '',
      customerName: '',
      startDate: '',
      claimDate: '',
      endDate: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      initialData.startDate = initialData.startDate.split('T')[0]
      initialData.claimDate = initialData.claimDate.split('T')[0]
      initialData.endDate = initialData.endDate.split('T')[0]
      reset(initialData)
    }
  }, [initialData, reset])

  const onSubmitForm: SubmitHandler<Contract> = (data) => {
    onSubmit(data)
  }

  const onFormCancel = () => {
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            보험 계약 수정/생성 페이지
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            신규 보험 계약을 등록하거나, 기존 계약을 수정하는 페이지입니다.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                제목
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    {...register('title', { required: true })}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="홍길동 고객님 생명보험 신규계약"
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  {errors.title && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                설명
              </label>
              <div className="mt-2">
                <textarea
                  {...register('description')}
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                해당 계약을 잘 관리하기 위해 기억해야 할 사항들을 적어주세요.
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="customer"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                고객
              </label>
              <div className="mt-2">
                <select
                  id="customer"
                  name="customer"
                  autoComplete="customer"
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {customers.map((customer) => (
                    <option key={customer.email}>{customer.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="claimWaitDuration"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                계약 청구 대기 기간
              </label>
              <div className="mt-2">
                <select
                  id="claimWaitDuration"
                  name="claimWaitDuration"
                  autoComplete="claimWaitDuration"
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>30일</option>
                  <option>60일</option>
                  <option>90일</option>
                  <option>120일</option>
                  <option>150일</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                계약일
              </label>
              <div className="mt-2">
                <input
                  {...register('startDate', { required: true })}
                  id="startDate"
                  name="startDate"
                  type="date"
                  autoComplete="startDate"
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.startDate && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                계약 만기일
              </label>
              <div className="mt-2">
                <input
                  {...register('endDate', { required: true })}
                  id="endDate"
                  name="endDate"
                  type="date"
                  autoComplete="endDate"
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.endDate && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*TODO: 유저프로필/고객 설정에서 알림 설정하도록 변경*/}
        {/*<div className="border-b border-gray-900/10 pb-12">*/}
        {/*  <h2 className="text-base font-semibold leading-7 text-gray-900">*/}
        {/*    알림*/}
        {/*  </h2>*/}
        {/*  <p className="mt-1 text-sm leading-6 text-gray-600">*/}
        {/*    Insurer는 보험금 청구 가능 기간이 다가올 때 알림을 보내드립니다.{' '}*/}
        {/*    <br />*/}
        {/*    고객, 설계사 모두 알림을 받을 수 있습니다.*/}
        {/*  </p>*/}

        {/*  */}
        {/*  <div className="mt-10 space-y-10">*/}
        {/*    <fieldset>*/}
        {/*      <legend className="text-sm font-semibold leading-6 text-gray-900">*/}
        {/*        고객 알림*/}
        {/*      </legend>*/}
        {/*      <p className="mt-3 text-sm leading-6 text-gray-600">*/}
        {/*        고객 알림 활성화 시, 고객에게 보험금 청구 가능 기간이 다가올 때*/}
        {/*        알림을 보냅니다.*/}
        {/*      </p>*/}
        {/*      <div className="mt-6 space-y-6">*/}
        {/*        <div className="relative flex gap-x-3">*/}
        {/*          <div className="flex h-6 items-center">*/}
        {/*            <input*/}
        {/*              id="email"*/}
        {/*              name="email"*/}
        {/*              type="checkbox"*/}
        {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <div className="text-sm leading-6">*/}
        {/*            <label*/}
        {/*              htmlFor="email"*/}
        {/*              className="font-medium text-gray-900"*/}
        {/*            >*/}
        {/*              Email*/}
        {/*            </label>*/}
        {/*            <p className="text-gray-500">Email 알림 활성화</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="relative flex gap-x-3">*/}
        {/*          <div className="flex h-6 items-center">*/}
        {/*            <input*/}
        {/*              id="kakao"*/}
        {/*              name="kakao"*/}
        {/*              type="checkbox"*/}
        {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <div className="text-sm leading-6">*/}
        {/*            <label*/}
        {/*              htmlFor="kakao"*/}
        {/*              className="font-medium text-gray-900"*/}
        {/*            >*/}
        {/*              카카오톡*/}
        {/*            </label>*/}
        {/*            <p className="text-gray-500">카카오톡 알림 활성화</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="relative flex gap-x-3">*/}
        {/*          <div className="flex h-6 items-center">*/}
        {/*            <input*/}
        {/*              id="sms"*/}
        {/*              name="sms"*/}
        {/*              type="checkbox"*/}
        {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <div className="text-sm leading-6">*/}
        {/*            <label htmlFor="sms" className="font-medium text-gray-900">*/}
        {/*              SMS*/}
        {/*            </label>*/}
        {/*            <p className="text-gray-500">SMS 알림 활성화</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </fieldset>*/}

        {/*    <fieldset>*/}
        {/*      <legend className="text-sm font-semibold leading-6 text-gray-900">*/}
        {/*        설계사 알림*/}
        {/*      </legend>*/}
        {/*      <p className="mt-3 text-sm leading-6 text-gray-600">*/}
        {/*        설계사 알림 활성화 시, 설계사에게 보험금 청구 가능 기간이 다가올*/}
        {/*        때 알림을 보냅니다.*/}
        {/*      </p>*/}
        {/*      <div className="mt-6 space-y-6">*/}
        {/*        <div className="relative flex gap-x-3">*/}
        {/*          <div className="flex h-6 items-center">*/}
        {/*            <input*/}
        {/*              id="email"*/}
        {/*              name="email"*/}
        {/*              type="checkbox"*/}
        {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <div className="text-sm leading-6">*/}
        {/*            <label*/}
        {/*              htmlFor="email"*/}
        {/*              className="font-medium text-gray-900"*/}
        {/*            >*/}
        {/*              Email*/}
        {/*            </label>*/}
        {/*            <p className="text-gray-500">Email 알림 활성화</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="relative flex gap-x-3">*/}
        {/*          <div className="flex h-6 items-center">*/}
        {/*            <input*/}
        {/*              id="kakao"*/}
        {/*              name="kakao"*/}
        {/*              type="checkbox"*/}
        {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <div className="text-sm leading-6">*/}
        {/*            <label*/}
        {/*              htmlFor="kakao"*/}
        {/*              className="font-medium text-gray-900"*/}
        {/*            >*/}
        {/*              카카오톡*/}
        {/*            </label>*/}
        {/*            <p className="text-gray-500">카카오톡 알림 활성화</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="relative flex gap-x-3">*/}
        {/*          <div className="flex h-6 items-center">*/}
        {/*            <input*/}
        {/*              id="sms"*/}
        {/*              name="sms"*/}
        {/*              type="checkbox"*/}
        {/*              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <div className="text-sm leading-6">*/}
        {/*            <label htmlFor="sms" className="font-medium text-gray-900">*/}
        {/*              SMS*/}
        {/*            </label>*/}
        {/*            <p className="text-gray-500">SMS 알림 활성화</p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </fieldset>*/}
        {/*  </div>*/}

        {/*</div>*/}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={onFormCancel}
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default FormContract
