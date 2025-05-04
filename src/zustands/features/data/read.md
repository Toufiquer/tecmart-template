<!-- I want to build or My goal -->

This demo is just for design faster with the help of zustand.

problem: in front-end if you are using rtk-query you may know you must invoke hooks but it will call api, if you want to change models or some backend changes it will cost many times for you.

Solution: If front-end you will design with the help of zustand and after final conformation you can replace hooks as you want.

<!-- ---------------------------------------------------------------------------------------------------------------------- -->
<!-- @ ! RTK-query Hook example -->
<!-- ---------------------------------------------------------------------------------------------------------------------- -->

import {useGetDataQuery, useGetDataByIdQuery, useAddDataMutation, useUpdateDataMutation, useDeleteDataMutation, useBulkDeleteDataMutation, useBulkUpdateDataMutation} from "@/redux/features/data"

<!-- ! 1. Query - get request -->
<!-- //  with page and limit  -->

const { data: getResponseAllData, isLoading, isError, error } = useGetDataQuery({ page, limit });

<!-- // query all data  -->

const { data: getResponseAllData, isLoading, isError, error } = useGetDataQuery();

<!-- // query with id -->

const { data: getResponseSingleData, refetch,isLoading, isError, error } = useGetDataByIdQuery(selectedData?.\_id, { skip: !selectedData?.\_id });

<!-- ! 2. Mutation - put, post, delete request -->

<!-- // post  -->

const [addData, { isLoading, isError, error, isSuccess }] = useAddDataMutation();

<!-- // put  -->

const [updateData, { isLoading, isError, error, isSuccess }] = useUpdateDataMutation();

<!-- // delete  -->

const [deleteData, { isLoading, isError, error, isSuccess }] = useDeleteDataMutation();

<!-- // bulkDelete -->

const [bulkDeleteData, { isLoading, isError, error, isSuccess }] = useBulkDeleteDataMutation();

<!-- // bulkUpdate -->

const [bulkUpdateData, { isLoading, isError, error, isSuccess }] = useBulkUpdateDataMutation();

<!-- ---------------------------------------------------------------------------------------------------------------------- -->
<!-- @ ! RTK-query Hook example -->
<!-- ---------------------------------------------------------------------------------------------------------------------- -->

<!-- ---------------------------------------------------------------------------------------------------------------------- -->
<!-- @ ! zustand Hook example -->
<!-- ---------------------------------------------------------------------------------------------------------------------- -->

import {useGetDataQuery, useGetDataByIdQuery, useAddDataMutation, useUpdateDataMutation, useDeleteDataMutation, useBulkDeleteDataMutation, useBulkUpdateDataMutation} from "@/zustand/features/data"

<!-- ! 1. Query - get request -->
<!-- //  with page and limit  -->

const { data: getResponseAllData, isLoading, isError, error } = useGetDataQuery({ page, limit });

<!-- // query all data  -->

const { data: getResponseAllData, isLoading, isError, error } = useGetDataQuery();

<!-- // query with id -->

const { data: getResponseSingleData, refetch,isLoading, isError, error } = useGetDataByIdQuery(selectedData?.\_id, { skip: !selectedData?.\_id });

<!-- ! 2. Mutation - put, post, delete request -->

<!-- // post  -->

const [addData, { isLoading, isError, error, isSuccess }] = useAddDataMutation();

<!-- // put  -->

const [updateData, { isLoading, isError, error, isSuccess }] = useUpdateDataMutation();

<!-- // delete  -->

const [deleteData, { isLoading, isError, error, isSuccess }] = useDeleteDataMutation();

<!-- // bulkDelete -->

const [bulkDeleteData, { isLoading, isError, error, isSuccess }] = useBulkDeleteDataMutation();

<!-- // bulkUpdate -->

const [bulkUpdateData, { isLoading, isError, error, isSuccess }] = useBulkUpdateDataMutation();

<!-- ---------------------------------------------------------------------------------------------------------------------- -->
<!-- @ ! zustand Hook example -->
<!-- ---------------------------------------------------------------------------------------------------------------------- -->
