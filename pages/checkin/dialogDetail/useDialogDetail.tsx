import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export const useDialogDetail = () => {
    const  methodForm  = useForm()
    const onSubmit = methodForm.handleSubmit(async () => {


    })
    return [ { methodForm}, { onSubmit }] as const 
}