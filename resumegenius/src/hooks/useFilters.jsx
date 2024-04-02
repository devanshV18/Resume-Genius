import React from 'react'
import { useQuery } from 'react-query'

const useFilters = () => {

    const {data, isLoading, isError, refetch} = useQuery(
        "globalFIlter",
        () => ({searchTerm: ""}),
        {refetchOnWindowFocus: false}
    )

    return {data, isLoading, isError, refetch};
}

export default useFilters
