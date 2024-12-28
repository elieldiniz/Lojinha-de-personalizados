import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href="/" className="border-spacing-1.5">
            <Image src="/logo-texto.png" width={200} height={0} alt="logo" />
        </Link>
    )
}
