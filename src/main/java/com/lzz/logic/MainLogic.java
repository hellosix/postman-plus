package com.lzz.logic;

import com.lzz.dao.IUrlDao;
import com.lzz.httpclient.HttpClient;
import com.lzz.model.*;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lzz on 2018/1/21.
 */
@Component
public class MainLogic {
    @Resource
    IUrlDao urlDao;
    @Resource
    HttpClient httpClient;

    public List<User> userList() {
        List<User> list = new ArrayList<>();
        User user = new User("ggg", "lzz", "aa" ,"kkk");
        User user1 = new User("ggg1", "lzz1", "aa1" ,"kkk1");
        list.add( user );
        list.add( user1 );
        return list;
    }


    public Response request(RequestParam requestParam){
        Response response = Response.Fail();
        RequestType type = requestParam.getType();
        switch (type){
            case post:
                Object postRes = httpClient.post(requestParam.getUrl(), requestParam.getParam());
                response = Response.Obj(0, postRes);
                break;
            case get:
                Object getRes = httpClient.get(requestParam.getUrl());
                response = Response.Obj(0, getRes);
                break;
            default:
                response = Response.Obj(1, type);
        }
        return response;
    }

    public Response saveRequest(UrlModel urlModel) {
        Object res = null;
        try {
            res = urlDao.add( urlModel );
        }catch (Exception e){
            res = e.getMessage();
        }
        return Response.Obj(0, res);
    }


    public Response urlGroup() {
        List<UrlModel> urlList = urlDao.urlList();
        Map<String, List<UrlModel>> resMap = new HashMap<>();
        for(int i = 0; i < urlList.size(); i++){
            UrlModel urlModel = urlList.get(i);
            List<UrlModel> tmpList = resMap.get( urlModel.getGroup() );
            if( tmpList == null ){
                tmpList = new ArrayList<>();
            }
            tmpList.add( urlModel );
            resMap.put( urlModel.getGroup(), tmpList);
        }
        return Response.Obj(0, resMap);
    }

    public Response getUrlModel(String showName) {
        UrlModel urlModel = urlDao.getUrlModel( showName );
        return Response.Obj(0, urlModel);
    }

    public Response removeUrlModel(String showName) {
        boolean res = true;
        try {
            res = urlDao.delete(showName);
        }catch (Exception e){
            res = false;
        }
        return Response.Obj(0, res);
    }
}
