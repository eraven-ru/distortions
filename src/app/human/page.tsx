import React from 'react'
import humanBg from '@/app/_assets/human.jpg'
import Image from "next/image";
import Animation from "@/app/_components/Animation";

export default function Human() {
    return (
        <>
            <Image
                id={'background-image'}
                src={humanBg}
                width={0}
                height={0}
            />

            <Animation
                grid={400}
                radius={0.03}
                strength={0.7}
                relaxation={0.95}

                minPower={1}
                maxPower={100}
            />
        </>
    )
}