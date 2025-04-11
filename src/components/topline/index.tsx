import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from '@tanstack/react-router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { checkAuth } from '@/api.ts';
import Authorize from '@/components/authorize';

import BagIcon from './images/bag.svg?react';
import gradientImage from './images/gradient.webp';
import HearIcon from './images/heart.svg?react';
import MenuIcon from './images/menu.svg?react';
import ProfileIcon from './images/profile.svg?react';
import SearchIcon from './images/search.svg?react';

export default function Topline() {
  const { data, isError, isPending } = useQuery({
    queryKey: ['me'],
    queryFn: checkAuth,
    retry: 1,
    retryDelay: 3000
  });

  const location = useLocation();
  const [authorizeFormShowed, setAuthorizeFormShowed] = useState(false);

  const themeCookie = Cookies.get('theme');
  const isThemeValid = themeCookie === 'light' || themeCookie === 'dark';
  const [theme, setTheme] = useState<'light' | 'dark'>(isThemeValid ? themeCookie : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    Cookies.set('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <>
      {authorizeFormShowed && <Authorize closeForm={() => setAuthorizeFormShowed(false)} />}
      <img src={gradientImage} alt="gradient" className="h-48 w-full" />
      <div className="absolute top-0 h-48 w-full px-20 pt-7 text-[11px] lg:px-40 lg:py-6">
        <div className="grid grid-cols-2 tracking-[1px] lg:flex lg:h-full lg:items-center lg:text-[14px]">
          <div>
            Delivery within <b>48</b> hours
          </div>
          <div className="text-end lg:ml-16">
            <b>2</b> gift samples
          </div>
          <div className="lg:ml-16">
            Free delivery from <b>19</b> euros
          </div>
          <Link
            to="/"
            className="text-end font-bold uppercase underline underline-offset-2 transition-colors hover:opacity-70 lg:ml-auto lg:cursor-pointer"
          >
            order tracking
          </Link>
        </div>
      </div>
      <div className="flex h-48 items-center justify-between px-20 shadow-md dark:shadow-[#fb64b6]/50 lg:justify-end">
        <MenuIcon className="size-20 transition-colors cursor-pointer hover:opacity-70 lg:hidden" />
        <SearchIcon className="size-24 cursor-pointer transition-colors hover:opacity-70" />
        <button className="lg:-order-1 lg:mr-auto cursor-pointer" onClick={changeTheme}>
          <HearIcon className="h-24 w-29 animate-pulse" />
        </button>
        {!isError && !isPending ? (
          <div className="flex lg:ml-16">
            <div>{data.firstName}</div>
            <img src={data.image} className="ml-6 size-24" alt="user avatar" />
          </div>
        ) : (
          <button data-testid="login" type="button" onClick={() => setAuthorizeFormShowed(true)}>
            <ProfileIcon className="size-24 cursor-pointer transition-colors hover:opacity-70 lg:ml-16" />
          </button>
        )}
        <BagIcon className="h-24 w-18 cursor-pointer transition-colors hover:opacity-70 lg:ml-16" />
      </div>
    </>
  );
}
