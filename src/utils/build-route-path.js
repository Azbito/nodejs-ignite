// /users/:id
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z0-9]+)/g

    console.log(Array.from(path.matchAll(routeParametersRegex)))
}