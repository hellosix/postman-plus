package com.lzz.httpclient;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

/**
 * Created by lzz on 2018/3/9.
 */
@Component
public class HttpClient {
    @Autowired
    RestTemplate restTemplate;

    @RequestMapping("/post")
    public Object post(String url, Object param){
        JSONObject postParam = JSONObject.fromObject( param );
        Object res = restTemplate.postForEntity(url, postParam, JSONObject.class).getBody();
        return res;
    }

    @RequestMapping("/get")
    public Object get(String url){
        Object res = restTemplate.getForEntity(url, JSONObject.class).getBody();
        return res;
    }
}
