export const env: {
    name: string, rsshubUrl: string
} = (() => {
    if (process.env.ENV === "dev_local")
        return { name: 'dev_local', rsshubUrl: 'http://localhost:1200' }
    if (process.env.ENV === "dev_docker")
        return { name: 'dev_docker', rsshubUrl: 'http://rsshub:1200' }
    else throw new Error('unknown environment');
})()