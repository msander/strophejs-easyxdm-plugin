This adds easyxdm support for strophejs to support cross-domain connections for non-flash users.

Remote easyxdm function required:

    strophe_request: function(config,success,error) {
        config.success = function(data, textStatus, jqXHR) { 
            success({
                responseText:jqXHR.responseText,
                status:jqXHR.status
            });
        };
        config.error = function(jqXHR, textStatus, errorThrown) {
            error({
                responseText:jqXHR.responseText,
                status:jqXHR.status
            });
        };
        
        $.ajax($.extend(config,
            {
                beforeSend : function(xhr, settings) {
                    if(config.headers) {
                        $.each(config.headers,function(key,value) {
                            xhr.setRequestHeader(key,value);    
                        });
                    }
                }
            }
        ));                     
    },