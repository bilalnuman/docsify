import React from 'react'
import Button from '../components/Button'
import { MdOutlineFileDownload } from "react-icons/md";

const TrainingPreview = () => {
    return (
        <div className='pt-5'>
            <div className="flex items-center justify-between">
                <div className='text-[28px] font-semibold text-dark-default pb-3'>Training Manual</div>
                <Button className='h-11' iconLeft={<MdOutlineFileDownload size={24} />}>Download</Button>
            </div>
        </div>
    )
}

export default TrainingPreview