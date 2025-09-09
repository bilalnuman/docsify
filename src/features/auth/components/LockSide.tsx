import React from 'react'
<<<<<<< HEAD
import Icon from '@/components/Icon'
=======
import Icon from '../../../components/Icon'
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

const LockSide = () => {
    return (
        <div className='hidden col-span-6 sm:flex items-center justify-center dark:bg-[#2C2D34] dark:h-full'>
            <Icon name='formLock' size='500' className='text-blue-800 dark:hidden' />
            <Icon name='darkFormLock' size='500' className='text-blue-800 hidden dark:block' />

        </div>
    )
}

export default LockSide