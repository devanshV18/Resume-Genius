import { toast } from "react-toastify"



const useUser = () => {
    const {data, isLoading, isError, refetch} = useQuery(
        "user",
        async() => {
            try {
                const userDetail = await getUserDetail();
                return userDetail
            } catch (err) {
                if(!err.message.includes("not authenticated")){
                    toast.err("Something went Wrong...")
                }
            }
        }
    )
}