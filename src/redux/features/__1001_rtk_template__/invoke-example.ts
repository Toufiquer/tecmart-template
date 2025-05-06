// ! 0. base data
// __2_template__ = users;
// __3_template__ = User;

// ! 1. Query - get request
// with page and limit -> const { data: getResponseData, isLoading, isError, error } = useGet__2_template__Query({ page, limit });
// query all data -> const { data: getResponseData, isLoading, isError, error } = useGet__2_template__Query();
// query with id -> const { data: getResponseSingleData, refetch } = useGet__3_template__ByIdQuery(selected__3_template__?._id, { skip: !selected__3_template__?._id });

// ! 2. Mutation - put, post, delete request
// post -> const [add__3_template__, { isLoading, isError, error, isSuccess }] = useAdd__3_template__Mutation();
// put -> const [update__3_template__, { isLoading, isError, error, isSuccess }] = useUpdate__3_template__Mutation();
// delete -> const [delete__3_template__, { isLoading, isError, error, isSuccess }] = useDelete__3_template__Mutation();
// bulkDelete -> const [bulkDelete__3_template__, { isLoading, isError, error, isSuccess }] = useBulkDelete__3_template__Mutation();
// bulkUpdate -> const [bulkUpdate__3_template__, { isLoading, isError, error, isSuccess }] = useBulkUpdate__3_template__Mutation();
