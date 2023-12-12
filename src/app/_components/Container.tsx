//component of a simple container that can hold other components

interface ContainerProps{
    children: React.ReactNode
}

export function Container(props: ContainerProps){
    return(
        <div className='container glass mx-auto p-5 mb-8 md:mb-20 w-full rounded-lg shadow-lg'>
            {props.children}
        </div>
    )
}

