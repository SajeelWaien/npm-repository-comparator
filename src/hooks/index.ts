import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, dependencies: any[] = [], delay: number = 1000) => {
    const [val, setVal] = useState(value)

    useEffect (() => {
        const timer = setTimeout(() => {
            setVal(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, ...dependencies])

    return val
}