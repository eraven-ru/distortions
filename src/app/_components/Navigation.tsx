'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navigation() {
    const pathname = usePathname()
    const isActive = (path: string) => pathname.includes(path)

    return (
        <div className={'navigation'}>
            {['mountains', 'city', 'human', 'stone']
                .map(path => <Link
                        href={`/${path}`}
                        className={isActive(path) ? 'active' : ''}
                    >
                        {path}
                    </Link>
                )
            }
        </div>
    )
}