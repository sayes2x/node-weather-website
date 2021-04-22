// detect if session storage is avaliable
let storage;
let fail;
let uid;
try {
	uid = new Date;
	(storage = window.sessionStorage).setItem(uid, uid);
	fail = storage.getItem(uid) != uid;
	storage.removeItem(uid);
	fail && (storage = false);
} catch (exception) {}

export { storage }