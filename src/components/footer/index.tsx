import FbIcon from './images/fb.svg?react';
import footerImage from './images/footer.webp';
import InstIcon from './images/inst.svg?react';
import XIcon from './images/x.svg?react';

export default function Footer() {
  return (
    <>
      <img src={footerImage} alt="footer gradient" className="h-6 w-full" />
      <footer className="flex flex-col items-center bg-black px-20 pt-64 pb-20 text-white">
        <div className="text-center text-[30px] font-bold">SUBSCRIBE TO OUR NEWS LETTER</div>
        <input
          type="email"
          placeholder="example@email.com"
          className="mt-12 w-208 border-b-1 border-b-white p-5 text-center outline-none placeholder:text-white/70"
        />
        <button className="mt-34 w-208 cursor-pointer border border-white p-12 transition-opacity hover:opacity-80 active:opacity-70">
          SUBSCRIBE
        </button>
        <h3 className="mt-64 text-[18px] leading-32 font-bold uppercase">Terms and privacy</h3>
        <a className="leading-32 uppercase" href="/">
          Privacy Policy
        </a>
        <a className="leading-32 uppercase" href="/">
          Terms and Conditions
        </a>
        <a className="leading-32 uppercase" href="/">
          Ads based on interests
        </a>
        <a className="leading-32 uppercase" href="/">
          Accessibility
        </a>
        <a className="leading-32 uppercase" href="/">
          cookies
        </a>
        <div className="mt-60 flex w-200 justify-between pb-20">
          <a href="/">
            <FbIcon className="size-24" />
          </a>
          <a href="/">
            <XIcon className="size-24" />
          </a>
          <a href="/">
            <InstIcon className="size-24" />
          </a>
        </div>
      </footer>
    </>
  );
}
