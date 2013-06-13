seajs.config({
	plugins: ['shim'],
	alias:{
		'jquery':{
			src:'lib/jquery-1.8min.js',
			exports:'jQuery'
		},
		'tool':{
			src:'lib/tool.js',
			exports:'Tool'
		}
	}
});