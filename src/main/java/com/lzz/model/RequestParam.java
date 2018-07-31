package com.lzz.model;

/**
 * Created by lzz on 2018/3/9.
 */
public class RequestParam {
    private String url;
    private Object param;
    private RequestType type;

    public RequestParam(){

    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Object getParam() {
        return param;
    }

    public void setParam(Object param) {
        this.param = param;
    }

    public RequestType getType() {
        return type;
    }

    public void setType(RequestType type) {
        this.type = type;
    }
}
