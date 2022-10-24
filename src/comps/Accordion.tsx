import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material"
import { useDispatch } from 'react-redux';
import data from "../data.json"
import { setApiData } from '../store/apiSlice';

export default function SimpleAccordion({ title, urls }: { title: string, urls: string[] }) {
    const dispatch = useDispatch()
    const changeApi = (url: string, index: number) => {
        dispatch(setApiData((data as any)[title][index]))
    }
    return (
        <Accordion disableGutters sx={{ bgcolor: "Highlight" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon className='text-white' />}
            >
                <Typography color="white">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    urls.map((e: string, index) => <div key={index}>
                        <Button variant="contained" color="success" className="w-full text-2xl" onClick={() => changeApi(e, index)}>
                            <span className="lowercase">{e}</span>
                        </Button>
                        <p className='my-4'></p>
                    </div>)
                }
            </AccordionDetails>
        </Accordion>
    );
}
