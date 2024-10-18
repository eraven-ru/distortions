'use client'

import React, {useEffect, useState} from 'react'
import humanBg from '@/app/_assets/human.jpg'
import Image from "next/image";
import Animation from "@/app/_components/Animation";

export default function Human() {
    const [grid, setGrid] = useState(0)

    useEffect(() => {
        if (window.innerWidth > 900) setGrid(700)
        else setGrid(300)
    }, [])

    return (
        <>
            <Image
                id={'background-image'}
                src={humanBg}
                width={0}
                height={0}
            />

            {!!grid && (
                <Animation
                    grid={grid}
                    radius={0.03}
                    strength={0.7}
                    relaxation={0.95}

                    minPower={1}
                    maxPower={100}
                />
            )}
        </>
    )
}