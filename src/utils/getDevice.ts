export const getDevice = () => {
  const userAgent =
    typeof navigator !== 'undefined' ? navigator.userAgent : 'server';
  const isMobile = !!userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  );

  return isMobile ? 'mobile' : 'desktop';
};
