
import Pricing from '@/components/Pricing'
import CTA from './components/CTA'
import Features from './components/Features'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import TestimonialsSection from './components/TestimonialsSection'

const LandingComponent = () => {
    return (
        <div className=' dark:bg-black'>
            <Navbar />

            <div className='bg-white dark:bg-black'>
                <Hero />
            </div>
            <div className='bg-[#f1f4f4] py-16 dark:bg-black'>
                <div className='max-w-[1440px] mx-auto'>
                    <Features />
                </div>
                <div id="pricing" className='max-w-[1440px] mx-auto mt-12'>
                    <Pricing isFree/>
                </div>
                <div className='max-w-[1440px] mx-auto mt-5'>
                    <TestimonialsSection />
                </div>
            </div>
            <CTA />
        </div>
    )
}

export default LandingComponent