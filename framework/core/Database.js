/**
 The MIT License (MIT)

 Copyright (c) 2014 UserApps.de

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 @author		Adrian Preuß <Bizarrus>, Christoph Kühl <djchrisnet>
 @docs		http://www.userapps.de/documentation/core/database
 */

var DB	= (new function Database() {
	this.javaClassName = 'Database';
	var _fields_global	= [];
	var _fields_user	= [];
	var _schema_loaded	= false;
	var _schema_dirty	= false;

	/*
		Liest das INFORMATION_SCHEMA genau einmal aus der (globalen)
		Persistence. Danach liegen die Felder im Speicher und werden
		nicht mehr bei jedem load/save neu gelesen.
	*/
	function loadSchema(db) {
		if(_schema_loaded) {
			return;
		}

		var schema = db.getObject('INFORMATION_SCHEMA', {
			user:	[],
			global:	[]
		});

		_fields_user	= schema.user;
		_fields_global	= schema.global;
		_schema_loaded	= true;
	};

	/*
		Schreibt das Schema nur zurück, wenn sich seit dem letzten
		Flush wirklich etwas geändert hat (Dirty-Flag).
	*/
	function flushSchema(db) {
		if(!_schema_dirty) {
			return;
		}

		db.setObject('INFORMATION_SCHEMA', {
			user:	_fields_user,
			global:	_fields_global
		});

		_schema_dirty = false;
	};

	/*
		Trägt einen Key in die Feldliste ein und markiert das Schema
		nur dann als dirty, wenn der Key noch nicht vorhanden war.
	*/
	function trackField(fields, key) {
		if(fields.indexOf(key) === -1) {
			fields.push(key);
			_schema_dirty = true;
		}
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_getUser
	*/
	this.getUser = function getUser(user) {
		Logger.info('DB.getUser(user) is DEPRECATED');

		return user.getPersistence();
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_getChannel
	*/
	this.getChannel = function getChannel() {
		Logger.info('DB.getChannel() is DEPRECATED');

		return KnuddelsServer.getPersistence();
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_load
	*/
	this.load = function load(key, defaultValue, user) {
		if(key === undefined) {
			Logger.error('No key submitted');

			return false;
		}

		var _global = KnuddelsServer.getPersistence();
		var _db		= _global;

		loadSchema(_global);

		if(user != undefined) {
			_db = user.getPersistence();

			trackField(_fields_user, key);
		} else {
			trackField(_fields_global, key);
		}

		switch(typeof defaultValue) {
			case 'string':
				return _db.getString(key, defaultValue);
				break;
			case 'number':
				return _db.getNumber(key, defaultValue);
				break;
			case 'object':
				return _db.getObject(key, defaultValue);
				break;
			case 'undefined':
				return _db.getObject(key, {});
				break;
		}

		return false;
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_save
	*/
	this.save = function save(key, data, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		if(data === undefined) {
			Logger.error('No Data submitted');
			return false;
		}

		var _global = KnuddelsServer.getPersistence();
		var _db		= _global;

		loadSchema(_global);

		if(user != undefined) {
			_db = user.getPersistence();

			trackField(_fields_user, key);
		} else {
			trackField(_fields_global, key);
		}

		/* Schema liegt immer in der globalen Persistence */
		flushSchema(_global);

		switch(typeof data) {
			case 'string':
				_db.setString(key, data);
				break;
			case 'number':
				_db.setNumber(key, data);
				break;
			case 'object':
				_db.setObject(key, data);
				break;
		}
		return true;
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_check
	*/
	this.check = function check(key, data, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		if(data === undefined) {
			Logger.error('No Data submitted');
			return false;
		}

		var _db = KnuddelsServer.getPersistence();

		if(user != undefined) {
			_db = user.getPersistence();
		}

		switch(typeof data) {
			case 'string':
				return _db.hasString(key);
				break;
			case 'number':
				return _db.hasNumber(key);
				break;
			case 'object':
				return _db.hasObject(key);
				break;
		}

		return false;
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_delete
	*/
	this.delete = function Delete(key, user, subdata) {
		subdata = (typeof(subdata) == 'undefined' ? true : subdata);

		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		var _db = KnuddelsServer.getPersistence();

		if(user != undefined) {
			_db = user.getPersistence();
		}

		if(_db.hasString(key)) {
			_db.deleteString(key);
		}

		if(_db.hasNumber(key)) {
			_db.deleteNumber(key);
		}

		if(_db.hasObject(key)) {
			_db.deleteObject(key);
		}

		/* Delete multiple entries */
		if(subdata) {
			DB.loop(key, function DBLoop(entry, index, totalCount, subkey) {
				DB.delete('_' + key + '_' + index, undefined, false);
			});

			DB.delete('_indexes_' + key, undefined, false);
		}
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_sum
	*/
	this.sum = function sum(key) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		return UserPersistenceNumbers.getSum(key);
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_count
	*/
	this.count = function count(key, from, to) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		var options = {};

		if(from != undefined && typeof(from) == 'number') {
			options['minimumValue'] = from;
		}

		if(to != undefined && typeof(to) == 'number') {
			options['maximumValue'] = to;
		}

		return UserPersistenceNumbers.getCount(key, options);
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_sorted
	*/
	this.sorted = function sorted(key, sortBy, count, page) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		var options = {};

		if(sortBy != undefined) {
			options['ascending'] = (sortBy == 'ASC') ? true : false;
		}

		if(count != undefined && typeof(count) == 'number') {
			options['count'] = count;
		}

		if(page != undefined && typeof(page) == 'number') {
			options['page'] = page;
		}

		return UserPersistenceNumbers.getSortedEntries(key, options);
	};

	// getSortedEntriesAdjacent

	/*
		@docs	http://www.userapps.de/documentation/DB_users
	*/
	this.users = function users(key, callback, sortBy, from, to) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		if(callback === undefined) {
			Logger.error('No callback submitted');
			return false;
		}

		var options = {};

		if(sortBy != undefined) {
			options['ascending'] = (sortBy == 'ASC') ? true : false;
		}

		if(from != undefined && typeof(from) == 'number') {
			options['minimumValue'] = from;
		}

		if(to != undefined && typeof(to) == 'number') {
			options['maximumValue'] = to;
		}

		return UserPersistenceNumbers.each(key, callback, options);
	};

	this.getFields = function getFields() {
		return {
			global:	_fields_global,
			user:	_fields_user
		};
	};

	/*
		@docs	http://www.userapps.de/documentation/DB_toString
	*/
	this.toString = function toString() {
		return '[KFramework Database]';
	};

	this.loop = function loop(key, callback) {
		var name		= '_indexes_' + key;
		var id			= DB.load(name, 0);
		var totalCount	= id;

		for(var index = 1; index <= id; ++index) {
			var entry = DB.load('_' + key + '_' + index, undefined);
			callback.call(this, entry, index, totalCount, '_' + key + '_' + index);
		}
	};

	this.add = function add(key, data) {
		var id		= DB.load('_indexes_' + key, 0);

		DB.save('_indexes_' + key,		++id);
		DB.save('_' + key + '_' + id,	data);

		return id;
	};

	this.update = function update(key, id, data, filter) {
		if(typeof(filter) != 'undefined') {
			data = filter.apply(this, [ data ]);
		}

		DB.save('_' + key + '_' + id, data);
	};

	this.remove = function remove(key, id, data) {
		DB.delete('_' + key + '_' + id);
	};

	/*
		==========================================================
		Row-basierte Speicherung
		==========================================================
		Struktur pro Tabelle "key":
		  _table_<key>_meta   -> { lastId, ids: [] }
		  _table_<key>_<id>   -> { id, createdAt, updatedAt, data }

		Jeder Eintrag hat eine eindeutige, fortlaufende ID die
		auch nach dem Löschen anderer Zeilen stabil bleibt.
	*/
	function tableMeta(key) {
		return DB.load('_table_' + key + '_meta', { lastId: 0, ids: [] });
	};

	function saveMeta(key, meta) {
		DB.save('_table_' + key + '_meta', meta);
	};

	function rowKey(key, id) {
		return '_table_' + key + '_' + id;
	};

	/*
		Legt einen neuen Eintrag an und gibt dessen ID zurück.
		@docs	http://www.userapps.de/documentation/DB_rowInsert
	*/
	this.rowInsert = function rowInsert(key, data) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		var meta	= tableMeta(key);
		var id		= ++meta.lastId;
		var now		= Date.now();

		meta.ids.push(id);
		saveMeta(key, meta);

		DB.save(rowKey(key, id), {
			id:			id,
			createdAt:	now,
			updatedAt:	now,
			data:		data
		});

		return id;
	};

	/*
		Holt einen einzelnen Eintrag inkl. Metadaten
		({ id, createdAt, updatedAt, data }) oder undefined.
		@docs	http://www.userapps.de/documentation/DB_rowGet
	*/
	this.rowGet = function rowGet(key, id) {
		if(!DB.check(rowKey(key, id), {})) {
			return undefined;
		}

		return DB.load(rowKey(key, id), undefined);
	};

	/*
		Aktualisiert einen Eintrag. Standard: Merge der Felder.
		replace = true ersetzt data komplett.
		@docs	http://www.userapps.de/documentation/DB_rowSet
	*/
	this.rowSet = function rowSet(key, id, data, replace) {
		var row = DB.load(rowKey(key, id), undefined);

		if(row === undefined || row.id === undefined) {
			Logger.error('Row "' + id + '" not exists in "' + key + '"');
			return false;
		}

		if(replace) {
			row.data = data;
		} else {
			for(var field in data) {
				if(data.hasOwnProperty(field)) {
					row.data[field] = data[field];
				}
			}
		}

		row.updatedAt = Date.now();
		DB.save(rowKey(key, id), row);

		return true;
	};

	/*
		Löscht einen einzelnen Eintrag.
		@docs	http://www.userapps.de/documentation/DB_rowDrop
	*/
	this.rowDrop = function rowDrop(key, id) {
		var meta	= tableMeta(key);
		var pos		= meta.ids.indexOf(id);

		if(pos === -1) {
			return false;
		}

		meta.ids.splice(pos, 1);
		saveMeta(key, meta);
		DB.delete(rowKey(key, id), undefined, false);

		return true;
	};

	/*
		Durchläuft alle Einträge: callback(row, id).
		@docs	http://www.userapps.de/documentation/DB_rowAll
	*/
	this.rowAll = function rowAll(key, callback) {
		var meta = tableMeta(key);

		for(var i = 0; i < meta.ids.length; ++i) {
			var row = DB.load(rowKey(key, meta.ids[i]), undefined);

			if(row !== undefined) {
				callback.call(this, row, meta.ids[i]);
			}
		}
	};

	/*
		Abfrage: predicate(data, id) -> boolean.
		Gibt ein Array passender Rows zurück.
		@docs	http://www.userapps.de/documentation/DB_rowQuery
	*/
	this.rowQuery = function rowQuery(key, predicate) {
		var results = [];

		DB.rowAll(key, function(row, id) {
			if(predicate === undefined || predicate.call(this, row.data, id)) {
				results.push(row);
			}
		});

		return results;
	};

	/*
		Gibt den ersten passenden Eintrag zurück oder undefined.
		@docs	http://www.userapps.de/documentation/DB_rowFind
	*/
	this.rowFind = function rowFind(key, predicate) {
		var meta = tableMeta(key);

		for(var i = 0; i < meta.ids.length; ++i) {
			var row = DB.load(rowKey(key, meta.ids[i]), undefined);

			if(row !== undefined && (predicate === undefined || predicate.call(this, row.data, meta.ids[i]))) {
				return row;
			}
		}

		return undefined;
	};

	/*
		Anzahl der Einträge in der Tabelle.
		@docs	http://www.userapps.de/documentation/DB_rowSize
	*/
	this.rowSize = function rowSize(key) {
		return tableMeta(key).ids.length;
	};

	/*
		Löscht die komplette Tabelle inkl. Metadaten.
		@docs	http://www.userapps.de/documentation/DB_rowTruncate
	*/
	this.rowTruncate = function rowTruncate(key) {
		var meta = tableMeta(key);

		for(var i = 0; i < meta.ids.length; ++i) {
			DB.delete(rowKey(key, meta.ids[i]), undefined, false);
		}

		DB.delete('_table_' + key + '_meta', undefined, false);
	};
}());