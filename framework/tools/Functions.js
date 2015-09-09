/**
	The MIT License (MIT)

	Copyright (c) 2014 MyChannel-Apps.de

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
	
	@author		Christoph Kühl <djchrisnet>
	@docs		http://www.mychannel-apps.de/documentation/tools/functions
*/

/*
	@docs	http://www.mychannel-apps.de/documentation/Functions_isTypeOf
*/
function isTypeOf(object, toCheck) {
	var type = undefined;
	
	try {
		if(typeof(object.javaClassName) != 'undefined') {
			type = object.javaClassName;
		} else {
			type = typeof(object);
		}
	} catch(e) {
		/* Do Nothing */
	}
	
	return (toCheck === undefined) ? type : (toCheck == type);
}

/*
	@docs	TODO
*/
function AND(b1, b2) {
	return ((b1) && (b2));
}

/*
	@docs	TODO
*/
function OR(b1, b2) {
	return ((b1) || (b2));
}

/*
	@docs	TODO
*/
function NOT(b1) {
	return !(b1);
}

/*
	@docs	TODO
*/
function XOR(b1, b2){ 
   return ((b1) == true && (b2) == false) || ((b1) == false && (b2) == true);
}

/*
	@docs	TODO
*/
function clone(src) {
	function mixin(dest, source, copyFunc) {
		var name, s, i, empty = {};
		for(name in source){
			s = source[name];
			if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
				dest[name] = copyFunc ? copyFunc(s) : s;
			}
		}
		return dest;
	}

	// null, undefined, any non-object, or function
	if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
		return src;
	}

	// Date
	if(src instanceof Date){
		return new Date(src.getTime());
	}

	// RegExp	
	if(src instanceof RegExp){
		return new RegExp(src);
	}
	
	//Array
	if(src instanceof Array){
		return [].concat(src);
	}
	
	/*
	 *	KFrameWork Classes
	*/
	
	//StringBuffer
	if(src instanceof StringBuffer) {
		return new StringBuffer(src.toString());
	}
	
	//KCode
	if(src instanceof KCode) {
		return new KCode().append(src.toString());
	}

	//KButton
	if(src instanceof KButton) {
		return new KButton(src.getText(), src.getCommand()).setId(src.getId()).setProperties(src.getProperties());
	}
	
	/*
	*	TODO MORE of THIS!
	*/	
	
	// generic objects
	return mixin(src.constructor ? new src.constructor() : {}, src, clone);
}
