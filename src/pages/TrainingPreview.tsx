import React from 'react'
<<<<<<< HEAD
import Button from '@/components/Button'
=======
import Button from '../components/Button'
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
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