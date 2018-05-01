
declare var process;

process = process || { env: {} }

process.env.NODE_ENV = 'development'

export const ENV = process.env.NODE_ENV