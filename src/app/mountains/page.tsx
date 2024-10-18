import React from 'react'
import mountainsBg from '@/app/_assets/mountains.jpg'
import Image from "next/image";
import Animation from "@/app/_components/Animation";

export default function Mountains() {
    return (
        <>
            <Image
                id={'background-image'}
                src={mountainsBg}
                width={0}
                height={0}
            />

            <Animation
                grid={200}
                radius={0.3}
                strength={0.45}
                relaxation={0.4}

                minPower={1}
                maxPower={100}
            />
        </>
    )
}