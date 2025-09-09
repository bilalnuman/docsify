import React from 'react'
import Icon from '@/components/Icon'

const LockSide = () => {
    return (
        <div className='hidden col-span-6 sm:flex items-center justify-center dark:bg-[#2C2D34] dark:h-full'>
            <Icon name='formLock' size='500' className='text-blue-800 dark:hidden' />
            <Icon name='darkFormLock' size='500' className='text-blue-800 hidden dark:block' />

        </div>
    )
}

export default LockSide