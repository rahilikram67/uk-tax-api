import { Button, Typography } from "@mui/material"
import { useState } from "react"
import SimpleAccordion from "./Accordion"
import data from "../data.json"
export default () => {
    const items = [
        "Business Details",   // 2 
        "Business Income Source Summary", // 1
        "Business Source Adjustable Summary", // 8
        "CIS Deductions", // 4
        "Individual Calculations", // 4
        "Individual Losses", // 11 
        "Individuals Business Statement" // 1
    ]

    return <div className="bg-blue-400 w-3/12 h-[100vh] overflow-y-auto fixed">
        <Typography variant="h4" className="mt-10 text-white">
            Navigation
        </Typography>
        <div className="my-10"></div>
        {
            Object.entries(data).map(([title, objs], index) => <SimpleAccordion key={index} title={title} urls={objs.map(e => e?.url)} />)
        }
    </div>
}