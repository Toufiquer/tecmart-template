/*
|-----------------------------------------
| setting up SingleDataView for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: shreshtho-v3, April, 2025
|-----------------------------------------
*/
import { IData } from '@/zustands/features/data/useData'

import {
  useUpdateDataMutation,
  useDeleteDataMutation,
} from '@/zustands/features/data/useData'
import LoadingComponent from './components-others/LoadingComponent'
import ErrorComponent from './components-others/ErrorComponent'
import { useState } from 'react'

const SingleDataView = ({ data }: { data: IData }) => {
  const [customText, setCustomText] = useState('')
  const [
    updateData,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
    },
  ] = useUpdateDataMutation()
  const [
    deleteData,
    {
      isLoading: isLoadingDelete,
      isError: isErrorDelete,
      isSuccess: isSuccessDelete,
      error: errorDelete,
    },
  ] = useDeleteDataMutation()
  console.log('isSuccessUpdate : ', isSuccessUpdate)
  console.log('isSuccessDelete: ', isSuccessDelete)
  const handleUpdate = () => {
    updateData(data.id, { title: data.title + 1 })
  }
  const handleDelete = () => {
    deleteData(data.id)
  }
  let renderData = <LoadingComponent />
  if (!isLoadingUpdate && isErrorUpdate) {
    renderData = <ErrorComponent error={errorUpdate || 'Update error'} />
  }
  if (!isLoadingUpdate && isSuccessUpdate) {
    setCustomText('Update Successful')
  }
  if (!isLoadingDelete && isSuccessDelete) {
    setCustomText('Delete Successful')
  }
  if (!isLoadingDelete && isErrorDelete) {
    renderData = <ErrorComponent error={errorDelete || ''} />
  }
  if (!isLoadingUpdate) {
    renderData = (
      <main className="border-1 border-slate-500 p-2 flex gap-2 items-center justify-between">
        <div className="w-full flex gap-4 items-center">
          <h2>{data.id}</h2>
          <h2>{data.title}</h2>
        </div>
        <div className="w-full flex items-center justify-end gap-4">
          <p className="px-4 text-sm text-slate-500">{customText}</p>
          <button
            className="border-1 rounded-lg border-green-600 text-green-600 px-4 cursor-pointer"
            onClick={handleUpdate}
          >
            Update
          </button>{' '}
          <button
            className="border-1 rounded-lg border-rose-600 text-rose-600 px-4 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </main>
    )
  }
  return renderData
}
export default SingleDataView
