export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check user agent
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

  // Check touch capability and screen size
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;

  return mobileRegex.test(userAgent.toLowerCase()) || (isTouchDevice && isSmallScreen);
};

export const isLowEndDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;

  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory || 4;

  // Low-end: <= 2 cores or <= 2GB RAM
  return cores <= 2 || memory <= 2;
};

export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check user preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduce motion on mobile or low-end devices
  return prefersReducedMotion || isMobileDevice() || isLowEndDevice();
};
