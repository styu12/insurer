import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Customer } from '../../__codegen__/__openapi__/insurer-server'

interface FormCustomerProps {
  initialData?: Customer
  onSubmit: (_: Customer) => void
  onCancel: () => void
}

const FormCustomer = ({
  initialData,
  onSubmit,
  onCancel,
}: FormCustomerProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Customer>({
    defaultValues: initialData || {
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      emailNotification: false,
      smsNotification: false,
      kakaoNotification: false,
    },
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const onSubmitForm: SubmitHandler<Customer> = (data) => {
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
            고객 수정/생성 페이지
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            신규 고객을 등록하거나, 기존 고객을 수정하는 페이지입니다.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            고객 정보
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이름
              </label>
              <div className="mt-2">
                <input
                  {...register('name', { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  {...register('email', { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            {/*TODO: 생년월일 필요한가?*/}
            {/*<div className="sm:col-span-2">*/}
            {/*  <label*/}
            {/*    htmlFor="birthday"*/}
            {/*    className="block text-sm font-medium leading-6 text-gray-900"*/}
            {/*  >*/}
            {/*    생년월일*/}
            {/*  </label>*/}
            {/*  <div className="mt-2">*/}
            {/*    <input*/}
            {/*      id="birthday"*/}
            {/*      name="birthday"*/}
            {/*      type="date"*/}
            {/*      autoComplete="birthday"*/}
            {/*      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                주소
              </label>
              <div className="mt-2">
                <input
                  {...register('address', { required: true })}
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.address && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                연락처
              </label>
              <div className="mt-2">
                <input
                  {...register('phone', { required: true })}
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            {/*TODO: gender 필요한가?*/}
            {/*<div className="sm:col-span-1">*/}
            {/*  <label*/}
            {/*    htmlFor="gender"*/}
            {/*    className="block text-sm font-medium leading-6 text-gray-900"*/}
            {/*  >*/}
            {/*    성별*/}
            {/*  </label>*/}
            {/*  <div className="mt-2">*/}
            {/*    <select*/}
            {/*      id="gender"*/}
            {/*      name="gender"*/}
            {/*      autoComplete="gender"*/}
            {/*      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
            {/*    >*/}
            {/*      <option>남성</option>*/}
            {/*      <option>여성</option>*/}
            {/*    </select>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  고객 알림
                </legend>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  고객 알림 활성화 시, 고객에게 보험금 청구 가능 기간이 다가올
                  때 알림을 보냅니다.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        {...register('emailNotification')}
                        id="emailNotification"
                        name="emailNotification"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="emailNotification"
                        className="font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <p className="text-gray-500">Email 알림 활성화</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        {...register('smsNotification')}
                        id="smsNotification"
                        name="smsNotification"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="smsNotification"
                        className="font-medium text-gray-900"
                      >
                        SMS
                      </label>
                      <p className="text-gray-500">SMS 알림 활성화</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        {...register('kakaoNotification')}
                        id="kakaoNotification"
                        name="kakaoNotification"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="kakaoNotification"
                        className="font-medium text-gray-900"
                      >
                        카카오톡
                      </label>
                      <p className="text-gray-500">카카오톡 알림 활성화</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
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

export default FormCustomer
