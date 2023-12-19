export async function wait(timeInMS: number) {
  // time in miliseconds
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMS);
  }).then(() => console.log("waiting finished."));
}
