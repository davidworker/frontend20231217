import { getDatabase, set, ref, onValue, get, push, update } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'

let db = {};

const getPath = (path) => {
    return ref(db, path);
};

class Database {
    constructor(app) {
        db = getDatabase(app);
    }

    async write(path, data = {}) {
        let to = getPath(path);
        try {
            await set(to, data)
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    listen(path, callback, cache = false) {
        let to = getPath(path);
        onValue(to, (snapshot) => {
            const data = snapshot.val();
            if (typeof callback == 'function') {
                callback(data, snapshot);
            }
        },
            {
                onlyOnce: cache
            });
    }

    async read(path) {
        let to = getPath(path);
        try {
            let snapshot = await get(to);
            return snapshot.val();
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async insert(path, item) {
        return this.inserts(path, [item]);
    }

    async inserts(path, items = []) {
        let to = getPath(path);
        let updates = {};
        items.forEach(item => {
            let key = push(to).key;
            updates[key] = item;
        });
        try {
            await update(to, updates);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async remove(path) {
        return await this.write(path, null);
    }
}

export { Database }