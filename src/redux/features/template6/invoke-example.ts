// ! 0. base data
// __1__ = users;
// __3__ = User;

// ! 1. Query - get request
// with page and limit -> const { data: getResponseData, isLoading, isError, error } = useGet__1__Query({ page, limit });
// query all data -> const { data: getResponseData, isLoading, isError, error } = useGet__1__Query();
// query with id -> const { data: getResponseSingleData, refetch } = useGet__3__ByIdQuery(selected__3__?._id, { skip: !selected__3__?._id });

// ! 2. Mutation - put, post, delete request
// post -> const [add__3__, { isLoading, isError, error, isSuccess }] = useAdd__3__Mutation();
// put -> const [update__3__, { isLoading, isError, error, isSuccess }] = useUpdate__3__Mutation();
// delete -> const [delete__3__, { isLoading, isError, error, isSuccess }] = useDelete__3__Mutation();
// bulkDelete [bulkDelete__3__, { isLoading, isError, error, isSuccess }] = useBulkDelete__3__Mutation();
// bulkUpdate [bulkUpdate__3__, { isLoading, isError, error, isSuccess }] = useBulkUpdate__3__Mutation();
