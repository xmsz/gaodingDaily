# -*- coding: utf-8 -*-
import requests
import json
import copy




def dealList(list, i):

    with open("./user.json",'r') as load_json:
        userData = json.load(load_json)

    for item in list:
        user_id = item['user_id'] 
        user_id_key = 'id_' + str(user_id) 
        print(user_id_key)

        for idx,userItem in enumerate(userData):
            if user_id_key in userItem:
               # print ("+ 1")
                userItem[user_id_key] += 1
                break;
            if idx == (len(userData) - 1):
               # print ("最后一个了")
                userData.append({user_id_key: 1})
                break

    print(userData)

    with open("./user.json","w") as f:
        json.dump(userData,f)
        print("保存中第"+ str(i) + "次")

        
def login_gaoding():
    # 构造POST data
    data = 'username=xiangyu&password=qqqqqq'
    login = session.post('https://mmmm.gaoding.com/api/sessions', data=data, headers={
        "Content-Type": "application/x-www-form-urlencoded"
    })
    print(login)


    for i in range(20) :
        listData = session.get('https://mmmm.gaoding.com/api/mattings?page_num='+ str(i+1) +'&page_size=200&matted=false&start_time=1517673600&end_time=1517760000')
        list = json.loads(listData.text)
        dealList(list, i);

   # list = json.loads('[{"id":373035,"deleted":0,"status":0,"is_example":0,"user_id":266215,"source_image":"https://st-gdx.dancf.com/gaodingx/266215/clip/20180106-235955-1.jpg","image_width":600,"image_height":86,"result_image":"https://matting_st_07.dancf.com/20180207/e85a1361ea73ac16158f5a6c46c8831d.png","keep_lines_count":1,"drop_lines_count":2,"download_count":0,"last_matting_elapsed":1216,"last_save_ip":"106.117.115.140","last_download_at":null,"created_at":1517932795,"updated_at":1517932833,"user":{"id":266215,"deleted":0,"status":0,"type":0,"username":"","guest_finger":"48e5fae7dd2973921198bd3bc77731e5","nick":"","mobile":"","avatar":"","source":"ps_menu","last_ip":"106.117.115.140","last_screen_width":1920,"last_screen_height":1080,"last_ua":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36","created_at":1517932777,"updated_at":1517932777}},{"id":373032,"deleted":0,"status":0,"is_example":0,"user_id":266195,"source_image":"https://st-gdx.dancf.com/gaodingx/266195/clip/20180106-235918-1.png","image_width":650,"image_height":365,"result_image":"https://matting_st_02.dancf.com/20180207/bf036d1d257ebb8890bc4bde983babcb.png","keep_lines_count":1,"drop_lines_count":4,"download_count":0,"last_matting_elapsed":2990,"last_save_ip":"115.192.186.146","last_download_at":1517932833,"created_at":1517932759,"updated_at":1517933414,"user":{"id":266195,"deleted":0,"status":0,"type":0,"username":"","guest_finger":"102822f7092f45c210fa61cf7ca6bc95","nick":"","mobile":"","avatar":"","source":"ps_menu","last_ip":"115.192.186.146","last_screen_width":1440,"last_screen_height":900,"last_ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36","created_at":1517932242,"updated_at":1517932242}}]');

    

    
   

if __name__ == '__main__':
    # 构造一个会话，用来跨请求保存cookie
    session = requests.Session()
    login_gaoding();

