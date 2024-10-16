'use client'

import React from 'react'
import Image from "next/image"
import linkIcon from '@/app/_assets/svg/link.svg'

export default function Header() {
    return (
        <div className={'header'}>
            <div className={'title'}>
                <h1>distortions</h1>
                <p>three.js</p>
            </div>

            <a href={'https://github.com/katerinaRaven/distortions'} target={'_blank'}>
                <button className={'repo-link'}>
                    repo

                    <Image
                        src={linkIcon}
                        width={24}
                        height={24}
                    />
                </button>
            </a>
        </div>
    )
}