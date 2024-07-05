interface Favorite {
    id: string
    name: string,
    url: string
}

// get list of all favorited pokemon
export function getFavorites() {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

// checkIsFavorited -> check localstorage favorites for a pokemon id 
export function checkIsFavorited(id: string) {
    const currentFavorites = getFavorites()
    return currentFavorites.some((element: Favorite) => element.id === id);
}

export function addFavorite(id: string, name: string, url: string) {
    const isExisting = checkIsFavorited(id);

    if (!isExisting) {
        const currentFavorites = getFavorites()
        currentFavorites.push({ id, name, url })
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    }
}

export function removeFavorite(id: string) {
    const isExisting = checkIsFavorited(id);

    if (isExisting) {
        const currentFavorites = getFavorites()
        const toRemoveIndex = currentFavorites.findIndex((element: Favorite) => element.id === id)
        currentFavorites.splice(toRemoveIndex, 1)
        localStorage.setItem("favorites", JSON.stringify(currentFavorites))
    }
}