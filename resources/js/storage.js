class Storage {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

function isObject(value) {
    if (value === null) {
        return false;
    }
    return typeof value === "function" || typeof value === "object";
}

const strorage = new Storage();
Object.freeze(strorage);
export default strorage;
