package com.lzz.controller;

import com.lzz.logic.MainLogic;
import com.lzz.model.RequestParam;
import com.lzz.model.Response;
import com.lzz.model.UrlModel;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * Created by lzz on 2018/1/21.
 */
@org.springframework.stereotype.Controller
public class MainController {
    @Resource
    MainLogic logic;

    @RequestMapping("/postman")
    public String postman(Model model) {
        Response obj = logic.urlGroup();
        model.addAttribute("urlMap", obj.getRes());
        return "postman";
    }

    @RequestMapping("/posturl")
    public String posturl(Model model, @org.springframework.web.bind.annotation.RequestParam(value="q", defaultValue = "") String q) {
        Object res = null;
        if( !StringUtils.isEmpty( q ) ){
            Response obj = logic.getUrlModel(q);
            res = obj.getRes();
        }
        model.addAttribute("urlModel", res);
        return "posturl";
    }

    @RequestMapping("/remove-url")
    @ResponseBody
    public Response removeUrl(@org.springframework.web.bind.annotation.RequestParam String showName){
        try {
            return logic.removeUrlModel(showName);
        }catch (Exception e){
            return Response.Obj(0, e.getMessage());
        }
    }

    @RequestMapping("/url-group")
    @ResponseBody
    public Response urlGroup(){
        try {
            return logic.urlGroup();
        }catch (Exception e){
            return Response.Obj(0, e.getMessage());
        }
    }


    @RequestMapping("/save-request")
    @ResponseBody
    public Response saveRequest(@RequestBody UrlModel urlModel){
        try {
            return logic.saveRequest(urlModel);
        }catch (Exception e){
            return Response.Obj(0, e.getMessage());
        }
    }

    @RequestMapping("/request")
    @ResponseBody
    public Response request(@RequestBody  RequestParam requestParam){
        try {
            return logic.request( requestParam );
        }catch (Exception e){
            return Response.Obj(0, e.getMessage());
        }

    }

    @RequestMapping("/test-post")
    @ResponseBody
    public Response testPost(@RequestBody Object requestParam){

        return Response.Obj(0, requestParam);
    }

    @RequestMapping("/test-get")
    @ResponseBody
    public Response testGet(){
        return Response.OK();
    }
}
