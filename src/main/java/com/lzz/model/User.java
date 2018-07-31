package com.lzz.model;

/**
 * Created by lzz on 2018/1/21.
 */
public class User {
    private String username;
    private String password;
    private String shareDir;
    private String target;
    private boolean open = true;

    public User(){

    }

    public User(String username, String password, String shareDir, String target){
        this.username = username;
        this.password = password;
        this.shareDir = shareDir;
        this.target = target;
    }

    public User(String username, String password, String shareDir, String target, boolean open){
        this.username = username;
        this.password = password;
        this.shareDir = shareDir;
        this.target = target;
        this.open = open;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getShareDir() {
        return shareDir;
    }

    public void setShareDir(String shareDir) {
        this.shareDir = shareDir;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", shareDir='" + shareDir + '\'' +
                ", target='" + target + '\'' +
                ", open=" + open +
                '}';
    }
}
