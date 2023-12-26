import Image from "next/image";

export default function page() {
    return (
        <section className="min-w-screen flex flex-col justify-center min-h-screen items-center p-5">

            <div className="bg-white h-full rounded-xl max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32 h-2/3">
                    <div>
                        <Image className=" rounded-xl" src="/images/furgon3.png" width={600} height={500} alt="Image Description" />
                    </div>


                    <div className="mt-5 sm:mt-10 lg:mt-0">
                        <div className="space-y-6 sm:space-y-8">

                            <div className="space-y-2 md:space-y-4">
                                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                                    Furgones Tía Priscilla asegurando un viaje seguro y agradable.
                                </h2>
                                <p className="text-gray-500">
                                    Desde 2011 en la comunidad escolar de Alto hospicio, hemos brindado el aporte de un viaje seguro, agradable y de calidad a todos nuestros clientes, apoderados y alumnos de la localidad.
                                </p>
                            </div>

                            <ul role="list" className="space-y-2 sm:space-y-4">
                                <li className="flex space-x-3">
                                    <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                        <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>

                                    <span className="text-sm sm:text-base text-gray-500">
                                        <span className="font-bold">Rápido y seguro</span>
                                    </span>
                                </li>

                                <li className="flex space-x-3">
                                    <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                        <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>

                                    <span className="text-sm sm:text-base text-gray-500">
                                        Primeros en la <span className="font-bold">localidad</span>
                                    </span>
                                </li>

                                <li className="flex space-x-3">
                                    <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                        <svg className="flex-shrink-0 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>

                                    <span className="text-sm sm:text-base text-gray-500">
                                        A su servicio por años
                                    </span>
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>

            </div>

            <div className="flex flex-col lg:flex-row w-full gap-6 mt-4 h-1/3 p-4 justify-center items-stretch mx-auto max-w-[85rem]">
                <div className="lg:w-1/2 flex-grow h-full w-full flex-basis-0 p-6 bg-white rounded-xl flex flex-col">
                    <p className="text-center text-4xl">
                        🚍
                    </p>

                    <h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
                        Misión
                    </h2>

                    <p className="mt-2 text-gray-800 text-justify flex-grow">
                        Entregar un servicio productivo y de calidad a la problemática de movilización escolar 
                        en horarios punta dentro de la cuidad de alto hospicio, demostrando compromiso y dedicación 
                        a los involucrados dentro del servicio, tanto como estudiantes, apoderados y establecimientos educacionales.
                    </p>
                </div>
                <div className="lg:w-1/2 flex-grow h-full w-full flex-basis-0 p-6 bg-white rounded-xl flex flex-col">
                    <p className="text-center text-4xl">
                        👁‍🗨
                    </p>

                    <h2 className="font-semibold text-lg text-center text-gray-800 mt-2">
                        Visión
                    </h2>

                    <p className="mt-2 text-gray-800 text-justify flex-grow">
                        Ser una empresa que facilita el transporte de estudiantes dentro de las instituciones de 
                        alto hospicio. Enfocándose en la productividad dentro de la satisfacción en servicios de 
                        transporte para los estudiantes, apoderados y establecimientos.
                    </p>
                </div>
            </div>

        </section>
    )
}