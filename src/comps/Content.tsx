import { Stack, Typography, TextField, Button } from "@mui/material"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import ReactJson from 'react-json-view'
import axios from "axios"
export default () => {
    const [token, setToken] = useState("ce23550865d2a94cfbc34dc32e4229c3")
    const [showResp, setShowResp] = useState({})
    const [showReq, setShowReq] = useState({})
    const { api } = useSelector((state: any) => state)
    const { reset, register, watch, setValue, handleSubmit } = useForm({
        defaultValues: {
            url: "",
            path: [],
            query: []
        }
    })
    useEffect(() => {
        const {  url, path, query } = api as ApiObject
        reset({
            url,
            path: [...Array(path.length).fill("")],
            query: [...Array(query.length).fill("")],
        })
        setShowReq({})
        setShowResp({})
    }, [api])

    const textChange = (e: any, index: number, str: "path" | "query") => {
        const val = watch(str)
        val[index] = e.target.value as never
        setValue(str, val)
    }

    const onSubmit = async (data: FormResponse) => {
        const { path, query, method } = api as ApiObject

        path.map((u, index) => {
            data.url = data.url.replace(`{${u}}`, data.path[index])
        })

        if (query?.length) data.url += "?"

        query?.map((q, index) => {
            if (query[index]) data.url += `${q}=${query[index]}`
        })
        const heads: { [key: string]: string } = {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }

        


        const base = "http://localhost:8080/hmrcapi"
        try {

            let res = await axios.post(`${base}`, {
                "url": data.url,
                "accessToken": token,
                "type": method
            }, { headers: heads })

            const { headers: head, data: post_data, method: type, url } = res.config

            setShowReq({
                headers: head,
                data: JSON.parse(post_data),
                method: type,
                url,
            })
            setShowResp(res.data)

        } catch (e: any) {
            setShowReq({})
            setShowResp(e)
        }

    }
    return <div className="w-full">
        <Stack alignItems="center" flexDirection="row" justifyContent="flex-end" className="mt-5 pr-10 w-full">
            <Typography className="pr-5">Token</Typography>
            <TextField size="small" value={token} onChange={e => setToken(e.target.value)} />
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack alignItems="center" flexDirection="row" justifyContent="center" className="mt-5 pr-10 w-full">
                <TextField disabled {...register("url")} size="small" className="w-10/12 bg-gray-100 self-start" />
                <div className="mx-1"></div>
                <Button type="submit" variant="contained">
                    <span className="capitalize">Send Request</span>
                </Button>
            </Stack>
            {/* Path */}
            <Stack>
                <span className="text-left ml-4 my-5 text-2xl">Path Parameters</span>
                <div className="ml-4">
                    {
                        api.path.map((el: string, index: number) => <Stack key={index} flexDirection="row" alignItems="center" className="my-2">
                            <TextField size="small" label={el} value={watch("path")[index] || ""} onChange={e => textChange(e, index, "path")} />
                        </Stack>)
                    }
                </div>
            </Stack>
            {/* Query Parameter */}
            <Stack>
                {Boolean(api.query?.length) && <span className="text-left ml-4 my-5 text-2xl">Query Parameter</span>}
                <div className="ml-4">
                    {
                        api.query.map((el: string, index: number) => <Stack key={index} flexDirection="row" alignItems="center" className="my-2">
                            <TextField size="small" label={el} value={watch("query")[index] || ""} onChange={e => textChange(e, index, "query")} />
                        </Stack>)
                    }
                </div>
            </Stack>
        </form>

        {Boolean(Object.keys(showReq).length) && <div className="ml-5 my-10">
            <Typography className="text-left" variant="h6">Request</Typography>
            <ReactJson displayDataTypes={false} src={showReq} style={{ textAlign: "left", backgroundColor: "lightblue", width: "90%", borderRadius: "3px" }} />
        </div>}

        {Boolean(Object.keys(showResp).length) && <div className="ml-5">
            <Typography className="text-left" variant="h6">Response</Typography>
            <ReactJson displayDataTypes={false} src={showResp} style={{ textAlign: "left", backgroundColor: "lightblue", width: "90%", borderRadius: "3px" }} />
        </div>}
    </div>
}