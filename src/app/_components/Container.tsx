//component of a simple container that can hold other components

interface ContainerProps{
    children: React.ReactNode
    bgColor: string
}

export function Container({bgColor, children}: ContainerProps){
    return(
        <div className={`mx-auto p-5 mb-8 md:mb-20 w-full rounded-lg shadow-lg ${bgColor} bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40`}>
            {children}
        </div>
    )
}

