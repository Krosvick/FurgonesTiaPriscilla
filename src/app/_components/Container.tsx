//component of a simple container that can hold other components

interface ContainerProps{
    children: React.ReactNode
}

export function Container(props: ContainerProps){
    return(
        <div className='mx-auto p-5 mb-8 md:mb-20 w-full rounded-lg shadow-lg bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40'>
            {props.children}
        </div>
    )
}

