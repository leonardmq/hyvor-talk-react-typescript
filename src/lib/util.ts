export function addScript(src: string, id: string) {
  const script = document.createElement('script');
  script.src = src;
  script.id = id;

  document.body.appendChild(script);
}

export function removeScript(id: string) {
  const script = document.getElementById(id);
  if (id) {
    script?.parentElement?.removeChild(script);
  }
}
