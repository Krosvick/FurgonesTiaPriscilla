//component of a simple container that can hold other components

interface ContainerProps{
    children: React.ReactNode
    bgColor: string
    className?: string
}

export function Container({bgColor, children, className}: ContainerProps){
    return(
        <div className={`mx-auto p-5 mb-8 md:mb-20 w-full shadow-lg ${bgColor} bg-clip-padding backdrop-filter backdrop-blur-md ${className}`}>
            {children}
        </div>
    )
}

