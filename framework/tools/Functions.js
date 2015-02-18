function isTypeOf(object, toCheck) {
	var type = object.javaClassName
	
	if(type === undefined) {
		type = typeof(object);
	}
	
	return (toCheck === undefined) ? type : (toCheck == type);
}