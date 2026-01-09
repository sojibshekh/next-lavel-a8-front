import React from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';


import logoMain from '../../../public/vercel.svg';
import { getCurrentUserServer } from '../Dashborad/AppSidebar';


const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/destinations", label: "Destinations" },
    { href: "/explore", label: "Explore Travel" },
    { href: "/traveller", label: "Traveller" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
];


const Header = async () => {

     const userInfo = await getCurrentUserServer();
    const user = userInfo?.data ;
    
    return (
        <div>
          <header className="px-4 md:px-6 bg-gray-900">
            <div className="flex h-16 items-center justify-between gap-4 container mx-auto">
                {/* Left side */}
                <div className="flex items-center gap-2 w-full">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                              
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-36 p-1 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem key={index} className="w-full">
                                            <NavigationMenuLink
                                                asChild
                                                className="py-1.5"
                                            >
                                                <Link href={link.href}>
                                                    {link.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Main nav */}
                    <div className="flex items-center justify-between w-full">
                        <Link className="" href="/">
                        <h2 className='text-white'>Travel Buddy</h2>

                          
                        </Link>
                        {/* Navigation menu */}
                        <NavigationMenu className="max-md:hidden">
                            <NavigationMenuList className="gap-2">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuLink
                                            asChild
                                            className="text-white hover:text-primary py-1.5 font-medium"
                                        >
                                            <Link href={link.href}>
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        {!user? <div> 
                            <Link className="" href="/login"> <Button >Login</Button> </Link>
                            <Link className="" href="/registration"> <Button >Registration</Button> </Link>
                        </div> : <div>
                        <span className="text-white mr-4">Hello, <Link className="" href="/dashboard"> <Button > {user?.name}</Button> </Link> </span>
                             </div>  }
                       
                          
                    </div>
                </div>
            </div>
        </header>
        </div>
    );
};

export default Header;