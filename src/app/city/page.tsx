import React from 'react'
import cityBg from '@/app/_assets/city.jpg'
import Image from "next/image";
import Animation from "@/app/_components/Animation";

export default function City() {
    return (
        <>
            <Image
                id={'background-image'}
                src={cityBg}
                width={0}
                height={0}
            />

            <Animation
                grid={12}
                radius={0.3}
                strength={0.8}
                relaxation={0.6}

                minPower={1}
                maxPower={7}
            />
        </>
    )
}