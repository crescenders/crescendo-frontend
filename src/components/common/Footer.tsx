const Footer = () => {
  return (
    <footer className="flex min-h-[150px] w-full flex-col items-center justify-center border-[1px] border-t-[#E8E8E8] bg-white">
      <p className="text-text-primary">
        문의 :{' '}
        <a
          className="text-blue-500"
          href={`mailto:snowball.crew.official@gmail.com`}
        >
          snowball.crew.official@gmail.com
        </a>
      </p>
      <p className="text-text-primary">
        ©️ 2023 Crescendo. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
