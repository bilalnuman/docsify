import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
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
                <div id="pricing" className='max-w-[1440px] mx-auto'>
                    <Pricing />
                </div>
                <div className='max-w-[1440px] mx-auto'>
                    <TestimonialsSection />
                </div>
            </div>
            <CTA />
        </div>
    )
}

export default LandingComponent