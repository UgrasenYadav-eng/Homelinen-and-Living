import GlobalProvider from '@/components/Application/GlobalProvider'
import AppSidebar from '@/components/Application/Admin/AppSidebar'
import ThemeProvider from '@/components/Application/Admin/ThemeProvider'
import Topbar from '@/components/Application/Admin/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <GlobalProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <SidebarProvider>
                    <AppSidebar />

                    <main className="md:w-[calc(100vw-16rem)] w-full overflow-x-hidden">
                        <div className='pt-[60px] md:px-5 px-5 min-h-[calc(100vh-40px)] pb-10'>
                            <Topbar />
                            {children}
                        </div>

                        <div className='border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-sm'>
                            © 2026 Developer UGGU™. All Rights Reserved.
                        </div>
                    </main>
                </SidebarProvider>
            </ThemeProvider>
        </GlobalProvider>
    )
}

export default layout




// // 🔹 STEP 6: REDUX PROVIDER (ALREADY ADDED)
// // NOTE:
// // Redux provider is CLIENT-SIDE only.
// // Redux state (authStore) is LOST on refresh / navigation
// // and is NOT available during server rendering.
// import GlobalProvider from '@/components/Application/GlobalProvider'


// // 🔹 STEP 2: REACT QUERY PROVIDER
// // NOTE:
// // React Query also runs on client and does NOT persist auth
// // across hard navigations or server layout checks.
// //import QueryProvider from '@/components/QueryProvider'

// import AppSidebar from '@/components/Application/Admin/AppSidebar'
// import ThemeProvider from '@/components/Application/Admin/ThemeProvider'
// import Topbar from '@/components/Application/Admin/Topbar'
// import { SidebarProvider } from '@/components/ui/sidebar'
// import React from 'react'

// const layout = ({ children }) => {
//     return (
//         // 🔹 REDUX PROVIDER
//         // IMPORTANT:
//         // This provider DOES NOT protect routes.
//         // It only provides client-side state AFTER hydration.
//         <Providers>

//             {/* 🔹 REACT QUERY PROVIDER
//                 Same as Redux:
//                 - Client-side only
//                 - Does NOT guarantee authentication on route change
//             */}
//             <QueryProvider>

//                 {/* 🔹 THEME PROVIDER
//                     Safe for SSR, not related to auth
//                 */}
//                 <ThemeProvider
//                     attribute="class"
//                     defaultTheme="system"
//                     enableSystem
//                     disableTransitionOnChange
//                 >
//                     {/* 🔹 SIDEBAR PROVIDER
//                         Controls UI state only (open/close sidebar)
//                         NOT authentication
//                     */}
//                     <SidebarProvider>

//                         {/* 🔴 IMPORTANT AUTH NOTE:
//                             AppSidebar renders correctly.
//                             Clicking links WORKS.

//                             BUT…

//                             When navigation happens,
//                             Next.js re-runs this layout.

//                             If auth is checked elsewhere
//                             (middleware / server layout / API),
//                             Redux auth is EMPTY at that moment.

//                             Result:
//                             ➜ User is redirected to LOGIN
//                         */}
//                         <AppSidebar />

//                         <main className="md:w-[calc(100vw-16rem)] w-full overflow-x-hidden">
//                             <div className='pt-[60px] md:px-5 px-5 min-h-[calc(100vh-40px)] pb-10'>

//                                 {/* 🔹 TOPBAR
//                                     Uses Redux auth to SHOW user name.
//                                     This is OK for UI,
//                                     but NOT OK for route protection.
//                                 */}
//                                 <Topbar />

//                                 {/* 🔴 CHILDREN (ADMIN PAGES)
//                                     On click from dropdown:
//                                     - Route changes
//                                     - Layout re-renders
//                                     - Redux auth is NOT trusted by server
//                                     - Login redirect happens
//                                 */}
//                                 {children}
//                             </div>

//                             <div className='border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-sm'>
//                                 © 2026 Developer UGGU™. All Rights Reserved.
//                             </div>
//                         </main>

//                     </SidebarProvider>
//                 </ThemeProvider>

//             </QueryProvider>

//         </Providers>
//     )
// }

// export default layout



// // // const layout = ({ children }) => {
// // //     return (
// // //         // 🔹 STEP 6: WRAP EXISTING LAYOUT WITH PROVIDERS (NEW)
// // //         <Providers>
// // //             <ThemeProvider
// // //                 attribute="class"
// // //                 defaultTheme="system"
// // //                 enableSystem
// // //                 disableTransitionOnChange
// // //             >
// // //                 <SidebarProvider>
// // //                     <AppSidebar />
// // //                     <main className="md:w-[calc(100vw-16rem)] w-full overflow-x-hidden">
// // //                         <div className='pt-[60px] md:px-5 px-5 min-h-[calc(100vh-40px)] pb-10'>
// // //                             <Topbar />
// // //                             {children}
// // //                         </div>

// // //                         <div className='border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-sm'>
// // //                             © 2025 Developer UGGU™. All Rights Reserved.
// // //                         </div>
// // //                     </main>
// // //                 </SidebarProvider>
// // //             </ThemeProvider>
// // //         </Providers>
// // //     )
// // // }

// // // export default layout
