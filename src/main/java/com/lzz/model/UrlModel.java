package com.lzz.model;

import net.sf.json.JSONObject;

/**
 * Created by lzz on 2018/3/9.
 */
public class UrlModel {
    private String url;
    private String param;
    private String type;
    private String group;
    private String showName;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getShowName() {
        return showName;
    }

    public void setShowName(String showName) {
        this.showName = showName;
    }

    public String serializa(){
        return JSONObject.fromObject(this).toString();
    }

    public static UrlModel unSerializa(String str){
        JSONObject jsonObject =  JSONObject.fromObject( str );
        UrlModel urlModel = (UrlModel) JSONObject.toBean( jsonObject, UrlModel.class);
        return  urlModel;
    }
}
