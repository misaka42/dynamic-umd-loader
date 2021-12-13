const scriptDownloadingTask: Record<string, Promise<void>> = {};

const isScriptExist = (url: string): boolean => {
  return !!document.querySelector(`script[src="${url}"]`);
};

/**
 * Load JavaSript script from online URL
 * @param url URL of online resource
 * @returns {void}
 */
export const loadScript = (url: string): Promise<void> => {
  if (url in scriptDownloadingTask) {
    return scriptDownloadingTask[url];
  }
  if (isScriptExist(url)) {
    return Promise.resolve();
  }
  const p: Promise<void> = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = () => resolve();
    script.onerror = reject;
    script.src = url;
    document.head.appendChild(script);
  });

  scriptDownloadingTask[url] = p;

  return p;
};

/**
 * Load JavaScript UMD Module From Online URL
 * @param url URL of online resource
 * @param name UMD Variable name of JavaScript Module
 * @returns UMD
 */
export const loadUMDFromURL = <T>(url: string, name: string): Promise<T> => {
  if (name in window) {
    return Promise.resolve((window as any)[name] as T);
  }
  return loadScript(url).then(() => (window as any)[name] as T);
};
