"use client"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
            Your Ideas and Documents in One Place Welcome to
             sotion
        </h1>
        <h3 className='text-base sm:text-xl font-medium md:text-2xl'>
            Sotion is a platform that allows you to store <br /> your ideas and documents in one place.
        </h3>
        <Button>
            Get Started
            <ArrowRight className='h-4 w-4 ml-2'/>
        </Button>
    </div>
  )
}

export default Heading