
import "colors"

export const info = (...args: any[]): void => console.info("INFO: ".blue, ...args)
export const error = (...args: any[]): void => console.error("ERROR: ".red, ...args)
export const success = (...args: any[]): void => console.log("SUCCESS: ".green, ...args)
export const warn = (...args: any[]): void => console.warn("WARNING: ".yellow, ...args)