import {useQuery} from "react-query"
import { getTemplates } from "../api";
// import { Toast } from "react-toastify/dist/components";
import {toast} from "react-toastify"

const useTemplates = () => {
    const {data, isLoading, isError, refetch} = useQuery(
        "templates",
        async() => {
            try {
                const templates = await getTemplates();
                return templates
            } catch (error) {
                console.log(error)
                toast.error("Something went Wrong")
            }
        },
        {refetchOnWindowFocus: false}
    )

    return {
        data,
        isError,
        isLoading,
        refetch
    }
}

export default useTemplates