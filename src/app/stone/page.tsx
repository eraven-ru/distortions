import React from 'react'
import stoneBg from '@/app/_assets/stone.jpg'
import Image from "next/image";
import Animation from "@/app/_components/Animation";

export default function Stone() {
    return (
        <>
            <Image
                id={'background-image'}
                src={stoneBg}
                width={0}
                height={0}
            />

            <Animation
                grid={40}
                radius={0.2}
                strength={0.5}
                relaxation={0.6}

                minPower={1}
                maxPower={100}
            />
        </>
    )
}