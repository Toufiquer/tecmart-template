// zustands/features/Data/useData.ts
import { create } from 'zustand'

export type IData = { id: string; title: string }

export const initialData: IData[] = Array.from({ length: 10 }, (_, index) => {
  const dataNumber = index + 1
  return {
    id: String(dataNumber), // Or use a more robust ID generation if needed, like UUID
    title: `Data ${dataNumber}`,
  }
})
// Define the store state type
export interface DataStore {
  data: IData[]
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  error: string | null
  isEditing: string | null
  deleteData: (id: string) => void
  addData: (item: IData) => void
  setData: (data: IData[]) => void
  setIsLoading: (status: boolean) => void
  setIsEditing: (id: string | null) => void
  updateData: (id: string, data: Partial<IData>) => void
}
export type QueryData = {
  data: IData[]
  setData: (data: IData[]) => void
  isLoading: boolean
  error: string | null
  isError: boolean
  isSuccess: boolean
}
export type MutationDataStatus = {
  isLoading: boolean
  error: string | null
  isError: boolean
  isSuccess: boolean
  isEditing: string | null
  setIsEditing: (id: string | null) => void
}
export type MutationUpdateData = [
  (id: string, data: Partial<IData>) => void,
  {
    isLoading: boolean
    error: string | null
    isError: boolean
    isSuccess: boolean
  },
]
export type MutationDeleteData = [
  (id: string) => void,
  {
    isLoading: boolean
    error: string | null
    isError: boolean
    isSuccess: boolean
  },
]
export type MutationCreateData = [
  (data: IData) => void,
  {
    isLoading: boolean
    error: string | null
    isError: boolean
    isSuccess: boolean
  },
]
// Create the store
export const useDataStore = create<DataStore>((set) => ({
  data: [],
  error: '',
  isEditing: null,
  isError: false,
  isSuccess: false,
  isLoading: false,

  setData: (data) => set({ data }),

  addData: (item) =>
    set((state) => ({
      data: [...state.data, item],
    })),

  updateData: (id, newData) =>
    set((state) => ({
      data: state.data.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      ),
    })),

  deleteData: (id) =>
    set((state) => ({
      data: state.data.filter((item) => item.id !== id),
    })),

  setIsLoading: (status) => set({ isLoading: status }),

  setIsEditing: (id) => set({ isEditing: id }),
}))

// Hooks for components to use
export const useGetDataQuery = (): QueryData => {
  const data = useDataStore((state) => state.data)
  const setData = useDataStore((state) => state.setData)
  const isLoading = useDataStore((state) => state.isLoading)
  const isError = useDataStore((state) => state.isError)
  const isSuccess = useDataStore((state) => state.isSuccess)
  const error = useDataStore((state) => state.error)
  return { data, setData, isLoading, error, isError, isSuccess }
}

export const useCreateDataMutation = (): MutationCreateData => {
  const addData = useDataStore((state) => state.addData)
  const setIsLoading = useDataStore((state) => state.setIsLoading)
  const isLoading = useDataStore((state) => state.isLoading)
  const isError = useDataStore((state) => state.isError)
  const isSuccess = useDataStore((state) => state.isSuccess)
  const error = useDataStore((state) => state.error)
  const addWithLoading = (data: IData) => {
    setIsLoading(true)
    setTimeout(() => {
      addData(data)
      setIsLoading(false)
    }, 500)
  }

  return [addWithLoading, { isLoading, error, isError, isSuccess }]
}

export const useUpdateDataMutation = (): MutationUpdateData => {
  const updateData = useDataStore((state) => state.updateData)
  const setIsLoading = useDataStore((state) => state.setIsLoading)
  const setIsEditing = useDataStore((state) => state.setIsEditing)
  const isLoading = useDataStore((state) => state.isLoading)
  const isError = useDataStore((state) => state.isError)
  const isSuccess = useDataStore((state) => state.isSuccess)
  const error = useDataStore((state) => state.error)
  const updateWithLoading = (id: string, data: Partial<IData>) => {
    setIsLoading(true)
    setTimeout(() => {
      updateData(id, data)
      setIsEditing(null)
      setIsLoading(false)
    }, 500)
  }

  return [updateWithLoading, { isLoading, error, isError, isSuccess }]
}

export const useDeleteDataMutation = (): MutationDeleteData => {
  const deleteData = useDataStore((state) => state.deleteData)
  const setIsLoading = useDataStore((state) => state.setIsLoading)
  const isLoading = useDataStore((state) => state.isLoading)
  const isError = useDataStore((state) => state.isError)
  const isSuccess = useDataStore((state) => state.isSuccess)
  const error = useDataStore((state) => state.error)
  const deleteWithLoading = (id: string) => {
    setIsLoading(true)
    setTimeout(() => {
      deleteData(id)
      setIsLoading(false)
    }, 500)
  }

  return [deleteWithLoading, { isLoading, error, isError, isSuccess }]
}

export const useStoreState = (): MutationDataStatus => {
  const isLoading = useDataStore((state) => state.isLoading)
  const isError = useDataStore((state) => state.isError)
  const isSuccess = useDataStore((state) => state.isSuccess)
  const error = useDataStore((state) => state.error)
  const setIsEditing = useDataStore((state) => state.setIsEditing)
  const isEditing = useDataStore((state) => state.isEditing)
  return { isLoading, error, isError, isSuccess, isEditing, setIsEditing }
}
