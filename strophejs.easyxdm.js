Strophe.addConnectionPlugin('easyxdm', {
    init: function (conn) {
        var XDMXHR = function() {
            var self = this;
            
            this.open = function(method,url,async) {
                    this._method=method;
                    this._url=url;
                    this._async=async;
                    this.readyState = 1;
            };
            this.send = function(body) {
                this.readyState = 2;
                Gt.ApiRpc.strophe_request({
                    type:self._method,
                    url:self._url,
                    async:self._async,
                    data:body
                },function(xdmdata) {
                    self.responseText = xdmdata.responseText;
                    self.responseXML = $.parseXML( xdmdata.responseText );
                    self.status = xdmdata.status;
                    self.readyState=4;
                    self.onreadystatechange();
                },function(xdmdata) {
                    self.responseText = xdmdata.responseText;
                    self.responseXML = $.parseXML( xdmdata.responseText );
                    self.status = xdmdata.status;
                    self.readyState=4;
                    if(self.onreadystatechange!=null) {
                        self.onreadystatechange();
                    }
                });
            };
            this.abort = function() {

            };
            this.onreadystatechange = null;
            this.responseText = null;
            this.responseXML = null;
            this.status = null;
            this.readyState = 0;
        };
        
        Strophe.Request.prototype._newXHR = function () {
            var xhr =  new XDMXHR();
            xhr.onreadystatechange = this.func.bind(null, this);
            return xhr;
        };
     
    }
});
