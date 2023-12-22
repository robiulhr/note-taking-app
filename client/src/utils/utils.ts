export async function wait(timeInMS: number) {
  // time in miliseconds
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMS);
  }).then(() => console.log("waiting finished."));
}

export function getPlainText(htmlString: string, length: number) {
  return htmlString.replace(/<[^>]+>/g, "").slice(0, length || -1);
}
