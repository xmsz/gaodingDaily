# -*- coding: utf-8 -*-
import requests
import re
import json
from lxml import etree

from requests.packages.urllib3.exceptions import InsecureRequestWarning
# 禁用安全请求警告
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)



# 每个应用都会有这两个ID，以下方法如果不传入这两个参数，那么使用这里默认的值
APP_ID = '1f83c3fb0dd43f84fb2e7c5b659c3d26'
REST_API_KEY = 'e48ecaadf867fcf9dc94340b6dcf22aa'


# 封装rest api的post方法，插入一条记录
# table_name：表名，如果表名还不存在，则先创建一个表再插入数据
# data：字典，要插入的记录的各个字段的字段名和值
def bomb_insert(table_name,data,app_id = APP_ID,rest_api_key = REST_API_KEY):
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key
    headers['Content-Type'] = 'application/json'

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}'.format(table_name = table_name)

    # 发起请求
    resp = requests.post(url,headers = headers,data = json.dumps(data),verify = False)
    
    # 设置响应体编码
    resp.encoding = 'utf-8'
    
    if resp and resp.status_code == 201:
        print('插进去啦！')
        return json.loads(resp.text)
    return None


# 封装rest api的get方法，根据对象ID获取一条数据
# table_name：要查询的表名
# object_id：要查询的数据记录的ID
def bomb_query(table_name,history_id,app_id = APP_ID,rest_api_key = REST_API_KEY):
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}?where={history_id}'.format(table_name = table_name, history_id = '%7B%22history_id%22:'+ history_id + '%7D')

    # 发起请求
    resp = requests.get(url,headers = headers,verify = False)
    
    # 设置响应体编码
    resp.encoding = 'utf-8'

    
    if resp and resp.status_code == 200:
        return json.loads(resp.text)
    return None


def bomb_query_first(table_name,app_id = APP_ID,rest_api_key = REST_API_KEY):
    # 构建请求头
    headers = {}
    headers['X-Bmob-Application-Id'] = app_id
    headers['X-Bmob-REST-API-Key'] = rest_api_key

    # 构建url
    url = 'https://api.bmob.cn/1/classes/{table_name}?limit=1'.format(table_name = table_name)

    # 发起请求
    resp = requests.get(url,headers = headers,verify = False)
    
    # 设置响应体编码
    resp.encoding = 'utf-8'
    
    if resp and resp.status_code == 200:
        return json.loads(resp.text)
    return None

def postData(list):
    lastTime = bomb_query_first('history')['results'][0]['history_id'];


    for item in list:
        if item['id'] > lastTime:
            resp = bomb_query(table_name = 'history', history_id = str(item['id']))
            if resp['results'] == []:
                item['history_id'] = item['id']
                del item['id']
                del item['preview_lock']
                del item['rules_count']
                del item['image_width']
                del item['image_height']
                del item['download_count']
                del item['businesses']
                del item['flags']
                del item['solar_term']
                del item['last_save_ip']
                del item['priority']
                del item['festivals']
                del item['roles']
                del item['features']
                del item['ratios']
                del item['type']
                del item['colors']
                del item['styles']
                if isinstance(item['preview'], object) == False :
                    item['preview'] = {}
                isSuccess = bomb_insert(table_name = 'history',data = item)
                print (isSuccess)
            else :
                break
        




def login_baidu():
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    # 构造POST data
    data = 'username=xiangyu&password=qqqqqq'
    login = session.post('https://mmmm.gaoding.com/api/sessions', data=data, headers=headers)
    print(login)
    listData = session.get('https://mmmm.gaoding.com/api/users/templets?page_num=1&page_size=100')
    list = json.loads(listData.text);
    postData(list = list)

    
   

if __name__ == '__main__':
    # 构造一个会话，用来跨请求保存cookie
    session = requests.Session()
    login_baidu();

