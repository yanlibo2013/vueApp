/**
 * Created by pc-david on 2016/11/24.
 */
import * as API from "./api.js"
import {UploaderBuilder} from "qiniu4js";
//下面是测试环境配置
const HOST = "http://ydjr.dev.chengyiwm.com/goldman-api/";
// 正式環境地質
// const HOST = "http://api.chengyiwm.com/api/";

/**
 * 七牛对应的bucket和url枚举
 * @type {*[]}
 */
export const QINIU_BUCKET_ENUM = {
    /**产品语音*/
    chengyiwm_product_audio: "http://audio.chengyiwm.com/",
    /**产品文档*/
    chengyiwm_product_documents: "http://7xudc8.com1.z0.glb.clouddn.com/",
    /**测试*/
    chengyiwm_test: "http://7xuium.com1.z0.glb.clouddn.com/",
    /**认证名片*/
    chengyiwm_authinfo: "http://7xujx4.com2.z0.glb.qiniucdn.com/",
    /**订单*/
    chengyiwm_order: "http://ocnihe67r.bkt.clouddn.com/"
};

export function $QiniuUpLoad(buketname,callBack) {
    //构建 uploader 实例
    let uploader = new UploaderBuilder()
        .debug(true)//开启 debug ，默认 false
        .retry(0)//设置重传次数，默认 0 ，不重传
        .auto(true)//选中文件后立即上传，默认 true
        .multiple(true)//是否支持多文件选中，默认 true
        .accept([])//过滤文件，默认无，详细配置见 http://www.w3schools.com/tags/att_input_accept.asp
        .tokenShare(false)//在一次上传队列中，是否分享 token,如果为 false 每上传一个文件都需要请求一次 Token ，默认 true
        .tokenFunc(function (setToken, task) {
            //token 获取函数， token 获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
            setTimeout(function () {
                var fun =API.$getUploadFileSign(buketname, function (res) {
                    var uptoken = "";
                    uptoken = res.body.uptoken;
                    setToken(uptoken);
                });
            }, 1000);
        }).listener({
            onReady(tasks) {
                //选择上传文件确定后,该生命周期函数会被回调。
                console.log("onReay");
            }, onStart(tasks){
                //开始上传
                console.log("onStart");

            }, onTaskGetKey(task){
                //为每一个上传的文件指定 key,如果不指定则由七牛服务器自行处理
                console.log("onTaskGetKey"+JSON.stringify(task));

              //  return "test.png";

            }, onTaskProgress: function (task) {
                //每一个任务的上传进度,通过`task.progress`获取
                console.log("onTaskProgress"+task);

            }, onTaskSuccess(task){
                //一个任务上传成功后回调
                console.log("onTaskSuccess"+JSON.stringify(task));

            }, onTaskFail(task) {
                //一个任务在经历重传后依然失败后回调此函数
                console.log("onTaskFail"+JSON.stringify(task));

            }, onTaskRetry(task) {
                //开始重传
                console.log("onTaskRetry"+task);

            }, onFinish(task){
                //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有 HTTP 上传请求响应后回调(包括重传请求)。
                console.log("onFinish");
                callBack(task);
            }
        }).build();

       return uploader;
}















