export class load {
    static isReady() {
        return new Promise<void>(resolve => {
            window.addEventListener("load", () => {
                /**
                 * resolve() will return to result to the async function in its call stack, and will let the function
                 *   continue
                 */
                resolve();
            });
        });
    }
}