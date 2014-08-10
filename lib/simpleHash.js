
module.exports = {
	hashCode : function(strValue) {
		var hash = 0, i, chr, len;
		if (strValue.length == 0) return hash;
		for (i = 0, len = strValue.length; i < len; i++) {
			chr   = strValue.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}
};
