/*
|-----------------------------------------
| setting up AddData for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: shreshtho-v3, April, 2025
|-----------------------------------------
*/

'use client'

import { initialData } from '@/zustands/features/data/useData'
import {
  useGetDataQuery,
  useCreateDataMutation,
} from '@/zustands/features/data/useData'

const AddData = () => {
  const [createData] = useCreateDataMutation()
  const { data } = useGetDataQuery()
  const handleAddNewData = () => {
    const newData = { ...data[0] }
    newData.id = `${data.length + 1}`
    newData.title = `Data title ${data.length + 1}`
    console.log(' => Line No: 26')
    createData(newData)
  }
  const handleSetData = () => {
    console.log(' => Line No: 30')
    console.log('data', data)
    initialData.map((c) => createData(c))
  }
  return (
    <main className="gap-8 flex ">
      <button
        className="border-1 rounded-lg border-slate-600 px-4 cursor-pointer"
        onClick={handleSetData}
      >
        Set Data
      </button>
      <button
        className="border-1 rounded-lg border-slate-600 px-4 cursor-pointer"
        onClick={handleAddNewData}
      >
        Add a new Data
      </button>
    </main>
  )
}
export default AddData
